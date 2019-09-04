import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {Provider} from "mobx-react";
import Home from './Home';
import User from './User';

import './App.scss';

import Stores from './Stores';
import Board from './Board';

const App = () => (
    <Provider stores = {Stores}>
      <BrowserRouter>
        <header className='app-header'>
          <ul className='menubar'>
            <li><Link className='menuitem' to="/">Home</Link></li>
            <li><Link className='menuitem' to="/board/school">기숙사</Link></li>
            <li><Link className='menuitem' to="/board/class">3학년 1반</Link></li>
            <li><Link className='menuitem' to="/board/student">학생회</Link></li>
          </ul>
        </header>

        <section className='app-body'>
          <Route path='/' exact component={Home}/>
          <Route path='/board/:command?/:postid?' component = {Board}/>
          <Route path='/user/:command?/:userid?' component = {User}/>
        </section>
      </BrowserRouter>
    </Provider>
);

export default App;