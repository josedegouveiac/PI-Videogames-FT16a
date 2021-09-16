import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/home.js';
import { CreateVideogames } from './components/createVideogames';
import Detail from './components/detail';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/videogame" component={CreateVideogames} />
        <Route path="/videogames/:id" component={Detail} />
      </Switch>
    </div>
  );
}

export default App;
