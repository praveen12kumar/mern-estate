import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearStatus, loginUser } from './authSlice';
import { clearErrors } from './authSlice';

import "./register.scss";
import OAuth from '../../components/oAuth/OAuth';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {error, status, user} = useSelector(state => state.auth);

  const [formData, setformData] = useState({
    email:"",
    password:""
  });



  const handleInput = (e)=>{
    setformData({
      ...formData, [e.target.name]: e.target.value 
    });
  }

  const handleSubmit = (e)=>{
      e.preventDefault();
      dispatch(loginUser({...formData}));
      if(error){
        dispatch(clearErrors());
      }
     
  }

  useEffect(()=>{
    dispatch(clearStatus());
    if(status=="success"){
      setformData({
        email:"",
        password:""
      });
      navigate("/");
    }
  },[user, navigate, status])

  return (
    <div className="register">
        <h1>Login</h1>
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" placeholder='email' name='email' value={formData.email} onChange={handleInput}/>
            <input type="password" placeholder='password' name='password' value={formData.password} onChange={handleInput}/>
            <button disabled={status === "pending"} type='submit'>{status === "pending" ? "Loading..." : "Login"}</button>
            <OAuth/>
        </form>
        <div className="have-an-account">
          <p>Don't have an account?</p>
          <Link to="/register">Register</Link>
        </div>
        {error && <p className="error">{error}</p> }
    </div>
  )
}


export default Login
