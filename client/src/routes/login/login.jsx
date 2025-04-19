import { useState } from "react";
import "./login.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";

import apiRequest from "../../lib/apiRequest.js";

function Login() {
  const [error,setError]= useState("")
  const [loading,setLoading]= useState(false);
  const navigate= useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    const formData= new FormData(e.target);
    const username= formData.get("username");
    
    const password= formData.get("password");

    try {
      const response= await apiRequest.post("/auth/login",{username,password})
      console.log(response.data);
      
      localStorage.setItem("user",JSON.stringify(response.data));
      navigate("/")

    } catch (error) {
      console.log(error);
       setError(error.response.data.message)
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">{loading ? "Loading..." : "Login"}</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
