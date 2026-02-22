import React, { useState, useEffect } from 'react';
import { Chess, Move, Square as SquareType } from 'chess.js';
import { Square } from './Square';
import { motion, AnimatePresence } from 'motion/react';

type ChessBoardProps = {
  game: Chess;
  fen: string;
  onMove: (move: { from: string; to: string; promotion?: string }) => boolean;
  orientation: 'w' | 'b';
  lastMove?: { from: string; to: string } | null;
  inCheck?: boolean;
  turn: 'w' | 'b';
};

export function ChessBoard({ game, fen, onMove, orientation, lastMove, inCheck, turn }: ChessBoardProps) {
  const [selectedSquare, setSelectedSquare] = useState<SquareType | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [promotionSquare, setPromotionSquare] = useState<{ from: string; to: string } | null>(null);

  useEffect(() => {
    // Clear selection on FEN change (move made)
    setSelectedSquare(null);
    setLegalMoves([]);
    setPromotionSquare(null);
  }, [fen]);

  const getLegalMovesForSquare = (square: SquareType) => {
    const moves = game.moves({ square, verbose: true });
    return moves.map((m) => m.to);
  };

  const handleSquareClick = (square: SquareType) => {
    // If promoting, ignore clicks elsewhere
    if (promotionSquare) return;

    const piece = game.get(square);
    const isMyTurn = game.turn() === orientation; // Or allow both in local PvP

    // If clicking on a piece of the current turn's color
    if (piece && piece.color === game.turn()) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setLegalMoves([]);
      } else {
        setSelectedSquare(square);
        setLegalMoves(getLegalMovesForSquare(square));
      }
      return;
    }

    // If clicking on a target square (empty or enemy)
    if (selectedSquare) {
      // Check if it's a legal move
      const moves = game.moves({ square: selectedSquare, verbose: true });
      const move = moves.find((m) => m.to === square);

      if (move) {
        // Check for promotion
        if ((move.piece === 'p' && move.color === 'w' && square[1] === '8') ||
            (move.piece === 'p' && move.color === 'b' && square[1] === '1')) {
          setPromotionSquare({ from: selectedSquare, to: square });
          return;
        }

        onMove({ from: selectedSquare, to: square });
        setSelectedSquare(null);
        setLegalMoves([]);
      } else {
        // Invalid move, deselect
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    }
  };

  const handlePromotion = (piece: 'q' | 'r' | 'b' | 'n') => {
    if (promotionSquare) {
      onMove({ from: promotionSquare.from, to: promotionSquare.to, promotion: piece });
      setPromotionSquare(null);
    }
  };

  const renderSquare = (i: number) => {
    const row = orientation === 'w' ? 7 - Math.floor(i / 8) : Math.floor(i / 8);
    const col = orientation === 'w' ? i % 8 : 7 - (i % 8);
    const square = String.fromCharCode(97 + col) + (row + 1) as SquareType;
    
    const piece = game.get(square);
    const isLight = (row + col) % 2 !== 0;
    const isSelected = selectedSquare === square;
    const isLegal = legalMoves.includes(square);
    const isLast = lastMove ? (lastMove.from === square || lastMove.to === square) : false;
    const isKingInCheck = inCheck && piece?.type === 'k' && piece?.color === turn;

    return (
      <Square
        key={square}
        coordinate={square}
        isLight={isLight}
        piece={piece}
        isSelected={isSelected}
        isLastMove={isLast}
        isLegalMove={isLegal}
        inCheck={isKingInCheck}
        onClick={() => handleSquareClick(square)}
      />
    );
  };

  return (
    <div className="relative select-none">
      <div className="grid grid-cols-8 grid-rows-8 w-full aspect-square border-8 border-stone-800 rounded-lg overflow-hidden shadow-2xl">
        {Array.from({ length: 64 }).map((_, i) => renderSquare(i))}
      </div>

      {/* Promotion Modal */}
      <AnimatePresence>
        {promotionSquare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-stone-800 p-4 rounded-xl shadow-xl border border-amber-500/30 flex gap-4">
              {['q', 'r', 'b', 'n'].map((p) => (
                <button
                  key={p}
                  onClick={() => handlePromotion(p as any)}
                  className="w-16 h-16 bg-stone-700 hover:bg-stone-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  {/* Render piece icon simply */}
                  <span className="text-4xl text-white capitalize">{p === 'n' ? 'Kn' : p}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
