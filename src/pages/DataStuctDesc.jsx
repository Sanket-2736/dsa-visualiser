import React from 'react';
import DescriptionCard from '../tools/DescriptionCard';

function DataStructDesc() {
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-8 lg:px-32">
      <h1 className="text-4xl font-extrabold text-center text-white mb-12 underline underline-offset-4">
        Data Structures Overview
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

          </div>
        ))}
      </div>
    </div>
  );
}

export default DataStructDesc;
