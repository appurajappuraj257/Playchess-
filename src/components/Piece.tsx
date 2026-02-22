import React from 'react';
import { motion } from 'motion/react';

type PieceProps = {
  type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
  color: 'w' | 'b';
};

const PIECE_SVGS: Record<string, React.ReactNode> = {
  w_p: (
    <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21h13c0-2.41-1.33-4.5-2.78-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />
    </g>
  ),
  w_n: (
    <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" />
      <path d="M24 18c.38 2.32-.46 2.96-2.36 3.25-2.78.42-4.33-2.3-4-4.08.59-3.25 5.42-5.36 6.36-7.17.59-1.14.34-2.46-.41-3.27-.76-.81-1.96-.96-2.82-.4-1.91 1.24-2.85 4.35-2.82 7.67" />
    </g>
  ),
  w_b: (
    <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <g fill="#fff" stroke="#000" strokeLinecap="butt">
        <path d="M9 36c3.39-.97 9.11-1.45 13.5-2.95C25.29 34.34 27 36 27 36H9z" />
        <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2H15s-.5.5 0 2z" />
        <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" />
      </g>
      <path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" strokeLinejoin="miter" />
      <path d="M20 18c-1.88 0-3.69.56-5.16 1.53-.78.51-1.34 1.27-1.34 2.16 0 1.79 1.94 3.31 4.5 3.31 2.56 0 4.5-1.52 4.5-3.31 0-.89-.56-1.65-1.34-2.16C23.69 18.56 21.88 18 20 18z" />
      <path d="M20 18c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
    </g>
  ),
  w_r: (
    <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinecap="butt" />
      <path d="M34 14l-3 3H14l-3-3" />
      <path d="M31 17v12.5c1.71 2.89 2.5 5.87 2.5 6.5H11.5c0-.63.79-3.61 2.5-6.5V17" strokeLinecap="butt" strokeLinejoin="miter" />
    </g>
  ),
  w_q: (
    <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM10.5 20.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM38.5 20.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" />
      <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11 2 12z" strokeLinecap="butt" />
      <path d="M9 26c0 2 1.5 2 2.5 4 1 2.5 12.5 2.5 13.5 0 1-2 2.5-2 2.5-4 0-2.5-2.5-4-5-4s-5 1.5-5 4c0-2.5-2.5-4-5-4s-5 1.5-5 4z" strokeLinecap="butt" />
      <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" />
    </g>
  ),
  w_k: (
    <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 11.63V6M20 8h5" strokeLinejoin="miter" />
      <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#fff" strokeLinecap="butt" strokeLinejoin="miter" />
      <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7z" fill="#fff" strokeLinecap="butt" />
      <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" fill="none" />
    </g>
  ),
  b_p: (
    <g fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21h13c0-2.41-1.33-4.5-2.78-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />
    </g>
  ),
  b_n: (
    <g fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" />
      <path d="M24 18c.38 2.32-.46 2.96-2.36 3.25-2.78.42-4.33-2.3-4-4.08.59-3.25 5.42-5.36 6.36-7.17.59-1.14.34-2.46-.41-3.27-.76-.81-1.96-.96-2.82-.4-1.91 1.24-2.85 4.35-2.82 7.67" />
    </g>
  ),
  b_b: (
    <g fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <g fill="#000" stroke="#fff" strokeLinecap="butt">
        <path d="M9 36c3.39-.97 9.11-1.45 13.5-2.95C25.29 34.34 27 36 27 36H9z" />
        <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2H15s-.5.5 0 2z" />
        <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" />
      </g>
      <path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" strokeLinejoin="miter" />
      <path d="M20 18c-1.88 0-3.69.56-5.16 1.53-.78.51-1.34 1.27-1.34 2.16 0 1.79 1.94 3.31 4.5 3.31 2.56 0 4.5-1.52 4.5-3.31 0-.89-.56-1.65-1.34-2.16C23.69 18.56 21.88 18 20 18z" />
      <path d="M20 18c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
    </g>
  ),
  b_r: (
    <g fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinecap="butt" />
      <path d="M34 14l-3 3H14l-3-3" />
      <path d="M31 17v12.5c1.71 2.89 2.5 5.87 2.5 6.5H11.5c0-.63.79-3.61 2.5-6.5V17" strokeLinecap="butt" strokeLinejoin="miter" />
    </g>
  ),
  b_q: (
    <g fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM10.5 20.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM38.5 20.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" />
      <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11 2 12z" strokeLinecap="butt" />
      <path d="M9 26c0 2 1.5 2 2.5 4 1 2.5 12.5 2.5 13.5 0 1-2 2.5-2 2.5-4 0-2.5-2.5-4-5-4s-5 1.5-5 4c0-2.5-2.5-4-5-4s-5 1.5-5 4z" strokeLinecap="butt" />
      <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" />
    </g>
  ),
  b_k: (
    <g fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 11.63V6M20 8h5" strokeLinejoin="miter" />
      <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#000" strokeLinecap="butt" strokeLinejoin="miter" />
      <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7z" fill="#000" strokeLinecap="butt" />
      <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" fill="none" />
    </g>
  ),
};

export function Piece({ type, color }: PieceProps) {
  const key = `${color}_${type}`;
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="w-full h-full flex items-center justify-center select-none pointer-events-none"
    >
      <svg viewBox="0 0 45 45" className="w-[85%] h-[85%] drop-shadow-md">
        {PIECE_SVGS[key]}
      </svg>
    </motion.div>
  );
}
