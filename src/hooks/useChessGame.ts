import { useState, useEffect, useCallback, useRef } from 'react';
import { Chess, Move } from 'chess.js';
import { getBestMove } from '../game/ai';

export type GameMode = 'PvP' | 'PvAI';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export function useChessGame() {
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState(gameRef.current.fen());
  const [mode, setMode] = useState<GameMode>('PvAI');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [history, setHistory] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<'w' | 'b' | 'draw' | null>(null);
  const [status, setStatus] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [turn, setTurn] = useState<'w' | 'b'>('w');
  const [inCheck, setInCheck] = useState(false);

  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);

  const updateGameState = useCallback(() => {
    const game = gameRef.current;
    setFen(game.fen());
    setHistory(game.history());
    setIsGameOver(game.isGameOver());
    setTurn(game.turn());
    setInCheck(game.inCheck());
    
    const verboseHistory = game.history({ verbose: true });
    if (verboseHistory.length > 0) {
        setLastMove(verboseHistory[verboseHistory.length - 1]);
    } else {
        setLastMove(null);
    }
    
    if (game.isCheckmate()) {
      setWinner(game.turn() === 'w' ? 'b' : 'w');
      setStatus(`Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins.`);
    } else if (game.isDraw()) {
      setWinner('draw');
      if (game.isStalemate()) {
        setStatus('Stalemate!');
      } else if (game.isThreefoldRepetition()) {
        setStatus('Draw by Repetition!');
      } else if (game.isInsufficientMaterial()) {
        setStatus('Draw by Insufficient Material!');
      } else {
        setStatus('Draw!');
      }
    } else if (game.inCheck()) {
        setStatus('Check!');
    } else {
      setStatus('');
    }
  }, []);

  const makeMove = useCallback((move: string | { from: string; to: string; promotion?: string }) => {
    const game = gameRef.current;
    try {
      const result = game.move(move);
      if (result) {
        updateGameState();
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }, [updateGameState]);

  const resetGame = useCallback(() => {
    const game = gameRef.current;
    game.reset();
    updateGameState();
    setWinner(null);
    setStatus('');
  }, [updateGameState]);

  const undoMove = useCallback(() => {
    const game = gameRef.current;
    game.undo();
    if (mode === 'PvAI' && game.turn() === 'b') {
        // If it was AI's turn (Black), undo again to get back to Player's turn (White)
        // Wait, if I undo once, it becomes White's turn?
        // If I am White, and I just moved, it is Black's turn.
        // If AI moved, it is White's turn.
        // If I want to undo my last move, I need to undo AI's move AND my move.
        // So if it is White's turn (after AI moved), undo twice.
        // If it is Black's turn (AI hasn't moved yet), undo once.
        
        // Actually, simpler: just undo.
        // But usually in PvAI, you want to undo the whole round.
        // Let's just undo once for now, user can click twice.
        // Or better: if it's player's turn, undo twice (AI move + Player move).
        if (game.turn() === 'w' && history.length >= 2) {
             game.undo(); // Undo AI
             // game.undo(); // Undo Player - wait, let's let the user decide or just undo AI?
             // Standard behavior: Undo takes you back to YOUR last turn.
             // So if it's my turn, undo AI move AND my move.
        }
    }
    updateGameState();
  }, [mode, updateGameState, history.length]);

  // AI Logic
  useEffect(() => {
    const game = gameRef.current;
    if (mode === 'PvAI' && game.turn() === 'b' && !game.isGameOver()) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        let depth = 1;
        if (difficulty === 'Medium') depth = 2;
        if (difficulty === 'Hard') depth = 3;

        // We need to pass a copy or handle the game instance carefully in AI
        // But getBestMove uses the game instance synchronously, so it's fine.
        // However, getBestMove mutates and undoes.
        const bestMove = getBestMove(game, depth);
        if (bestMove) {
          makeMove(bestMove);
        }
        setIsAiThinking(false);
      }, 500); // Small delay for realism
      return () => clearTimeout(timer);
    }
  }, [fen, mode, difficulty, makeMove]);

  return {
    game: gameRef.current,
    fen,
    mode,
    setMode,
    difficulty,
    setDifficulty,
    history,
    isGameOver,
    winner,
    status,
    makeMove,
    resetGame,
    undoMove,
    isAiThinking,
    turn,
    inCheck,
    lastMove
  };
}
