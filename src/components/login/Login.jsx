import React, { Component } from "react";

import UserActions from '../../actions/userActions';

import './login.scss'

class Login extends Component {

  state = {
    username: null,
    password: null
  };

  handleSubmit = () => {
    const {username, password} =this.state;
    UserActions.login(username, password).then(this.props.onSuccess).catch(this.props.onFailure); 
  }

  handleChange = (stateKey) => {
    return (e) => {
      this.setState({[stateKey]: e.target.value});
    }
  }

  render() {
    return (
      <div className="login-form-container">
        <div className="title">Log In</div>
        <div className="login-form" >
          <input type="text" placeholder="Username" onChange={this.handleChange('username')} />
          <input type="password" placeholder="Password" onChange={this.handleChange('password')} />
          <button onClick={this.handleSubmit}>Sign In</button>
        </div>
      </div>
    );
  }
}

export default Login;
