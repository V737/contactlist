import React, { Component } from 'react';

import Header from './components/header/Header';
import Login from './components/login/Login';

import Store from './store';
import './App.css';
import ContactList from './components/contactsList/ContactsList';


class App extends Component {
  constructor() {
    super();
    this.state = Object.assign({currentPage: 1}, Store.get());
  }
  

  componentDidUpdate = () => {
    Store.set(this.state)
  }

  storeAuthInfo = ({user, token: {authToken}}) => {
    this.setState({user, authToken, isAuthenticated:  true});
  }

  logout = () => {
    this.setState({user: null, authToken: null, isAuthenticated: false});
    Store.set({});
  }

  updateCurrentPage = (pageNumber) => {
    this.setState({currentPage: pageNumber});
  }

  render() {
    const { isAuthenticated, user, authToken, currentPage } = this.state;
    return (
      <React.Fragment>
        <Header user={user} isAuthenticated={isAuthenticated} logout={this.logout} />
        <div className="App">
          {!isAuthenticated && <Login onSuccess={this.storeAuthInfo} onFailure={this.logout}/>}
          {isAuthenticated && <ContactList 
                                authToken={authToken}
                                pageNumber={currentPage}
                                updateCurrentPage={this.updateCurrentPage}/>}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
