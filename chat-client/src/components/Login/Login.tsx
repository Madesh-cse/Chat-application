import "../../styles/components/Login/Login.scss";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
function Login() {
  const [authUser, setauthUser] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{
    const verifiedToken = async()=>{
        const token = localStorage.getItem('token');
        if(!token){
            return;
        }

        try{
            await axios.get("http://localhost:8080/auth/get-started/verify", {
            headers: { Authorization: `Bearer ${token}` },
        });
        }
        catch(err){
            localStorage.removeItem("token");
        }
    }
    verifiedToken()
  },[])

  const AuthHandleSubmit = async(e: React.FormEvent<HTMLElement>)=>{
    e.preventDefault();

    try{
        const authResponse = await axios.post("http://localhost:8080/auth/get-started/login", authUser);
        console.log(authResponse.data);
        console.log('Login Successfull')
    
      setauthUser({
        email:'',
        password:"",
      })
       localStorage.setItem("token", authResponse.data.token);
    }
    catch(err){
        console.log('LOGIN FAILED');
    }
   
  }
  return (
    <section className="LoginContainer">
      <div className="Login-content">
        <div className="Login-logo">
          <img
            src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg"
            alt="MessageX"
          />
        </div>
        <div className="Login-description">
          <h1>LOG IN , enter your email</h1>
          <span>address</span>
        </div>
        <div className="Login-title">
          <p>
            We suggest using the <b>email address that you use at work.</b>
          </p>
        </div>
        <div className="Login-form">
          <form action="" onSubmit={AuthHandleSubmit}>
            <div className="Email">
              <input
                type="text"
                value={authUser.email}
                onChange={(e) =>
                  setauthUser({ ...authUser, email: e.target.value })
                }
                placeholder="Email"
              />
            </div>
            <div className="Email">
              <input
                type="password"
                value={authUser.password}
                onChange={(e) =>
                  setauthUser({ ...authUser, password: e.target.value })
                }
                placeholder="password"
              />
            </div>
            <button type="submit">Continue</button>
          </form>
          <div className="divider">
            <span>OTHER OPTIONS</span>
          </div>
          <div className="Other-platform">
            <NavLink to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                alt=""
              />
            </NavLink>
            <NavLink to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt=""
              />
            </NavLink>
          </div>
          <div className="about-content">
            <p>
              By entering your email address and continuing, you will either
              create a new workspace or be directed <br /> to any existing
              workspaces or invitations associated with your email.
            </p>
            <p className="para2">
              By creating a workspace, you’re agreeing to our main services
              agreement, user terms of service and <br /> Slack supplemental
              terms. Additional disclosures are available in our privacy policy
              and cookie policy.
            </p>
          </div>
          <div className="Existing-content">
            <p>Already using Slack?</p>
            <NavLink to="/">Sign in to an existing workspace</NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
