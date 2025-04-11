import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Search, List } from "lucide-react";

const HashMapPage = () => {
  const [hashMap, setHashMap] = useState([]);
  const [steps, setSteps] = useState([]);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [size, setSize] = useState(0);

  const updateSize = (map) => setSize(map.length);

  const handlePut = () => {
    if (key.trim() === "" || value.trim() === "") return;

    const intKey = parseInt(key);
    const intValue = parseInt(value);
    let updated = false;

    const newMap = hashMap.map((entry) => {
      if (entry.key === intKey) {
        updated = true;
        return { key: intKey, value: intValue };
      }
      return entry;
    });

    if (!updated) {
      newMap.push({ key: intKey, value: intValue });
    }

    setHashMap(newMap);
    setSteps((prev) => [
      ...prev,
      `Put ${intKey} : ${intValue}${updated ? " (updated)" : ""}`,
    ]);
    updateSize(newMap);
    setKey("");
    setValue("");
  };

  const handleRemove = () => {
    if (key.trim() === "") return;

    const intKey = parseInt(key);
    const newMap = hashMap.filter((entry) => entry.key !== intKey);

    if (newMap.length !== hashMap.length) {
      setSteps((prev) => [...prev, `Removed key ${intKey}`]);
    } else {
      setSteps((prev) => [...prev, `Key ${intKey} not found`]);
    }

    setHashMap(newMap);
    updateSize(newMap);
    setKey("");
  };

  const handleSearch = () => {
    if (key.trim() === "") return;

    const intKey = parseInt(key);
    const found = hashMap.find((entry) => entry.key === intKey);
    setSearchResult(found ? [found.value] : []);
    setSteps((prev) => [
      ...prev,
      found ? `Found key ${intKey} with value ${found.value}` : `Key ${intKey} not found`,
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          HashMap Simulation
        </motion.h1>
        <motion.p
          className="text-lg text-indigo-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Add, remove, and search key-value pairs in a HashMap with visual feedback.
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
          <input
            type="number"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Key"
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value"
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handlePut}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <Plus size={18} /> Put
          </button>
          <button
            onClick={handleRemove}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <Trash2 size={18} /> Remove
          </button>
          <button
            onClick={handleSearch}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <Search size={18} /> Get
          </button>
        </div>

        <motion.div
          className="bg-indigo-800/20 p-6 rounded-xl shadow-lg border border-indigo-700/30 backdrop-blur-md mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-indigo-300 mb-3">Current HashMap</h3>
          {hashMap.length === 0 ? (
            <p className="text-sm text-gray-300">The hashmap is empty</p>
          ) : (
            <div className="flex gap-3 justify-center flex-wrap">
              {hashMap.map(({ key, value }) => (
                <motion.div
                  key={key}
                  className="bg-indigo-700 px-4 py-2 rounded-lg text-white shadow-md"
                  whileHover={{ scale: 1.1 }}
                >
                  {key} : {value}
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
              <Search size={18} /> Get Result
            </h4>
            <p className="text-white text-xl">
              {searchResult.length > 0 ? searchResult[0] : "N/A"}
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-5 rounded-xl border border-indigo-700/40"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-indigo-400 mb-3 flex items-center gap-2">
              <List size={18} /> HashMap Size
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

export default HashMapPage;
