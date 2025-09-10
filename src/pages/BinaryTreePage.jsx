import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Trash2, ListOrdered, Info } from "lucide-react";

const BinaryTreePage = () => {
  const [value, setValue] = useState("");
  const [removeValue, setRemoveValue] = useState("");
  const [steps, setSteps] = useState([]);
  const [root, setRoot] = useState(null);
  const [traversalResult, setTraversalResult] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const updateSteps = (action) => {
    setSteps((prev) => [...prev, action]);
  };

  const handleAddNode = () => {
    if (!value.trim()) return;
    const newNode = parseInt(value);
    setRoot(insertNode(root, newNode));
    updateSteps(`Added node: ${newNode}`);
    setValue("");
  };

  const insertNode = (node, value) => {
    if (node === null) {
      return { value, left: null, right: null };
    }

    if (value < node.value) {
      node.left = insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = insertNode(node.right, value);
    }

    return node;
  };

  const handleRemoveNode = (value) => {
    if (!value.trim()) return;

    const newRoot = removeNode(root, parseInt(value));
    if (newRoot) {
      setRoot(newRoot);
      updateSteps(`Removed node: ${value}`);
    }
    setRemoveValue("");
  };

  const removeNode = (node, value) => {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.left = removeNode(node.left, value);
    } else if (value > node.value) {
      node.right = removeNode(node.right, value);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      let minNode = findMin(node.right);
      node.value = minNode.value;
      node.right = removeNode(node.right, minNode.value);
    }

    return node;
  };

  const findMin = (node) => {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  };

  // Calculate tree dimensions for better positioning
  const getTreeWidth = (node) => {
    if (node === null) return 0;
    const leftWidth = getTreeWidth(node.left);
    const rightWidth = getTreeWidth(node.right);
    return Math.max(1, leftWidth + rightWidth);
  };

  const renderTree = (node, x = 0, y = 0, spacing = 100) => {
    if (node === null) {
      return null;
    }

    const leftWidth = getTreeWidth(node.left);
    const rightWidth = getTreeWidth(node.right);
    const nodeSpacing = Math.max(80, spacing / 2);

    return (
      <g key={`node-${node.value}-${x}-${y}`}>
        {/* Connection lines */}
        {node.left && (
          <line
            x1={x}
            y1={y}
            x2={x - nodeSpacing}
            y2={y + 60}
            stroke="#a855f7"
            strokeWidth="2"
          />
        )}
        {node.right && (
          <line
            x1={x}
            y1={y}
            x2={x + nodeSpacing}
            y2={y + 60}
            stroke="#a855f7"
            strokeWidth="2"
          />
        )}
        
        {/* Current node */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          <circle
            cx={x}
            cy={y}
            r="25"
            fill="#7c3aed"
            stroke="#a855f7"
            strokeWidth="2"
          />
          <text
            x={x}
            y={y}
            textAnchor="middle"
            dy="0.35em"
            fill="white"
            fontSize="14"
            fontWeight="bold"
          >
            {node.value}
          </text>
        </motion.g>

        {/* Recursive rendering for children */}
        {node.left && renderTree(node.left, x - nodeSpacing, y + 60, nodeSpacing)}
        {node.right && renderTree(node.right, x + nodeSpacing, y + 60, nodeSpacing)}
      </g>
    );
  };

  // Traverse Tree Methods
  const inorderTraversal = (node) => {
    if (node === null) return [];
    return [...inorderTraversal(node.left), node.value, ...inorderTraversal(node.right)];
  };

  const preorderTraversal = (node) => {
    if (node === null) return [];
    return [node.value, ...preorderTraversal(node.left), ...preorderTraversal(node.right)];
  };

  const postorderTraversal = (node) => {
    if (node === null) return [];
    return [...postorderTraversal(node.left), ...postorderTraversal(node.right), node.value];
  };

  const levelOrderTraversal = (node) => {
    if (node === null) return [];
    let result = [];
    let queue = [node];

    while (queue.length > 0) {
      let currentNode = queue.shift();
      result.push(currentNode.value);

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return result;
  };

  const handleTraversal = (type) => {
    let result = [];
    if (type === "inorder") result = inorderTraversal(root);
    else if (type === "preorder") result = preorderTraversal(root);
    else if (type === "postorder") result = postorderTraversal(root);
    else if (type === "levelorder") result = levelOrderTraversal(root);

    setTraversalResult(result);
    setCurrentStep(0);
    updateSteps(`${type} Traversal: [${result.join(', ')}]`);
  };

  const handleNextStep = () => {
    if (currentStep < traversalResult.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  function getTreeHeight(node) {
    if (node === null) return 0;
    return Math.max(getTreeHeight(node.left), getTreeHeight(node.right)) + 1;
  }

  function countNodes(node) {
    if (node === null) return 0;
    return countNodes(node.left) + countNodes(node.right) + 1;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Binary Tree Simulation
        </motion.h1>
        <motion.p
          className="text-lg text-purple-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Add or remove nodes in the binary tree and visualize its structure.
        </motion.p>

        {/* Add Node */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <input
            type="number"
            placeholder="Node Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleAddNode}
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-all"
          >
            <PlusCircle size={18} /> Add Node
          </button>
        </div>

        {/* Remove Node */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <input
            type="number"
            placeholder="Node Value to Remove"
            value={removeValue}
            onChange={(e) => setRemoveValue(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={() => handleRemoveNode(removeValue)}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-all"
          >
            <Trash2 size={18} /> Remove Node
          </button>
        </div>

        {/* Binary Tree Visualization with SVG */}
        <motion.div
          className="bg-purple-800/20 p-6 rounded-xl shadow-lg border border-purple-700/30 backdrop-blur-md mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-purple-300 mb-4">Binary Tree Structure</h3>
          {root === null ? (
            <p className="text-sm text-gray-300 py-8">The tree is empty. Add some nodes to get started!</p>
          ) : (
            <div className="overflow-x-auto">
              <svg 
                width="800" 
                height={Math.max(200, getTreeHeight(root) * 80)} 
                className="mx-auto"
                viewBox="-400 -20 800 400"
              >
                {renderTree(root, 0, 20, 150)}
              </svg>
            </div>
          )}
        </motion.div>

        {/* Traversal Controls */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {["inorder", "preorder", "postorder", "levelorder"].map((type) => (
            <button
              key={type}
              onClick={() => handleTraversal(type)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-all capitalize"
              disabled={root === null}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Traversal
            </button>
          ))}
        </div>

        {/* Step-by-step Visualization */}
        {traversalResult.length > 0 && (
          <motion.div 
            className="bg-gray-800/50 p-4 rounded-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-lg text-gray-300">
                Step {currentStep + 1} of {traversalResult.length}: <span className="text-purple-400 font-bold">{traversalResult[currentStep]}</span>
              </div>
              <button
                onClick={handleNextStep}
                disabled={currentStep >= traversalResult.length - 1}
                className="bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md transition-all"
              >
                {currentStep >= traversalResult.length - 1 ? "Complete" : "Next Step"}
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-400">
              Full sequence: [{traversalResult.join(', ')}]
            </div>
          </motion.div>
        )}

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            className="bg-gray-800 p-5 rounded-xl border border-purple-700/40"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
              <ListOrdered size={18} /> Tree Stats
            </h4>
            <div className="space-y-2 text-left">
              <p className="text-white">Height: <span className="text-purple-300">{getTreeHeight(root)}</span></p>
              <p className="text-white">Total Nodes: <span className="text-purple-300">{countNodes(root)}</span></p>
              <p className="text-white">Is Empty: <span className="text-purple-300">{root === null ? "Yes" : "No"}</span></p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-5 rounded-xl border border-purple-700/40"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
              <Info size={18} /> Recent Actions
            </h4>
            <div className="max-h-32 overflow-y-auto">
              <ul className="space-y-1 text-left text-sm">
                {steps.slice(-5).map((step, index) => (
                  <li key={index} className="text-gray-300 border-l-2 border-purple-500 pl-3">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BinaryTreePage;