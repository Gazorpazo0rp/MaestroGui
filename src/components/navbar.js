import React from 'react';
import logo from '../logo.png';
import nav_bg from '../nav.jpg'
import { Icon } from 'react-icons-kit'

import {signIn} from 'react-icons-kit/fa/signIn'

import {
    Link
  } from "react-router-dom";
class Navigation_bar extends React.Component {
    render() {
      return (
          <div className="nav_bar">
            <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
            />
            <nav>
              <ul>
                <li>
                <Link to="/auth">Login/signup <Icon icon={signIn} size="25" /></Link>
                </li>
                <li>
                <Link to="/docs">Docs</Link>
                </li>
                <li>
                <Link to="/core"id="core">Convert</Link>
                </li>
                <li >
                <Link to="/" id="home">Home</Link>
                </li>
              </ul>
              <a href="/"><img className="navbar-logo" src={logo} alt="logo"/></a>
            </nav>
            <img id="nav_bg"src={nav_bg} alt="nav bg"/>
          </div>
      );
    }
  }

export default Navigation_bar;