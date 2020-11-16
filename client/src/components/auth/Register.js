import React, { useState, useContext } from "react";
import loginImg from "../../login.svg";
import { GlobalContext } from "../../contex/GlobalState";
import axios from 'axios';
export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            full_name:'sajjjda',
            username:'',
            email:'',
            password:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    
      handleSubmit(event) {
        const {full_name,username, email, password } = this.state; 
        const config = {
            headers: {
                'Content_Type': 'application/json'
            }
        } 
        axios
          .post(
            "http://localhost:7000/api/v1/signup",
            {
                full_name:full_name,
                username:username,
                email_id: email,
                password: password
            },
            config
          )
          .then(response => {  
            if (response.data.success == true) {
              this.props.handleSuccessfulAuth(response.data);
            }
          })
          .catch(error => {
            console.log("registration error", error);
          });
        event.preventDefault();
      }
    
  render() {
    return (
    <form onSubmit={this.handleSubmit}>
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form" >
          <div className="form-group">
              <label htmlFor="username">Full Name</label>
              <input type="text" name="fname"  placeholder="Full Name"  required />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" value={this.state.username}
            onChange={this.handleChange}
            required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" value={this.state.email}
            onChange={this.handleChange}
            required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" value={this.state.password}
            onChange={this.handleChange}
            required />
            </div>
          </div>
          
        </div>
        <div className="footer">
          <button type="submit" className="btn" >
            Register
          </button>
        </div>
      </div>
    </form> 
    );
  }
}
