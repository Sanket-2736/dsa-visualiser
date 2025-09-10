import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Trash2, Link, Info } from "lucide-react";

const GraphPage = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeValue, setNodeValue] = useState("");
  const [edgeStart, setEdgeStart] = useState("");
  const [edgeEnd, setEdgeEnd] = useState("");
  const [removeNode, setRemoveNode] = useState("");
  const [removeEdge, setRemoveEdge] = useState("");
  const [steps, setSteps] = useState([]);

  const updateSteps = (action) => {
    setSteps((prev) => [...prev, action]);
  };

  const handleAddNode = () => {
    if (!nodeValue.trim()) return;
    setNodes((prev) => [...prev, nodeValue]);
    updateSteps(`Added node: ${nodeValue}`);
    setNodeValue("");
  };

  const handleAddEdge = () => {
    if (!edgeStart.trim() || !edgeEnd.trim()) return;
    const edge = `${edgeStart} → ${edgeEnd}`;
    setEdges((prev) => [...prev, edge]);
    updateSteps(`Added edge: ${edge}`);
    setEdgeStart("");
    setEdgeEnd("");
  };

  const handleRemoveNode = (node) => {
    if (!node.trim()) return;

    const updatedNodes = nodes.filter((n) => n !== node);
    const updatedEdges = edges.filter(
      (edge) => !edge.includes(node)
    );

    setNodes(updatedNodes);
    setEdges(updatedEdges);
    updateSteps(`Removed node: ${node}`);
    setRemoveNode("");
  };

  const handleRemoveEdge = (edge) => {
    if (!edge.trim()) return;

    const updatedEdges = edges.filter((e) => e !== edge);
    setEdges(updatedEdges);
    updateSteps(`Removed edge: ${edge}`);
    setRemoveEdge("");
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
          Graph Simulation
        </motion.h1>
        <motion.p
          className="text-lg text-purple-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Add/remove nodes and edges. Visualize the current state of the graph.
        </motion.p>

        {/* Add Node */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <input
            type="text"
            placeholder="Node Value"
            value={nodeValue}
            onChange={(e) => setNodeValue(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleAddNode}
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-all"
          >
            <PlusCircle size={18} /> Add Node
          </button>
        </div>

        {/* Add Edge */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <input
            type="text"
            placeholder="Edge Start Node"
            value={edgeStart}
            onChange={(e) => setEdgeStart(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            placeholder="Edge End Node"
            value={edgeEnd}
            onChange={(e) => setEdgeEnd(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleAddEdge}
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-all"
          >
            <Link size={18} /> Add Edge
          </button>
        </div>

        {/* Remove Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            { label: "Remove Node", val: removeNode, setVal: setRemoveNode, action: handleRemoveNode },
            { label: "Remove Edge", val: removeEdge, setVal: setRemoveEdge, action: handleRemoveEdge },
          ].map(({ label, val, setVal, action }, i) => (
            <div key={i} className="flex flex-col gap-3 items-center">
              <input
                type="text"
                placeholder={label}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="bg-gray-800 text-white px-3 py-2 rounded-md border border-purple-500 w-full"
              />
              <button
                onClick={() => action(val)}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <Trash2 size={18} /> {label.split(" ")[2]}
              </button>
            </div>
          ))}
        </div>

        {/* Graph Display */}
        <motion.div
          className="bg-purple-800/20 p-6 rounded-xl shadow-lg border border-purple-700/30 backdrop-blur-md mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-purple-300 mb-3">Graph Nodes</h3>
          {nodes.length === 0 ? (
            <p className="text-sm text-gray-300">No nodes added</p>
          ) : (
            <div className="flex gap-3 justify-center flex-wrap">
              {nodes.map((node, index) => (
                <motion.div
                  key={index}
                  className="bg-purple-700 px-4 py-2 rounded-lg text-white shadow-md"
                  whileHover={{ scale: 1.1 }}
                >
                  {node}
                </motion.div>
              ))}
            </div>
          )}

          <h3 className="text-xl font-semibold text-purple-300 mt-6 mb-3">Graph Edges</h3>
          {edges.length === 0 ? (
            <p className="text-sm text-gray-300">No edges added</p>
          ) : (
            <div className="flex gap-3 justify-center flex-wrap">
              {edges.map((edge, index) => (
                <motion.div
                  key={index}
                  className="bg-purple-700 px-4 py-2 rounded-lg text-white shadow-md"
                  whileHover={{ scale: 1.1 }}
                >
                  {edge}
                </motion.div>
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
              <Info size={18} /> List Size
            </h4>
            <p className="text-white">Nodes: {nodes.length}</p>
            <p className="text-white">Edges: {edges.length}</p>
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

export default GraphPage;

