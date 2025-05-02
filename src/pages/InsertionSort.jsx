import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

const generateRandomArray = (n) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);

const InsertionSortPage = () => {
  const [arr, setArr] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [highlight, setHighlight] = useState([]);

  // Generate insertion sort steps
  const insertionSortSteps = (array) => {
    const a = [...array];
    const s = [];
    
    s.push({ arr: [...a], highlight: [0] }); // Initial state
    
    for (let i = 1; i < a.length; i++) {
      let j = i;
      s.push({ arr: [...a], highlight: [i] }); // Highlight current element being inserted
      
      while (j > 0 && a[j - 1] > a[j]) {
        s.push({ arr: [...a], highlight: [j, j - 1] }); // Highlight comparison
        
        // Swap elements
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        s.push({ arr: [...a], highlight: [j, j - 1] }); // Show after swap
        
        j--;
      }
    }
    
    s.push({ arr: [...a], highlight: [] }); // Final sorted state
    return s;
  };

  const reset = () => {
    const newArray = generateRandomArray(20);
    const generatedSteps = insertionSortSteps(newArray);
    setArr(newArray);
    setSteps(generatedSteps);
    setCurrentStep(0);
    setHighlight([]);
    setPlaying(false);
  };

  const stepForward = () => {
    const step = steps[currentStep];
    setArr(step.arr);
    setHighlight(step.highlight);
    setCurrentStep((prev) => prev + 1);
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (!playing || currentStep >= steps.length) return;
    const timer = setTimeout(() => {
      stepForward();
    }, 200);
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
          Insertion Sort Visualizer
        </motion.h1>
        <motion.p
          className="text-lg text-indigo-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Watch elements insert into their correct positions one at a time!
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

        <div className="flex justify-center items-end gap-1 h-64 mx-auto max-w-3xl px-2">
          {arr.map((value, idx) => (
            <motion.div
              key={idx}
              className={`w-4 md:w-5 rounded-t ${
                highlight.includes(idx)
                  ? "bg-yellow-400"
                  : "bg-indigo-500"
              }`}
              style={{ height: `${value * 2}px` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <p className="text-sm text-indigo-300 mt-8">
          Step {currentStep} / {steps.length}
        </p>
      </div>
    </div>
  );
};

export default InsertionSortPage;