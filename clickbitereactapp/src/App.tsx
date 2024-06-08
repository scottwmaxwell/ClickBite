import React from 'react'
import "./App.css"

// Components
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Discover from './pages/Discover'
import ViewBite from './pages/ViewBite'

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Edit from './pages/Edit'

function App() {
  return (
    <div>

      <BrowserRouter>
        <Navbar />
        <Routes>
                <Route path='/' element={ <Home />}/>
                <Route path='/discover' element={<Discover />} />
                <Route path='/bite/:id' element={<ViewBite />} />
                <Route path='/edit/:id' element={<Edit />}/>
                <Route path='/create' element={<Edit />}/>
        </Routes>      
      </BrowserRouter>

    </div>
  );
}

export default App
