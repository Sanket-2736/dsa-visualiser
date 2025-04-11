import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Trash2, ListOrdered, Info } from "lucide-react";

const LinkedListPage = () => {
  const [nodes, setNodes] = useState([]);
  const [value, setValue] = useState("");
  const [removeId, setRemoveId] = useState("");
  const [removeIndex, setRemoveIndex] = useState("");
  const [removeValue, setRemoveValue] = useState("");
  const [steps, setSteps] = useState([]);

  const updateSteps = (action) => {
    setSteps((prev) => [...prev, action]);
  };

  const handleAdd = () => {
    if (!value.trim()) return;
    setNodes((prev) => [...prev, parseInt(value)]);
    updateSteps(`Added ${value}`);
    setValue("");
  };

  const handleRemove = (type, param) => {
    if (!param.trim()) return;

    const num = parseInt(param);
    let updatedNodes = [...nodes];

    if (type === "remove") {
      if (num >= 0 && num < updatedNodes.length) {
        updateSteps(`Removed by ID ${num}: ${updatedNodes[num]}`);
        updatedNodes.splice(num, 1);
      }
      setRemoveId("");
    } else if (type === "remove-by-index") {
      if (num >= 0 && num < updatedNodes.length) {
        updateSteps(`Removed by Index ${num}: ${updatedNodes[num]}`);
        updatedNodes.splice(num, 1);
      }
      setRemoveIndex("");
    } else if (type === "remove-by-value") {
      const idx = updatedNodes.indexOf(num);
      if (idx !== -1) {
        updatedNodes.splice(idx, 1);
        updateSteps(`Removed by Value: ${num}`);
      }
      setRemoveValue("");
    }

    setNodes(updatedNodes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Linked List Simulation
        </motion.h1>
        <motion.p
          className="text-lg text-purple-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Add or remove nodes by ID, Index, or Value. Visualize the current state of the list.
        </motion.p>

        {/* Add Node */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <input
            type="number"
            placeholder="Value to Add"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleAdd}
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-all"
          >
            <PlusCircle size={18} /> Add Node
          </button>
        </div>

        {/* Remove Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Remove by ID", val: removeId, setVal: setRemoveId, type: "remove" },
            { label: "Remove by Index", val: removeIndex, setVal: setRemoveIndex, type: "remove-by-index" },
            { label: "Remove by Value", val: removeValue, setVal: setRemoveValue, type: "remove-by-value" }
          ].map(({ label, val, setVal, type }, i) => (
            <div key={i} className="flex flex-col gap-3 items-center">
              <input
                type="number"
                placeholder={label}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="bg-gray-800 text-white px-3 py-2 rounded-md border border-purple-500 w-full"
              />
              <button
                onClick={() => handleRemove(type, val)}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <Trash2 size={18} /> {label.split(" ")[2]}
              </button>
            </div>
          ))}
        </div>

        {/* Linked List Nodes Display */}
        <motion.div
          className="bg-purple-800/20 p-6 rounded-xl shadow-lg border border-purple-700/30 backdrop-blur-md mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-purple-300 mb-3">Linked List Nodes</h3>
          {nodes.length === 0 ? (
            <p className="text-sm text-gray-300">The list is empty</p>
          ) : (
            <div className="flex gap-3 justify-center flex-wrap">
              {nodes.map((val, index) => (
                <div key={index} className="flex items-center gap-2">
                  <motion.div
                    className="bg-purple-700 px-4 py-2 rounded-lg text-white shadow-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    {val}
                  </motion.div>
                  {index < nodes.length - 1 ? (
                    <span className="text-purple-300 text-2xl">→</span>
                  ) : (
                    <span className="text-gray-400 text-sm font-mono ml-2">→ null</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            className="bg-gray-800 p-5 rounded-xl border border-purple-700/40"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
              <ListOrdered size={18} /> List Size
            </h4>
            <p className="text-white">{nodes.length}</p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-5 rounded-xl border border-purple-700/40"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
              <Info size={18} /> Iteration Steps
            </h4>
            <ul className="list-disc list-inside text-gray-300">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListPage;
