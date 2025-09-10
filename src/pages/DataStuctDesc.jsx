import React, { useState } from 'react';
import DescriptionCard from '../tools/DescriptionCard';

function DataStructDesc() {
  const [selectedTab, setSelectedTab] = useState('data-structures'); // State to control the active tab

  const dataStructures = [
    {
      title: 'Queue',
      description:
        'A Queue is a linear data structure that follows the First In First Out (FIFO) principle. It is used in scheduling and resource management scenarios.',
      adt: `ADT Queue {
  Queue create();
  void enqueue(Queue q, Element e);
  Element dequeue(Queue q);
  bool isEmpty(Queue q);
  Element peek(Queue q);
}`,
      link: '/queue',
    },
    {
      title: 'Stack',
      description:
        'A Stack is a linear data structure that follows the Last In First Out (LIFO) principle. It is commonly used in recursion and expression evaluation.',
      adt: `ADT Stack {
  Stack create();
  void push(Stack s, Element e);
  Element pop(Stack s);
  bool isEmpty(Stack s);
  Element peek(Stack s);
}`,
      link: '/stack',
    },
    {
      title: 'Linked List',
      description:
        'A Linked List is a linear data structure in which elements are stored in nodes, and each node points to the next. It allows efficient insertions and deletions.',
      adt: `ADT LinkedList {
  LinkedList create();
  void insert(LinkedList l, Element e, int position);
  void delete(LinkedList l, int position);
  Element get(LinkedList l, int position);
  bool isEmpty(LinkedList l);
}`,
      link: '/linked-list',
    },
    {
      title: 'Hash Map',
      description:
        'A Hash Map is a key-value data structure that allows for fast data retrieval. It uses a hash function to compute an index into an array of buckets.',
      adt: `ADT HashMap {
  HashMap create();
  void put(HashMap h, Key k, Value v);
  Value get(HashMap h, Key k);
  void remove(HashMap h, Key k);
  bool containsKey(HashMap h, Key k);
}`,
      link: '/hash-map',
    },
    {
      title: 'Binary Tree',
      description:
        'A Binary Tree is a hierarchical data structure in which each node has at most two children. It is used in searching, sorting, and hierarchical data representation.',
      adt: `ADT BinaryTree {
  BinaryTree create();
  void insert(BinaryTree t, Element e);
  Element search(BinaryTree t, Element e);
  void delete(BinaryTree t, Element e);
  bool isEmpty(BinaryTree t);
}`,
      link: '/binary-tree',
    },
    {
      title: 'AVL Tree',
      description:
        'An AVL Tree is a self-balancing binary search tree where the difference in heights between left and right subtrees is at most one.',
      adt: `ADT AVLTree {
  AVLTree create();
  void insert(AVLTree t, Element e);
  void delete(AVLTree t, Element e);
  Element search(AVLTree t, Element e);
  bool isBalanced(AVLTree t);
}`,
      link: '/avl-tree',
    },
    {
      title: 'Graph',
      description:
        'A Graph is a collection of nodes (vertices) and edges (connections between nodes). It is used in network representation, social networks, etc.',
      adt: `ADT Graph {
  Graph create();
  void addVertex(Graph g, Vertex v);
  void addEdge(Graph g, Vertex v1, Vertex v2);
  bool hasEdge(Graph g, Vertex v1, Vertex v2);
}`,
      link: '/graph',
    },
  ];

  const algorithms = [
    {
      title: 'DFS (Depth-First Search)',
      description:
        'DFS is an algorithm for traversing or searching tree or graph data structures. It starts at the root and explores as far as possible along each branch before backtracking.',
      adt: `Algorithm DFS(graph, node) {
  visited = set()
  function visit(node) {
    if node not in visited {
      visited.add(node)
      for neighbor in graph[node] {
        visit(neighbor)
      }
    }
  }
  visit(node)
}`,
      link: '/dfs',
    },
    {
      title: 'BFS (Breadth-First Search)',
      description:
        'BFS is an algorithm for traversing or searching tree or graph data structures. It starts at the root and explores the neighbor nodes level by level.',
      adt: `Algorithm BFS(graph, start) {
  queue = [start]
  visited = set()
  while queue is not empty {
    node = queue.pop(0)
    if node not in visited {
      visited.add(node)
      for neighbor in graph[node] {
        queue.append(neighbor)
      }
    }
  }
}`,
      link: '/bfs',
    },
    {
      title: 'Prim\'s Algorithm',
      description:
        'Prim\'s Algorithm is a greedy algorithm that finds the minimum spanning tree for a weighted undirected graph.',
      adt: `Algorithm Prims(graph) {
  start = any node
  mst = set()
  while not all nodes in mst {
    add the smallest edge that connects a node in mst to a node outside mst
  }
}`,
      link: '/prims',
    },
    {
      title: 'Kruskal\'s Algorithm',
      description:
        'Kruskal\'s Algorithm is a greedy algorithm for finding the minimum spanning tree of a graph by sorting all edges and adding edges to the tree.',
      adt: `Algorithm Kruskal(graph) {
  sort edges by weight
  for each edge in sorted edges {
    if the edge connects two disjoint sets {
      add edge to mst
    }
  }
}`,
      link: '/kruskals',
    },
    {
      title: 'Bubble Sort',
      description:
        'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
      adt: `Algorithm BubbleSort {
  for i = 0 to n - 1
    for j = 0 to n - i - 1
      if A[j] > A[j + 1]
        swap A[j] and A[j + 1]
}`,
      link: '/bubble-sort',
    },
    {
      title: 'Binary Search',
      description:
        'Binary Search is an efficient algorithm for finding an item from a sorted list by repeatedly dividing the search interval in half.',
      adt: `Algorithm BinarySearch {
  low = 0, high = n - 1
  while low <= high
    mid = (low + high) / 2
    if A[mid] == target
      return mid
    else if A[mid] < target
      low = mid + 1
    else
      high = mid - 1
  return -1
}`,
      link: '/binary-search',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-8 lg:px-32">
      <h1 className="text-4xl font-extrabold text-center text-white mb-12 underline underline-offset-4">
        Data Structures & Algorithms Overview
      </h1>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-12">
        <button
          className={`px-6 py-2 rounded-t-lg font-semibold ${
            selectedTab === 'data-structures' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => setSelectedTab('data-structures')}
        >
          Data Structures
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg font-semibold ${
            selectedTab === 'algorithms' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => setSelectedTab('algorithms')}
        >
          Algorithms
        </button>
      </div>

      {/* Content based on selected tab */}
      <div className="flex flex-col gap-12">
        {selectedTab === 'data-structures' &&
          dataStructures.map((ds) => (
            <div
              key={ds.title}
              className="bg-gray-800 border border-gray-700 rounded-xl p-8 w-full shadow-md"
            >
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">{ds.title}</h2>
              <p className="text-gray-300 mb-4">{ds.description}</p>
              <div className="mt-4 bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-700/50 shadow-xl">
                <div className="p-4 bg-gray-800/50 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-6 font-mono text-blue-200 whitespace-pre-wrap text-sm">
                  {ds.adt}
                </div>
              </div>
            </div>
          ))}
        {selectedTab === 'algorithms' &&
          algorithms.map((algo) => (
            <div
              key={algo.title}
              className="bg-gray-800 border border-gray-700 rounded-xl p-8 w-full shadow-md"
            >
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">{algo.title}</h2>
              <p className="text-gray-300 mb-4">{algo.description}</p>
              <div className="mt-4 bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-700/50 shadow-xl">
                <div className="p-4 bg-gray-800/50 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-6 font-mono text-blue-200 whitespace-pre-wrap text-sm">
                  {algo.adt}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DataStructDesc;
