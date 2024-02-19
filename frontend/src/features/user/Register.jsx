import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';
import { registerUser } from './authSlice';
import { clearErrors, clearStatus } from './authSlice';
import OAuth from '../../components/oAuth/OAuth';
import "./register.scss";


const Register = () => {
  const navigate = useNavigate();
  const dispatch =  useDispatch();
  const {error, status} = useSelector((state)=> state.auth);

  const [formData, setformData] = useState({
    username:"",
    email:"",
    password:""
  });

  
  const handleInput = (e)=>{
    setformData({
      ...formData, [e.target.name]: e.target.value 
    });
  }

  const handleSubmit = (e)=>{
      e.preventDefault()
      dispatch(registerUser({...formData}));

      if(error){
        dispatch(clearErrors());
      }
      
  }

  useEffect(()=>{
    dispatch(clearErrors());
    if(status === "success"){
      navigate("/login");
    }
  }, [status])


  return (
    <div className="register">
        <h1>Register User</h1>
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" placeholder='username' name='username' value={formData.username} onChange={handleInput}/>
            <input type="text" placeholder='email' name='email' value={formData.email} onChange={handleInput}/>
            <input type="password" placeholder='password' name='password' value={formData.password} onChange={handleInput}/>
            <button type='submit'>{status === "pending" ? "Loading..." : "Register"}</button>
            <OAuth/>
        </form>
        <div className="have-an-account">
          <p>Have an account?</p>
          <Link to="/login">Login</Link>
        </div>
        {error && <p className="error">{error}</p> }
    </div>
  )
}

export default Register
