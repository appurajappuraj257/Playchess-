import React from 'react';
import { motion } from 'motion/react';
import { Piece as PieceComponent } from './Piece';
import { Piece as ChessPiece } from 'chess.js';

type SquareProps = {
  isLight: boolean;
  piece: ChessPiece | null;
  isSelected: boolean;
  isLastMove: boolean;
  isLegalMove: boolean;
  inCheck: boolean;
  onClick: () => void;
  coordinate: string;
};

export const Square: React.FC<SquareProps> = ({
  isLight,
  piece,
  isSelected,
  isLastMove,
  isLegalMove,
  inCheck,
  onClick,
  coordinate
}) => {
  
  let bgClass = isLight ? 'bg-stone-300' : 'bg-stone-600';
  
  // Overrides
  if (isSelected) {
    bgClass = 'bg-amber-400/80';
  } else if (isLastMove) {
    bgClass = 'bg-amber-200/60';
  } else if (inCheck) {
    bgClass = 'bg-red-500/80';
  }

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center cursor-pointer ${bgClass} transition-colors duration-200`}
      onClick={onClick}
      data-square={coordinate}
    >
      {/* Legal Move Indicator */}
      {isLegalMove && !piece && (
        <div className="absolute w-3 h-3 rounded-full bg-black/20" />
      )}
      {isLegalMove && piece && (
        <div className="absolute w-full h-full rounded-full border-4 border-black/20" />
      )}

      {/* Coordinate Labels (optional, can be added to specific squares) */}
      
      {piece && <PieceComponent type={piece.type} color={piece.color} />}
    </div>
  );
};
