import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Info, 
  LayoutList, 
  ListTree, 
  TowerControl, 
  Crown, 
  Menu,
  X
} from 'lucide-react';

const Navbar = () => {
  const { pathname } = useLocation();
  const { dataStructure, setDataStructure } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dsDropdownOpen, setDsDropdownOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'About', path: '/about', icon: <Info className="w-5 h-5" /> },
    {
      name: 'Data Structures',
      path: '/data-structures',
      icon: <ListTree className="w-5 h-5" />,
      children: [
        { name: 'Queue', path: '/queue' },
        { name: 'Stack', path: '/stack' },
        { name: 'Linked List', path: '/linked-list' },
        { name: 'Hash Map', path: '/hashmap' }
      ]
    },
    {
      name: 'Algorithms',
      path: '/algorithms',
      icon: <TowerControl className="w-5 h-5" />,
      children: [
        { name: 'Tower of Hanoi', path: '/tower-of-hanoi' },
        { name: 'N-Queens', path: '/n-queens' },
        { name: 'Bubble Sort', path: '/bubble-sort' },
        { name: 'Binary Search', path: '/binary-search' }
      ]
    }
  ];
  

  const isActive = (path) => pathname === path;

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    },
    exit: { opacity: 0, x: '100%' }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
          DSA Visualizer
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-2 items-center">
          {navItems.map((item) => (
            <li key={item.path} className="relative group">
              {item.children ? (
                <>
                  <button 
                    onClick={() => setDsDropdownOpen(!dsDropdownOpen)}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2
                      ${isActive(item.path) ? 'bg-blue-600 text-white' : 'hover:bg-blue-800/50'}
                    `}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                    <motion.span
                      animate={{ rotate: dsDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs"
                    >
                      ▼
                    </motion.span>
                  </button>
                  
                  <AnimatePresence>
                    {dsDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 mt-2 w-48 bg-blue-900 rounded-lg shadow-xl z-50 border border-blue-700"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`flex items-center gap-2 px-4 py-2 hover:bg-blue-700 transition-colors rounded-lg m-1
                              ${isActive(child.path) ? 'bg-blue-600 font-medium' : ''}
                            `}
                            onClick={() => {
                              setDataStructure(child.name);
                              setDsDropdownOpen(false);
                            }}
                          >
                            <LayoutList className="w-4 h-4" />
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2
                    ${isActive(item.path) ? 'bg-blue-600 text-white font-medium' : 'hover:bg-blue-800/50'}
                  `}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-blue-800/50 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden fixed inset-0 bg-blue-900/95 backdrop-blur-sm pt-20 px-6 z-40"
          >
            <motion.ul className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.path}
                  variants={mobileItemVariants}
                  custom={index}
                >
                  {item.children ? (
                    <>
                      <button 
                        onClick={() => setDsDropdownOpen(!dsDropdownOpen)}
                        className={`w-full px-4 py-3 rounded-lg flex items-center gap-4 text-lg
                          ${isActive(item.path) ? 'bg-blue-600 text-white' : 'hover:bg-blue-800/50'}
                        `}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                        <motion.span
                          animate={{ rotate: dsDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-auto"
                        >
                          ▼
                        </motion.span>
                      </button>
                      
                      <AnimatePresence>
                        {dsDropdownOpen && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-12 overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={`block px-4 py-3 rounded-lg flex items-center gap-4
                                  ${isActive(child.path) ? 'bg-blue-600 font-medium' : 'hover:bg-blue-800/50'}
                                `}
                                onClick={() => {
                                  setDataStructure(child.name);
                                  setDsDropdownOpen(false);
                                  setMobileMenuOpen(false);
                                }}
                              >
                                <LayoutList className="w-5 h-5" />
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-4 py-3 rounded-lg flex items-center gap-4 text-lg
                        ${isActive(item.path) ? 'bg-blue-600 text-white font-medium' : 'hover:bg-blue-800/50'}
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;