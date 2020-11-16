import React from "react";
import loginImg from "../../login.svg";
import axios from 'axios';
import {Link} from 'react-router-dom'
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          loginErrors: ""
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    
      handleSubmit(event) {
        const { username, password } = this.state;
        const config = {
            headers: {
                'Content_Type': 'application/json'
            }
        } 
        axios
          .post(
            "http://localhost:7000/api/v1/login",
            {
                username: username,
                password: password
            },
           config
          )
          .then(response => {
             console.log("Response is ",response);
            if (response.data.success==true) {   
                // this.props.history.push("../header");

              this.props.handleSuccessfulAuth(response.data);
            }
          })
          .catch(error => {
            console.log("login error", error);
          });
        event.preventDefault();
      }
  render() {
    return (
    <form onSubmit={this.handleSubmit}>
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}  />
            </div>
          </div>
        </div>
        <div className="footer">

          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </div>
      </form>
    );
  }
}
