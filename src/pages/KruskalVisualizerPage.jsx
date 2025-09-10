import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, SkipForward, SkipBack, Info, Zap } from "lucide-react";

const KruskalVisualizerPage = () => {
  const [edges, setEdges] = useState([]);
  const [mst, setMst] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentEdge, setCurrentEdge] = useState(null);
  const [rejectedEdges, setRejectedEdges] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [components, setComponents] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  // Node positions for better visualization (arranged in a circle)
  const nodePositions = {
    0: { x: 200, y: 100 },
    1: { x: 350, y: 150 },
    2: { x: 400, y: 300 },
    3: { x: 250, y: 400 },
    4: { x: 100, y: 350 },
    5: { x: 50, y: 200 }
  };

  const generateRandomGraph = (n) => {
    const newEdges = [];
    const nodeList = Array.from({ length: n }, (_, i) => i);
    
    // Generate edges with random weights
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (Math.random() > 0.3) { // 70% chance to include edge
          const weight = Math.floor(Math.random() * 15) + 1;
          newEdges.push({ 
            id: `${i}-${j}`,
            node1: i, 
            node2: j, 
            weight,
            status: 'pending' // pending, accepted, rejected
          });
        }
      }
    }
    
    return { edges: newEdges, nodes: nodeList };
  };

  const findSet = (parent, i) => {
    if (parent[i] === i) return i;
    parent[i] = findSet(parent, parent[i]);
    return parent[i];
  };

  const union = (parent, rank, x, y) => {
    const xroot = findSet(parent, x);
    const yroot = findSet(parent, y);
    if (rank[xroot] < rank[yroot]) {
      parent[xroot] = yroot;
    } else if (rank[xroot] > rank[yroot]) {
      parent[yroot] = xroot;
    } else {
      parent[yroot] = xroot;
      rank[xroot]++;
    }
  };

  const getComponents = (parent, n) => {
    const componentMap = {};
    for (let i = 0; i < n; i++) {
      const root = findSet(parent, i);
      if (!componentMap[root]) componentMap[root] = [];
      componentMap[root].push(i);
    }
    return Object.values(componentMap);
  };

  const kruskalSteps = (edges, n) => {
    const parent = Array(n).fill(0).map((_, i) => i);
    const rank = Array(n).fill(0);
    const mstEdges = [];
    const rejected = [];
    const allSteps = [];

    // Sort edges by weight
    const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);

    allSteps.push({
      type: 'start',
      description: 'Starting Kruskal\'s Algorithm. Edges sorted by weight.',
      mst: [],
      rejected: [],
      currentEdge: null,
      components: getComponents(parent, n),
      totalCost: 0
    });

    for (let i = 0; i < sortedEdges.length; i++) {
      const edge = sortedEdges[i];
      const x = findSet([...parent], edge.node1);
      const y = findSet([...parent], edge.node2);

      allSteps.push({
        type: 'considering',
        description: `Considering edge ${edge.node1}-${edge.node2} with weight ${edge.weight}`,
        mst: [...mstEdges],
        rejected: [...rejected],
        currentEdge: edge,
        components: getComponents([...parent], n),
        totalCost: mstEdges.reduce((sum, e) => sum + e.weight, 0)
      });

      if (x !== y) {
        // Accept edge
        mstEdges.push(edge);
        union(parent, rank, x, y);
        allSteps.push({
          type: 'accept',
          description: `Accepted edge ${edge.node1}-${edge.node2}. No cycle formed.`,
          mst: [...mstEdges],
          rejected: [...rejected],
          currentEdge: edge,
          components: getComponents([...parent], n),
          totalCost: mstEdges.reduce((sum, e) => sum + e.weight, 0)
        });
      } else {
        // Reject edge
        rejected.push(edge);
        allSteps.push({
          type: 'reject',
          description: `Rejected edge ${edge.node1}-${edge.node2}. Would create a cycle.`,
          mst: [...mstEdges],
          rejected: [...rejected],
          currentEdge: edge,
          components: getComponents([...parent], n),
          totalCost: mstEdges.reduce((sum, e) => sum + e.weight, 0)
        });
      }

      if (mstEdges.length === n - 1) {
        allSteps.push({
          type: 'complete',
          description: `MST complete! Total cost: ${mstEdges.reduce((sum, e) => sum + e.weight, 0)}`,
          mst: [...mstEdges],
          rejected: [...rejected],
          currentEdge: null,
          components: [Array.from({ length: n }, (_, i) => i)],
          totalCost: mstEdges.reduce((sum, e) => sum + e.weight, 0)
        });
        break;
      }
    }

    return allSteps;
  };

  const reset = () => {
    const n = 6;
    const { edges: newEdges, nodes: newNodes } = generateRandomGraph(n);
    const generatedSteps = kruskalSteps(newEdges, n);
    
    setEdges(newEdges);
    setNodes(newNodes);
    setMst([]);
    setSteps(generatedSteps);
    setCurrentStep(0);
    setCurrentEdge(null);
    setRejectedEdges([]);
    setComponents([]);
    setTotalCost(0);
    setPlaying(false);
  };

  const executeStep = (stepIndex) => {
    if (stepIndex >= steps.length) {
      setPlaying(false);
      return;
    }

    const step = steps[stepIndex];
    setMst(step.mst);
    setRejectedEdges(step.rejected);
    setCurrentEdge(step.currentEdge);
    setComponents(step.components);
    setTotalCost(step.totalCost);
  };

  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      executeStep(newStep);
    } else {
      setPlaying(false);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      executeStep(newStep);
    }
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (!playing || currentStep >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      stepForward();
    }, 1500);
    return () => clearTimeout(timer);
  }, [playing, currentStep, steps.length]);

  const getEdgeStatus = (edge) => {
    if (currentEdge && edge.id === currentEdge.id) return 'current';
    if (mst.some(e => e.id === edge.id)) return 'accepted';
    if (rejectedEdges.some(e => e.id === edge.id)) return 'rejected';
    return 'pending';
  };

  const getNodeComponent = (nodeId) => {
    return components.findIndex(comp => comp.includes(nodeId));
  };

  const componentColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500', 'bg-cyan-500'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Kruskal's Algorithm
          </h1>
          <p className="text-xl text-indigo-300 max-w-3xl mx-auto">
            Watch how Kruskal's algorithm builds the Minimum Spanning Tree by selecting the lightest edges that don't create cycles
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={stepBackward}
            disabled={currentStep === 0}
            className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
          >
            <SkipBack size={18} /> Previous
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            disabled={currentStep >= steps.length - 1}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg"
          >
            {playing ? <Pause size={20} /> : <Play size={20} />}
            {playing ? "Pause" : "Play"}
          </button>
          <button
            onClick={stepForward}
            disabled={currentStep >= steps.length - 1}
            className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
          >
            Next <SkipForward size={18} />
          </button>
          <button
            onClick={reset}
            className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
          >
            <RotateCcw size={18} /> New Graph
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Graph Visualization */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-8 rounded-2xl backdrop-blur-md border border-slate-600/30"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-indigo-300">Graph Visualization</h3>
              
              <div className="relative w-full h-96 mx-auto">
                <svg viewBox="0 0 450 450" className="w-full h-full">
                  {/* Edges */}
                  {edges.map((edge) => {
                    const pos1 = nodePositions[edge.node1];
                    const pos2 = nodePositions[edge.node2];
                    const status = getEdgeStatus(edge);
                    
                    let strokeColor = '#64748b'; // Default gray
                    let strokeWidth = 2;
                    
                    if (status === 'current') {
                      strokeColor = '#fbbf24'; // Yellow
                      strokeWidth = 4;
                    } else if (status === 'accepted') {
                      strokeColor = '#10b981'; // Green
                      strokeWidth = 4;
                    } else if (status === 'rejected') {
                      strokeColor = '#ef4444'; // Red
                      strokeWidth = 3;
                    }
                    
                    const midX = (pos1.x + pos2.x) / 2;
                    const midY = (pos1.y + pos2.y) / 2;
                    
                    return (
                      <g key={edge.id}>
                        <motion.line
                          x1={pos1.x}
                          y1={pos1.y}
                          x2={pos2.x}
                          y2={pos2.y}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          initial={{ pathLength: 0 }}
                          animate={{ 
                            pathLength: 1,
                            stroke: strokeColor,
                            strokeWidth: strokeWidth
                          }}
                          transition={{ duration: 0.5 }}
                          className={status === 'rejected' ? 'stroke-dasharray-[5,5]' : ''}
                        />
                        {/* Weight label */}
                        <circle
                          cx={midX}
                          cy={midY}
                          r="15"
                          fill={status === 'current' ? '#fbbf24' : status === 'accepted' ? '#10b981' : '#1e293b'}
                          stroke={strokeColor}
                          strokeWidth="2"
                        />
                        <text
                          x={midX}
                          y={midY + 4}
                          textAnchor="middle"
                          className="text-sm font-bold fill-white"
                        >
                          {edge.weight}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Nodes */}
                  {nodes.map((node) => {
                    const pos = nodePositions[node];
                    const componentIndex = getNodeComponent(node);
                    const colorClass = componentIndex >= 0 ? componentColors[componentIndex % componentColors.length] : 'bg-gray-500';
                    
                    return (
                      <motion.g key={node}>
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="25"
                          className={`${colorClass.replace('bg-', 'fill-')} stroke-white stroke-2`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: node * 0.1, type: "spring", stiffness: 200 }}
                        />
                        <text
                          x={pos.x}
                          y={pos.y + 5}
                          textAnchor="middle"
                          className="text-lg font-bold fill-white"
                        >
                          {node}
                        </text>
                      </motion.g>
                    );
                  })}
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            {/* Current Step Info */}
            <motion.div
              className="bg-gradient-to-br from-indigo-800/60 to-indigo-900/60 p-6 rounded-xl backdrop-blur-md border border-indigo-600/30"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h4 className="text-lg font-semibold text-indigo-300 mb-4 flex items-center gap-2">
                <Info size={18} /> Current Step
              </h4>
              <div className="space-y-3">
                <div className="text-sm text-gray-300">
                  Step {currentStep + 1} of {steps.length}
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <p className="text-white text-sm">
                    {steps[currentStep]?.description || 'Ready to start...'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Statistics */}
            <motion.div
              className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-6 rounded-xl backdrop-blur-md border border-slate-600/30"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h4 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                <Zap size={18} /> Statistics
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Edges:</span>
                  <span className="text-white font-bold">{edges.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">MST Edges:</span>
                  <span className="text-green-400 font-bold">{mst.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Rejected:</span>
                  <span className="text-red-400 font-bold">{rejectedEdges.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Components:</span>
                  <span className="text-blue-400 font-bold">{components.length}</span>
                </div>
                <div className="pt-3 border-t border-slate-600">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Cost:</span>
                    <span className="text-yellow-400 font-bold text-xl">{totalCost}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Legend */}
            <motion.div
              className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-6 rounded-xl backdrop-blur-md border border-slate-600/30"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
            >
              <h4 className="text-lg font-semibold text-gray-300 mb-4">Legend</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-1 bg-gray-500 rounded"></div>
                  <span className="text-gray-300">Pending Edge</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-1 bg-yellow-400 rounded"></div>
                  <span className="text-gray-300">Current Edge</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-1 bg-green-500 rounded"></div>
                  <span className="text-gray-300">MST Edge</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-1 bg-red-500 rounded border-dashed border"></div>
                  <span className="text-gray-300">Rejected Edge</span>
                </div>
                <div className="pt-2 border-t border-slate-600">
                  <p className="text-xs text-gray-400">
                    Node colors represent connected components
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KruskalVisualizerPage;