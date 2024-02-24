import React from 'react'
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./features/user/Login";
import Register from './features/user/Register';
import Profile from "./features/user/Profile";
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Listing from './features/listing/Listing.jsx';
import SingleList from './features/listing/SingleList.jsx';
import UpdateListing from './features/listing/UpdateListing.jsx';
import Search from './pages/Search.jsx';


const App = () => {
  return (
    <div>
      <Header/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<ProtectedRoute>
          <Profile/>
        </ProtectedRoute>}/>
        <Route path='/listing' element={<Listing/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/listing/:id' element={<SingleList/>}/>
        <Route path='/update-listing/:id' element={<UpdateListing/>}/>
       
    </Routes>
    </div>
  )
}

export default App
