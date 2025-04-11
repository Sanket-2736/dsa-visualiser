import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Trash2, Search, List } from "lucide-react";

const StackPage = () => {
  const [stack, setStack] = useState([]);
  const [value, setValue] = useState("");
  const [steps, setSteps] = useState([]);

  const handlePush = () => {
    if (value.trim() === "") return;

    const newVal = parseInt(value);
    const updatedStack = [...stack, newVal];
    const newSteps = [...steps, `Pushed ${newVal} to the stack.`];

    setStack(updatedStack);
    setSteps(newSteps);
    setValue("");
  };

  const handlePop = () => {
    if (stack.length === 0) return;

    const popped = stack[stack.length - 1];
    const updatedStack = stack.slice(0, -1);
    const newSteps = [...steps, `Popped ${popped} from the stack.`];

    setStack(updatedStack);
    setSteps(newSteps);
  };

  const top = stack.length > 0 ? stack[stack.length - 1] : null;
  const size = stack.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Stack Simulation
        </motion.h1>
        <motion.p
          className="text-lg text-indigo-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Perform operations on a Stack: Push, Pop, Peek Top, and visualize steps.
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handlePush}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-all"
          >
            <ArrowRight size={18} /> Push
          </button>
          <button
            onClick={handlePop}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-all"
          >
            <Trash2 size={18} /> Pop
          </button>
        </div>

        <motion.div
          className="bg-indigo-800/20 p-6 rounded-xl shadow-lg border border-indigo-700/30 backdrop-blur-md mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-indigo-300 mb-3">Current Stack</h3>
          {stack.length === 0 ? (
            <p className="text-sm text-gray-300">The stack is empty</p>
          ) : (
            <div className="flex gap-3 justify-center flex-wrap">
              {[...stack].reverse().map((val, index) => (
                <motion.div
                  key={index}
                  className="bg-indigo-700 px-4 py-2 rounded-lg text-white shadow-md"
                  whileHover={{ scale: 1.1 }}
                >
                  {val}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            className="bg-gray-800 p-5 rounded-xl border border-indigo-700/40"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
              <Search size={18} /> Top Element
            </h4>
            <p className="text-white text-xl">{top !== null ? top : "N/A"}</p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-5 rounded-xl border border-indigo-700/40"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
              <List size={18} /> Stack Size
            </h4>
            <p className="text-white text-xl">{size}</p>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 bg-indigo-800/10 border border-indigo-700/30 p-6 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-indigo-400 mb-4">Iteration Steps</h3>
          <ul className="text-indigo-200 text-sm list-disc list-inside space-y-1 text-left">
            {steps.length === 0 ? (
              <li>No steps available</li>
            ) : (
              steps.map((step, index) => <li key={index}>{step}</li>)
            )}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default StackPage;
