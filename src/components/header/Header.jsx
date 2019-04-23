import React, { Component } from "react";

import './header.scss'

const Header = ({user, isAuthenticated, logout}) => (
  <header className="contacts-app-header">
    <div className="logo">Contacts App</div>
    {user && <div className="user-info">Hi, {user.firstName}</div>}
    <div className="controls">
      {isAuthenticated && <a className="control" onClick={logout} href="#">Logout</a>}
    </div>
  </header>
)

export default Header;