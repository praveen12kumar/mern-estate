import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom"
import "./register.scss";


const Login = () => {
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    email:"",
    password:""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const handleInput = (e)=>{
    setformData({
      ...formData, [e.target.name]: e.target.value 
    });
  }

  const handleSubmit = async(e)=>{
    try {
      e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/v1/auth/login",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if(data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setError(null);
    setLoading(false);

    setformData({
      username:"",
      email:"",
      password:""
    })
    navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }


  return (
    <div className="register">
        <h1>Login</h1>
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" placeholder='email' name='email' value={formData.email} onChange={handleInput}/>
            <input type="password" placeholder='password' name='password' value={formData.password} onChange={handleInput}/>
            <button disabled={loading} type='submit'>{loading ? "Loading..." : "Login"}</button>
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
