import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from './home'
import GalleryPage from './gallery'
import DetailPage from './detail'

const App = () => (
    <Router>
        <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/detail" exact component={DetailPage} />
        <Route path="/gallery" exact component={GalleryPage} />
        </Switch>
    </Router>
)


export default App;
