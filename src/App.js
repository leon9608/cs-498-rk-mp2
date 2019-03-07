import React, { Component } from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from './Component/home'
import GalleryPage from './Component/gallery'

const App = () => (
    <Router>
        <Switch>
        <Route path="/cs-498-rk-mp2/" exact component={HomePage} />
        <Route path="/cs-498-rk-mp2/gallery" exact component={GalleryPage} />
        </Switch>
    </Router>
)


export default App;
