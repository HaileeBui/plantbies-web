import React from 'react';
import './App.css';

import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './views/Home';
import ShoppingCart from './views/ShoppingCart';
import Detail from './views/Detail';
import Admin from './views/Admin';
import { PlantProvider } from './context/PlantContext';

const App = () => {
  return (
    <PlantProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shopping-cart" component={ShoppingCart} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/admin" component={Admin} /> 
        </Switch>
      </Router>
    </PlantProvider>
  );
}

export default App;
