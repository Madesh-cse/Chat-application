import "../../styles/components/Register/Register.scss";
import { NavLink } from "react-router-dom";
import { TbWorld } from "react-icons/tb";
import React, { useState } from "react";
import axios from "axios";

function Registration() {

    const [userData,setuserData] = useState({
        name:'',
        email:'',
        password:''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const response = await axios.post('http://localhost:8080/auth/get-started/signup', userData);
        console.log(response.data)
        setuserData({
            name:'',
            email:'',
            password:'',
        })
    }

  return (
    <section className="Register-container">
      <div className="Register-content">
        <div className="Register-logo">
          <img
            src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg"
            alt="MessageX"
          />
        </div>
        <div className="Register-description">
          <h1>First of all, enter your email</h1>
          <span>address</span>
        </div>
        <div className="Register-title">
          <p>
            We suggest using the <b>email address that you use at work.</b>
          </p>
        </div>
        <div className="Register-form">
          <form action="" onSubmit={handleSubmit}>
            <div className="Email">
              <input type="text" value={userData.name} onChange={(e)=>setuserData({...userData, name: e.target.value})} placeholder="name" />
            </div>
            <div className="Email">
              <input type="email" value={userData.email} onChange={(e)=>setuserData({...userData, email: e.target.value})} placeholder="name@work-email.com" />
            </div>
            <div className="Email">
              <input type="password" value={userData.password} onChange={(e)=>setuserData({...userData, password: e.target.value})} placeholder="password" />
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
            <p>By entering your email address and continuing, you will either create a new workspace or be directed <br /> to any existing workspaces or invitations associated with your email.</p>
            <p className="para2">By creating a workspace, you’re agreeing to our main services agreement, user terms of service and <br /> Slack supplemental terms. Additional disclosures are available in our privacy policy and cookie policy.</p>
          </div>
          <div className="Existing-content">
            <p>Already using Slack?</p>
            <NavLink to='/'>Sign in to an existing workspace</NavLink>
          </div>
        </div>
        <div className="footer">
            <NavLink to='/'>Privacy & terms</NavLink>
            <NavLink to='/'>Contact us</NavLink>
            <NavLink to='/'> <span><TbWorld/></span>Change region</NavLink>
        </div>
      </div>
    </section>
  );
}

export default Registration;
