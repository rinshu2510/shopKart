import './App.css';
import { React, useEffect } from 'react';
import webFont from "webfontloader";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";



function App() {

  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    webFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'chilanka', 'Droid Serif']
      }
    });

    store.dispatch(loadUser());

  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />

      <Route exact path="/account" component={Profile} />


      <Route exact path="/login" component={LoginSignUp} />

      <Footer />
    </Router>

  );
}

export default App;
