import React from 'react';
import { GameMode, Difficulty } from '../hooks/useChessGame';
import { RotateCcw, Undo2, Settings, User, Bot } from 'lucide-react';

type GameControlsProps = {
  mode: GameMode;
  setMode: (mode: GameMode) => void;
  difficulty: Difficulty;
  setDifficulty: (diff: Difficulty) => void;
  status: string;
  winner: 'w' | 'b' | 'draw' | null;
  onReset: () => void;
  onUndo: () => void;
  turn: 'w' | 'b';
  historyLength: number;
};

export function GameControls({
  mode,
  setMode,
  difficulty,
  setDifficulty,
  status,
  winner,
  onReset,
  onUndo,
  turn,
  historyLength
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md bg-stone-800 p-6 rounded-xl shadow-xl border border-stone-700">
      {/* Header / Status */}
      <div className="text-center">
        <h2 className="text-2xl font-serif text-amber-400 mb-2">
          {winner ? (
            <span className="animate-pulse font-bold">
              {winner === 'draw' ? 'Game Drawn' : `${winner === 'w' ? 'White' : 'Black'} Wins!`}
            </span>
          ) : (
            <span className="text-stone-300">
              {status || `${turn === 'w' ? "White's" : "Black's"} Turn`}
            </span>
          )}
        </h2>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      </div>

      {/* Mode Selection */}
      <div className="flex bg-stone-900 p-1 rounded-lg">
        <button
          onClick={() => setMode('PvAI')}
          className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-all ${
            mode === 'PvAI' ? 'bg-stone-700 text-amber-400 shadow-md' : 'text-stone-500 hover:text-stone-300'
          }`}
        >
          <Bot size={18} /> PvAI
        </button>
        <button
          onClick={() => setMode('PvP')}
          className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-all ${
            mode === 'PvP' ? 'bg-stone-700 text-amber-400 shadow-md' : 'text-stone-500 hover:text-stone-300'
          }`}
        >
          <User size={18} /> PvP
        </button>
      </div>

      {/* Difficulty (Only for PvAI) */}
      {mode === 'PvAI' && (
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold">AI Difficulty</label>
          <div className="flex gap-2">
            {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`flex-1 py-1.5 px-3 rounded border text-sm transition-all ${
                  difficulty === level
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                    : 'border-stone-700 bg-stone-900 text-stone-500 hover:border-stone-600'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-2">
        <button
          onClick={onUndo}
          disabled={historyLength === 0 || !!winner}
          className="flex-1 py-3 px-4 bg-stone-700 hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed text-stone-200 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
        >
          <Undo2 size={18} /> Undo
        </button>
        <button
          onClick={onReset}
          className="flex-1 py-3 px-4 bg-amber-600 hover:bg-amber-500 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium shadow-lg shadow-amber-900/20"
        >
          <RotateCcw size={18} /> New Game
        </button>
      </div>
    </div>
  );
}
