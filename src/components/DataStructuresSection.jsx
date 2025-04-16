import { motion } from 'framer-motion';
import { Link, ArrowRight, List, Layers, ListOrdered, Hash } from 'lucide-react';

const DataStructuresSection = () => {
  const structures = [
    {
      icon: <List className="w-5 h-5" />,
      title: "Linked List",
      description: "Learn how nodes connect sequentially, with each node pointing to the next",
      difficulty: "Easy",
      operations: ["Insert", "Delete", "Traverse", "Search"],
      path: "/linked-list",
      color: "text-cyan-400",
      bg: "bg-cyan-800/20"
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Stack",
      description: "Explore a LIFO (Last In, First Out) collection with push and pop operations",
      difficulty: "Easy",
      operations: ["Push", "Pop", "Peek", "isEmpty"],
      path: "/stack",
      color: "text-purple-400",
      bg: "bg-purple-800/20"
    },
    {
      icon: <ListOrdered className="w-5 h-5" />,
      title: "Queue",
      description: "Understand a FIFO (First In, First Out) collection for sequential processing",
      difficulty: "Easy",
      operations: ["Enqueue", "Dequeue", "Front", "isEmpty"],
      path: "/queue",
      color: "text-amber-400",
      bg: "bg-amber-800/20"
    },
    {
      icon: <Hash className="w-5 h-5" />,
      title: "HashMap",
      description: "Master key-value pairs for fast lookups and efficient data storage",
      difficulty: "Medium",
      operations: ["Put", "Get", "Remove", "ContainsKey"],
      path: "/hash-map",
      color: "text-emerald-400",
      bg: "bg-emerald-800/20"
    },
    // ALGORITHMS SECTION
    {
      icon: <ArrowRight className="w-5 h-5" />,
      title: "Binary Search",
      description: "Efficiently search for elements in sorted arrays using divide and conquer",
      difficulty: "Easy",
      operations: ["Search", "Mid", "Compare"],
      path: "/binary-search",
      color: "text-blue-400",
      bg: "bg-blue-800/20"
    },
    {
      icon: <ArrowRight className="w-5 h-5 rotate-90" />,
      title: "Bubble Sort",
      description: "Sort an array by repeatedly swapping adjacent elements",
      difficulty: "Easy",
      operations: ["Swap", "Compare", "Sort"],
      path: "/bubble-sort",
      color: "text-pink-400",
      bg: "bg-pink-800/20"
    },
    {
      icon: <ArrowRight className="w-5 h-5 rotate-45" />,
      title: "N Queens",
      description: "Place queens on a chessboard such that none can attack another",
      difficulty: "Hard",
      operations: ["Place", "Backtrack", "Check Safety"],
      path: "/n-queens",
      color: "text-red-400",
      bg: "bg-red-800/20"
    },
    {
      icon: <ArrowRight className="w-5 h-5 -rotate-45" />,
      title: "Tower of Hanoi",
      description: "Move disks between pegs following specific rules using recursion",
      difficulty: "Medium",
      operations: ["Move Disk", "Recursion", "Base Case"],
      path: "/tower-of-hanoi",
      color: "text-yellow-400",
      bg: "bg-yellow-800/20"
    }
  ];
  

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Data Structures
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore fundamental data structures with interactive visualizations and challenges
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {structures.map((structure, index) => (
            <motion.div
              key={structure.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className={`h-full p-[1px] rounded-xl ${structure.bg} overflow-hidden border border-gray-700`}>
                <div className="h-full bg-gray-900 rounded-xl backdrop-blur-sm p-5 flex flex-col transition-all duration-300 group-hover:bg-gray-800">
                  <div className={`mb-4 p-2.5 rounded-lg ${structure.bg} w-fit ${structure.color}`}>
                    {structure.icon}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">{structure.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      structure.difficulty === "Easy" 
                        ? "bg-green-800/40 text-green-300" 
                        : "bg-yellow-800/40 text-yellow-300"
                    }`}>
                      {structure.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-4">{structure.description}</p>
                  
                  <div className="mb-5">
                    <div className="text-xs text-gray-500 mb-2">OPERATIONS</div>
                    <div className="flex flex-wrap gap-1.5">
                      {structure.operations.map(op => (
                        <span key={op} className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-300">
                          {op}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-3 border-t border-gray-700">
                    <Link
                      to={structure.path}
                      className="inline-flex hover:cursor-pointer items-center gap-1 text-sm font-medium text-cyan-300 group-hover:text-cyan-200 transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataStructuresSection;
