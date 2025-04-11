import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Search } from "lucide-react";

const generateSortedArray = (n) =>
  Array.from({ length: n }, (_, i) => i * 5 + 10);

const BinarySearchPage = () => {
  const [arr, setArr] = useState([]);
  const [target, setTarget] = useState(0);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [mid, setMid] = useState(null);

  const binarySearchSteps = (array, target) => {
    let l = 0,
      r = array.length - 1;
    const s = [];

    while (l <= r) {
      let m = Math.floor((l + r) / 2);
      s.push({ low: l, high: r, mid: m });

      if (array[m] === target) break;
      else if (array[m] < target) l = m + 1;
      else r = m - 1;
    }

    return s;
  };

  const reset = () => {
    const newArray = generateSortedArray(20);
    const randomTarget = newArray[Math.floor(Math.random() * newArray.length)];
    const searchSteps = binarySearchSteps(newArray, randomTarget);

    setArr(newArray);
    setTarget(randomTarget);
    setSteps(searchSteps);
    setCurrentStep(0);
    setPlaying(false);
    setLow(null);
    setHigh(null);
    setMid(null);
  };

  const stepForward = () => {
    const step = steps[currentStep];
    setLow(step.low);
    setHigh(step.high);
    setMid(step.mid);
    setCurrentStep((prev) => prev + 1);
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (!playing || currentStep >= steps.length) return;
    const timer = setTimeout(() => {
      stepForward();
    }, 800);
    return () => clearTimeout(timer);
  }, [playing, currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Binary Search Visualizer
        </motion.h1>
        <motion.p
          className="text-lg text-indigo-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Step through the binary search algorithm with visual highlights.
        </motion.p>

        <div className="flex justify-center gap-4 mb-10">
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

        <div className="flex justify-center items-end gap-1 mx-auto max-w-4xl px-2 mb-8">
          {arr.map((value, idx) => (
            <motion.div
              key={idx}
              className={`w-6 h-20 flex items-end justify-center rounded-t-md text-sm font-bold transition-colors duration-300 ${
                idx === mid
                  ? "bg-yellow-400 text-black"
                  : idx >= low && idx <= high
                  ? "bg-indigo-500"
                  : "bg-gray-700"
              }`}
            >
              <div className="p-1">{value}</div>
            </motion.div>
          ))}
        </div>

        <p className="text-indigo-300 text-sm">
          Searching for:{" "}
          <span className="font-semibold text-white">{target}</span>
        </p>
        <p className="text-sm text-indigo-300 mt-2">
          Step {currentStep} / {steps.length}
        </p>
      </div>
    </div>
  );
};

export default BinarySearchPage;
