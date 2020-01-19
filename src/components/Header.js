import React from 'react';
import { NavLink, Switch, Route, Redirect, Link } from "react-router-dom";
//import Routes from '../routes';
import "../css/grid_style.css"
import HomePage from './HomePage'
import TestPage from '../pages/TestPage'


const Header = () => (
  <header className="header">
    <h1><img src="https://stickershop.line-scdn.net/products/0/0/1/13637/android/main.png" alt="React Stack Grid" /></h1>
    <nav>
        <ul >
            <li><NavLink to="home" className="navButton">Home</NavLink></li>
            <li><Link to="test" className="navButton">Test</Link></li>
        </ul>
    </nav>

    {/* <Switch>
        <Route exact path='/home'>
        </Route>
        <Route exact path='/test' component={TestPage}>
        </Route>
        <Redirect from="/home" to="/" />
    </Switch> */}

    {/* <nav>
      <ul>
        <li><NavLink to="/" activeClassName="is-active">Home</NavLink></li>
        <li><Link to="/horizontal/" activeClassName="is-active">Horizontal</Link></li>
        <li><Link to="/change-size/" activeClassName="is-active">Change Size</Link></li>
        <li><Link to="/real-world/" activeClassName="is-active">Real World</Link></li>
        <li><a href="https://github.com/tsuyoshiwada/react-stack-grid">GitHub</a></li>
      </ul>
    </nav> */}
  </header>
);

export default Header;
