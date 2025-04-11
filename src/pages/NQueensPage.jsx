import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

const NQueensPage = () => {
  const [size, setSize] = useState(4);
  const [board, setBoard] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const solveNQueensSteps = (n) => {
    const steps = [];
    const board = Array(n).fill().map(() => Array(n).fill(0));

    const isSafe = (row, col) => {
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false;
      }
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
      }
      for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 1) return false;
      }
      return true;
    };

    const placeQueens = (row) => {
      if (row === n) {
        steps.push(board.map((row) => [...row]));
        return;
      }

      for (let col = 0; col < n; col++) {
        if (isSafe(row, col)) {
          board[row][col] = 1;
          steps.push(board.map((r) => [...r]));
          placeQueens(row + 1);
          board[row][col] = 0;
          steps.push(board.map((r) => [...r]));
        }
      }
    };

    placeQueens(0);
    return steps;
  };

  const reset = () => {
    const clamped = Math.max(4, Math.min(8, size));
    const steps = solveNQueensSteps(clamped);
    setBoard(Array(clamped).fill().map(() => Array(clamped).fill(0)));
    setSolutions(steps);
    setCurrentStep(0);
    setPlaying(false);
  };

  const stepForward = () => {
    setBoard(solutions[currentStep]);
    setCurrentStep((prev) => prev + 1);
  };

  useEffect(() => {
    reset();
  }, [size]);

  useEffect(() => {
    if (!playing || currentStep >= solutions.length) return;
    const timer = setTimeout(() => {
      stepForward();
    }, 600);
    return () => clearTimeout(timer);
  }, [playing, currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          N-Queens Visualizer
        </motion.h1>
        <motion.p
          className="text-lg text-indigo-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Visualize step-by-step queen placements using backtracking.
        </motion.p>

        <div className="flex justify-center gap-4 mb-10">
          <input
            type="number"
            min="4"
            max="8"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="bg-gray-800 border border-indigo-500 text-white px-4 py-2 rounded-md w-32 text-center"
          />
          <button
            onClick={() => setPlaying(!playing)}
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md flex items-center gap-2"
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}{" "}
            {playing ? "Pause" : "Play"}
          </button>
          <button
            onClick={reset}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center gap-2"
          >
            <RotateCcw size={18} /> Reset
          </button>
        </div>

        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, 2.5rem)` }}>
            {board.flatMap((row, i) =>
              row.map((cell, j) => (
                <motion.div
                  key={`${i}-${j}`}
                  className={`w-10 h-10 flex items-center justify-center border 
                    ${ (i + j) % 2 === 0 ? "bg-indigo-600" : "bg-indigo-800" }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {cell === 1 ? "♕" : ""}
                </motion.div>
              ))
            )}
          </div>
        </div>

        <p className="text-sm text-indigo-300">
          Step {currentStep} / {solutions.length}
        </p>
      </div>
    </div>
  );
};

export default NQueensPage;
