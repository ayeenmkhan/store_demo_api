import React from "react";
import loginImg from "../../login.svg";
import axios from 'axios';
import LoginForm from './LoginForm';
export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          loginErrors: ""
        };
    
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
      }
      handleSuccessfulAuth(data) {
        // this.props.handleLogin(data);
        this.props.history.push("../header");
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
        <LoginForm handleSuccessfulAuth={this.handleSuccessfulAuth} />
    );
  }
}
