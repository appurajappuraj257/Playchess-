import React from 'react';
import { useChessGame } from './hooks/useChessGame';
import { ChessBoard } from './components/ChessBoard';
import { GameControls } from './components/GameControls';
import { motion } from 'motion/react';

export default function App() {
  const {
    game,
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
  } = useChessGame();

  return (
    <div className="min-h-screen bg-stone-900 text-stone-200 flex flex-col items-center justify-center p-4 md:p-8 font-sans selection:bg-amber-500/30">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-500 tracking-tight drop-shadow-lg">
          PlayChess
        </h1>
        <p className="text-stone-500 mt-2 text-sm uppercase tracking-widest font-medium">
          Premium Chess Experience
        </p>
      </motion.header>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start w-full max-w-6xl mx-auto">
        
        {/* Board Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 w-full max-w-[600px] relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-stone-800/50 rounded-2xl blur-xl -z-10 opacity-50" />
          
          <ChessBoard
            game={game}
            fen={fen}
            onMove={makeMove}
            orientation="w" // Always White for now (or toggle based on player choice)
            lastMove={lastMove}
            inCheck={inCheck}
            turn={turn}
          />

          {/* AI Thinking Indicator */}
          {isAiThinking && (
            <div className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur px-3 py-1 rounded-full text-xs font-mono text-amber-400 border border-amber-500/30 animate-pulse shadow-lg">
              AI Thinking...
            </div>
          )}
        </motion.div>

        {/* Controls Container */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md flex flex-col gap-6"
        >
          <GameControls
            mode={mode}
            setMode={setMode}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            status={status}
            winner={winner}
            onReset={resetGame}
            onUndo={undoMove}
            turn={turn}
            historyLength={history.length}
          />

          {/* Move History (Simple List) */}
          <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 shadow-lg flex-1 min-h-[200px] max-h-[300px] overflow-y-auto custom-scrollbar">
            <h3 className="text-stone-400 text-xs uppercase tracking-wider font-bold mb-3 sticky top-0 bg-stone-800 pb-2 border-b border-stone-700">
              Move History
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm font-mono">
              {history.reduce((acc: any[], move, i) => {
                if (i % 2 === 0) {
                  acc.push({ white: move, black: '' });
                } else {
                  acc[acc.length - 1].black = move;
                }
                return acc;
              }, []).map((round: any, i: number) => (
                <React.Fragment key={i}>
                  <div className="text-stone-500 text-right pr-2 border-r border-stone-700/50">
                    {i + 1}.
                  </div>
                  <div className="flex justify-between pl-2">
                    <span className="text-stone-300">{round.white}</span>
                    <span className="text-stone-400">{round.black}</span>
                  </div>
                </React.Fragment>
              ))}
              {history.length === 0 && (
                <div className="col-span-2 text-stone-600 text-center py-8 italic">
                  Game hasn't started yet.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
