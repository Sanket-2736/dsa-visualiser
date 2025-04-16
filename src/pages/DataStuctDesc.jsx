import React from 'react';
import { useNavigate } from 'react-router-dom';

function DataStructDesc() {
  const navigate = useNavigate();

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
      link: '/hashmap',
    },
    {
      title: 'Binary Search',
      description:
        'Binary Search is an efficient algorithm for finding an element in a sorted array by repeatedly dividing the search interval in half.',
      adt: `Algorithm BinarySearch(A, key)
  low ← 0
  high ← length(A) - 1
  while low ≤ high do
    mid ← (low + high) / 2
    if A[mid] = key then
      return mid
    else if A[mid] < key then
      low ← mid + 1
    else
      high ← mid - 1
  return -1`,
      link: '/binary-search',
    },
    {
      title: 'Bubble Sort',
      description:
        'Bubble Sort is a simple comparison-based algorithm where each pair of adjacent elements is compared and swapped if they are in the wrong order.',
      adt: `Algorithm BubbleSort(A)
  for i from 0 to length(A) - 1 do
    for j from 0 to length(A) - i - 2 do
      if A[j] > A[j + 1] then
        swap A[j] and A[j + 1]`,
      link: '/bubble-sort',
    },
    {
      title: 'N Queens',
      description:
        'The N Queens problem is a classic backtracking algorithm to place N queens on an N×N chessboard such that no two queens threaten each other.',
      adt: `Algorithm SolveNQueens(board, row, N)
  if row = N then
    print board
    return
  for col from 0 to N - 1 do
    if isSafe(board, row, col) then
      board[row][col] ← 1
      SolveNQueens(board, row + 1, N)
      board[row][col] ← 0`,
      link: '/n-queens',
    },
    {
      title: 'Tower of Hanoi',
      description:
        'Tower of Hanoi is a recursive problem where the goal is to move N disks from a source rod to a destination rod using an auxiliary rod.',
      adt: `Algorithm Hanoi(n, source, auxiliary, destination)
  if n = 1 then
    move disk from source to destination
    return
  Hanoi(n - 1, source, destination, auxiliary)
  move disk from source to destination
  Hanoi(n - 1, auxiliary, source, destination)`,
      link: '/tower-of-hanoi',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-8 lg:px-32">
      <h1 className="text-4xl font-extrabold text-center text-white mb-12 underline underline-offset-4">
        Data Structures & Algorithms Overview
      </h1>

      <div className="flex flex-col gap-12">
        {dataStructures.map((ds) => (
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

            <div className="mt-6 text-right">
              <button
                onClick={() => {
                  navigate(ds.link)
                  scrollTo(0, 0)
                }}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-200"
              >
                Learn More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataStructDesc;
