import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, SkipForward, SkipBack, Info, Zap, Target } from "lucide-react";

const PrimVisualizerPage = () => {
  const [graph, setGraph] = useState([]);
  const [edges, setEdges] = useState([]);
  const [mst, setMst] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visited, setVisited] = useState(new Set());
  const [currentEdge, setCurrentEdge] = useState(null);
  const [candidateEdges, setCandidateEdges] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [nodes] = useState(6);

  // Node positions for better visualization
  const nodePositions = {
    0: { x: 225, y: 80 },
    1: { x: 380, y: 160 },
    2: { x: 380, y: 310 },
    3: { x: 225, y: 390 },
    4: { x: 70, y: 310 },
    5: { x: 70, y: 160 }
  };

  const generateRandomGraph = (n) => {
    const adjacencyMatrix = Array.from({ length: n }, () => Array(n).fill(Infinity));
    const edgeList = [];
    
    // Initialize diagonal to 0
    for (let i = 0; i < n; i++) {
      adjacencyMatrix[i][i] = 0;
    }
    
    // Generate random edges (ensure connectivity)
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (Math.random() > 0.25) { // 75% chance for edge
          const weight = Math.floor(Math.random() * 15) + 1;
          adjacencyMatrix[i][j] = weight;
          adjacencyMatrix[j][i] = weight;
          edgeList.push({
            id: `${i}-${j}`,
            node1: i,
            node2: j,
            weight,
            status: 'unvisited'
          });
        }
      }
    }

    // Ensure graph is connected by adding edges to isolated nodes
    for (let i = 0; i < n; i++) {
      let hasEdge = false;
      for (let j = 0; j < n; j++) {
        if (i !== j && adjacencyMatrix[i][j] !== Infinity) {
          hasEdge = true;
          break;
        }
      }
      if (!hasEdge) {
        const target = Math.floor(Math.random() * n);
        if (target !== i) {
          const weight = Math.floor(Math.random() * 10) + 1;
          adjacencyMatrix[i][target] = weight;
          adjacencyMatrix[target][i] = weight;
          edgeList.push({
            id: `${Math.min(i, target)}-${Math.max(i, target)}`,
            node1: Math.min(i, target),
            node2: Math.max(i, target),
            weight,
            status: 'unvisited'
          });
        }
      }
    }

    return { matrix: adjacencyMatrix, edges: edgeList };
  };

  const primSteps = (graph, edges, startNode = 0) => {
    const n = graph.length;
    const visited = new Set();
    const mstEdges = [];
    const allSteps = [];
    
    // Priority queue of candidate edges (node1, node2, weight)
    let candidateEdges = [];
    
    // Start with the first node
    visited.add(startNode);
    
    allSteps.push({
      type: 'start',
      description: `Starting Prim's algorithm from node ${startNode}`,
      visited: new Set([startNode]),
      mst: [],
      candidateEdges: [],
      currentEdge: null,
      totalCost: 0
    });

    // Add all edges from start node to candidate list
    for (let i = 0; i < n; i++) {
      if (i !== startNode && graph[startNode][i] !== Infinity) {
        candidateEdges.push({
          node1: startNode,
          node2: i,
          weight: graph[startNode][i],
          id: `${Math.min(startNode, i)}-${Math.max(startNode, i)}`
        });
      }
    }
    
    candidateEdges.sort((a, b) => a.weight - b.weight);

    allSteps.push({
      type: 'candidates',
      description: `Added candidate edges from node ${startNode}. Selecting minimum weight edge.`,
      visited: new Set([startNode]),
      mst: [...mstEdges],
      candidateEdges: [...candidateEdges],
      currentEdge: null,
      totalCost: 0
    });

    while (mstEdges.length < n - 1 && candidateEdges.length > 0) {
      // Find minimum weight edge that connects visited to unvisited node
      let minEdgeIndex = -1;
      let minEdge = null;
      
      for (let i = 0; i < candidateEdges.length; i++) {
        const edge = candidateEdges[i];
        const node1Visited = visited.has(edge.node1);
        const node2Visited = visited.has(edge.node2);
        
        // Edge connects visited to unvisited
        if (node1Visited !== node2Visited) {
          minEdgeIndex = i;
          minEdge = edge;
          break;
        }
      }
      
      if (minEdge) {
        // Highlight the selected edge
        allSteps.push({
          type: 'considering',
          description: `Considering edge ${minEdge.node1}-${minEdge.node2} with weight ${minEdge.weight}`,
          visited: new Set(visited),
          mst: [...mstEdges],
          candidateEdges: [...candidateEdges],
          currentEdge: minEdge,
          totalCost: mstEdges.reduce((sum, e) => sum + e.weight, 0)
        });

        // Add edge to MST
        mstEdges.push(minEdge);
        const newNode = visited.has(minEdge.node1) ? minEdge.node2 : minEdge.node1;
        visited.add(newNode);
        
        // Remove the selected edge from candidates
        candidateEdges.splice(minEdgeIndex, 1);
        
        allSteps.push({
          type: 'accept',
          description: `Added edge ${minEdge.node1}-${minEdge.node2} to MST. Node ${newNode} joined the tree.`,
          visited: new Set(visited),
          mst: [...mstEdges],
          candidateEdges: [...candidateEdges],
          currentEdge: minEdge,
          totalCost: mstEdges.reduce((sum, e) => sum + e.weight, 0)
        });

        // Add new candidate edges from the newly added node
        for (let i = 0; i < n; i++) {
          if (!visited.has(i) && graph[newNode][i] !== Infinity) {
            candidateEdges.push({
              node1: newNode,
              node2: i,
              weight: graph[newNode][i],
              id: `${Math.min(newNode, i)}-${Math.max(newNode, i)}`
            });
          }
        }
        
        // Remove edges that now connect two visited nodes
        candidateEdges = candidateEdges.filter(edge => {
          const node1Visited = visited.has(edge.node1);
          const node2Visited = visited.has(edge.node2);
          return node1Visited !== node2Visited; // Keep only edges connecting visited to unvisited
        });
        
        candidateEdges.sort((a, b) => a.weight - b.weight);

        if (mstEdges.length < n - 1) {
          allSteps.push({
            type: 'update',
            description: `Updated candidate edges. Next minimum: ${candidateEdges[0]?.weight || 'none'}`,
            visited: new Set(visited),
            mst: [...mstEdges],
            candidateEdges: [...candidateEdges],
            currentEdge: null,
            totalCost: mstEdges.reduce((sum, e) => sum + e.weight, 0)
          });
        }
      } else {
        break;
      }
    }

    allSteps.push({
      type: 'complete',
      description: `MST complete! Total minimum cost: ${mstEdges.reduce((sum, e) => sum + e.weight, 0)}`,
      visited: new Set(visited),
      mst: [...mstEdges],
      candidateEdges: [],
      currentEdge: null,
      totalCost: mstEdges.reduce((sum, e) => sum + e.weight, 0)
    });

    return allSteps;
  };

  const reset = () => {
    const { matrix, edges: newEdges } = generateRandomGraph(nodes);
    const generatedSteps = primSteps(matrix, newEdges);
    
    setGraph(matrix);
    setEdges(newEdges);
    setMst([]);
    setSteps(generatedSteps);
    setCurrentStep(0);
    setVisited(new Set());
    setCurrentEdge(null);
    setCandidateEdges([]);
    setTotalCost(0);
    setPlaying(false);
  };

  const executeStep = (stepIndex) => {
    if (stepIndex >= steps.length) {
      setPlaying(false);
      return;
    }

    const step = steps[stepIndex];
    setVisited(step.visited);
    setMst(step.mst);
    setCandidateEdges(step.candidateEdges);
    setCurrentEdge(step.currentEdge);
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
    }, 2000);
    return () => clearTimeout(timer);
  }, [playing, currentStep, steps.length]);

  const getEdgeStatus = (edge) => {
    if (currentEdge && edge.id === currentEdge.id) return 'current';
    if (mst.some(e => e.id === edge.id)) return 'mst';
    if (candidateEdges.some(e => e.id === edge.id)) return 'candidate';
    return 'unvisited';
  };

  const getNodeStatus = (nodeId) => {
    if (visited.has(nodeId)) return 'visited';
    return 'unvisited';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Prim's Algorithm
          </h1>
          <p className="text-xl text-green-300 max-w-3xl mx-auto">
            Watch how Prim's algorithm grows the Minimum Spanning Tree by always selecting the lightest edge connecting the tree to unvisited nodes
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
            className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg"
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
              <h3 className="text-2xl font-bold mb-6 text-center text-green-300">Graph Visualization</h3>
              
              <div className="relative w-full h-96 mx-auto">
                <svg viewBox="0 0 450 470" className="w-full h-full">
                  {/* Edges */}
                  {edges.map((edge) => {
                    const pos1 = nodePositions[edge.node1];
                    const pos2 = nodePositions[edge.node2];
                    const status = getEdgeStatus(edge);
                    
                    let strokeColor = '#64748b'; // Default gray
                    let strokeWidth = 2;
                    
                    if (status === 'current') {
                      strokeColor = '#fbbf24'; // Yellow
                      strokeWidth = 5;
                    } else if (status === 'mst') {
                      strokeColor = '#10b981'; // Green
                      strokeWidth = 4;
                    } else if (status === 'candidate') {
                      strokeColor = '#3b82f6'; // Blue
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
                          className={status === 'candidate' ? 'stroke-dasharray-[8,4]' : ''}
                        />
                        {/* Weight label */}
                        <motion.circle
                          cx={midX}
                          cy={midY}
                          r="18"
                          fill={status === 'current' ? '#fbbf24' : status === 'mst' ? '#10b981' : status === 'candidate' ? '#3b82f6' : '#1e293b'}
                          stroke={strokeColor}
                          strokeWidth="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
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
                  {Array.from({ length: nodes }, (_, i) => i).map((node) => {
                    const pos = nodePositions[node];
                    const status = getNodeStatus(node);
                    const isStartNode = node === 0 && visited.size === 1;
                    
                    return (
                      <motion.g key={node}>
                        <motion.circle
                          cx={pos.x}
                          cy={pos.y}
                          r="28"
                          fill={status === 'visited' ? (isStartNode ? '#f59e0b' : '#10b981') : '#64748b'}
                          stroke={status === 'visited' ? '#ffffff' : '#64748b'}
                          strokeWidth="3"
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: 1,
                            fill: status === 'visited' ? (isStartNode ? '#f59e0b' : '#10b981') : '#64748b'
                          }}
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
                        {isStartNode && (
                          <motion.circle
                            cx={pos.x}
                            cy={pos.y}
                            r="35"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="2"
                            strokeDasharray="4,4"
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{ scale: 1, rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                        )}
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
              className="bg-gradient-to-br from-green-800/60 to-green-900/60 p-6 rounded-xl backdrop-blur-md border border-green-600/30"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h4 className="text-lg font-semibold text-green-300 mb-4 flex items-center gap-2">
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

            {/* Candidate Edges */}
            <motion.div
              className="bg-gradient-to-br from-blue-800/60 to-blue-900/60 p-6 rounded-xl backdrop-blur-md border border-blue-600/30"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h4 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
                <Target size={18} /> Candidate Edges
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {candidateEdges.length === 0 ? (
                  <p className="text-gray-400 text-sm">No candidate edges</p>
                ) : (
                  candidateEdges.slice(0, 5).map((edge, index) => (
                    <motion.div
                      key={`${edge.node1}-${edge.node2}`}
                      className={`text-sm px-3 py-2 rounded ${index === 0 ? 'bg-yellow-500/20 border border-yellow-500/50' : 'bg-blue-500/20'}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {edge.node1} → {edge.node2} (weight: {edge.weight})
                      {index === 0 && <span className="text-yellow-400 ml-2">← Next</span>}
                    </motion.div>
                  ))
                )}
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
                  <span className="text-gray-300">Visited Nodes:</span>
                  <span className="text-green-400 font-bold">{visited.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">MST Edges:</span>
                  <span className="text-green-400 font-bold">{mst.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Candidates:</span>
                  <span className="text-blue-400 font-bold">{candidateEdges.length}</span>
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
                  <div className="w-6 h-6 bg-amber-500 rounded-full border-2 border-white"></div>
                  <span className="text-gray-300">Start Node</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  <span className="text-gray-300">Visited Node</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
                  <span className="text-gray-300">Unvisited Node</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-1 bg-green-500 rounded"></div>
                  <span className="text-gray-300">MST Edge</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-1 bg-blue-500 rounded border-dashed border"></div>
                  <span className="text-gray-300">Candidate Edge</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-1 bg-yellow-400 rounded"></div>
                  <span className="text-gray-300">Current Selection</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimVisualizerPage;