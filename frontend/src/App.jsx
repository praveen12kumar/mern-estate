import React from 'react'
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/user/Login";
import Register from './pages/user/Register';
import Profile from "./pages/user/Profile";



const App = () => {
  return (
    <div>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>

    </Routes>
    </div>
  )
}

export default App
