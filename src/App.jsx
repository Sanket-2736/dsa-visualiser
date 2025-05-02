import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import DataStuctDesc from './pages/DataStuctDesc'
import QueuePage from './pages/QueuePage'
import StackPage from './pages/StackPage'
import LinkedListPage from './pages/LinkedListPage'
import HashMapPage from './pages/HashMapPage'
import TowerOfHanoiPage from './pages/TowerOfHanoiPage'
import NQueensPage from './pages/NQueensPage'
import AppContextProvider from './context/AppContext'
import BubbleSortPage from './pages/BubbleSortPage'
import BinarySearchPage from './pages/BinarySearchPage'
import InsertionSortPage from './pages/InsertionSort'
import MergeSortPage from './pages/MergeSort'

function App() {
  return (
    <AppContextProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/data-structures" element={<DataStuctDesc/>}/>
        <Route path="/queue" element={<QueuePage/>}/>
        <Route path="/stack" element={<StackPage/>}/>
        <Route path="/linked-list" element={<LinkedListPage/>}/>
        <Route path="/hashmap" element={<HashMapPage/>}/>
        <Route path="/bubble-sort" element={<BubbleSortPage/>}/>
        <Route path="/insertion-sort" element={<InsertionSortPage/>}/>
        <Route path="/merge-sort" element={<MergeSortPage/>}/>
        <Route path="/binary-search" element={<BinarySearchPage/>}/>
        <Route path="/tower-of-hanoi" element={<TowerOfHanoiPage/>}/>
        <Route path="/n-queens" element={<NQueensPage/>}/>
      </Routes>
      <Footer/>
    </AppContextProvider>
  )
}

export default App
