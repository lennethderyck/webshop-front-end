import React, { useCallback, useState } from 'react';
import {Switch, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Error from './components/Error';
import Details from './components/Details';
import Homepage from './pages/Homepage';
import Paintings from './pages/Paintings';
import Orders from './pages/Order';
import Admin from './pages/Admin';
import SignIn from './pages/SignIn';
import ScrollButton from './components/ScrollButton';
import PrivateRoute from './components/PrivateRoute';
import MyOrders from './pages/MyOrders';
import ScrollToTop from './components/ScrollToTop';
import Products from './components/admin/Products';
import PaintingForm from './components/PaintingForm';
import Users from './components/admin/Users';



function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = useCallback((theme) => {
    setDarkMode(theme);
  },[]);

  console.log(darkMode);

  return (
    <>
    <div className={darkMode ? "body-app darkMode" : "body-app"}>
    <React.Fragment>
      <Navbar onDarkMode={handleDarkMode} theme={darkMode}/>
      <ScrollToTop>
      <Switch>
        <Route exact path="/">
          <Homepage/>
        </Route>
        <Route path="/products">
          <Paintings/>
        </Route>
        <Route path="/signIn">
          <SignIn/>
        </Route>
        <Route path="/cart/:id?">
          <Details/>
        </Route>
        <PrivateRoute path="/order" role="user">
          <Orders/>
        </PrivateRoute>
        <PrivateRoute path="/myorders" role="user">
          <MyOrders/>
        </PrivateRoute>
        <Route path="/details/:id">
          <Details/>
        </Route>
        <Route path="/details">
          <Details/>
        </Route>
        <PrivateRoute path="/admin/:name" role="admin">
          <Admin/>
        </PrivateRoute>
        <PrivateRoute path="/admin" role="admin">
          <Admin/>
        </PrivateRoute>
        <PrivateRoute path="/users" role="admin">
          <Users/>
        </PrivateRoute>
        <PrivateRoute path="/productsAdmin" role="admin">
          <Products/>
        </PrivateRoute>
        <PrivateRoute path="/addPaintingForm/:id" role="admin">
          <PaintingForm/>
        </PrivateRoute>
        <PrivateRoute path="/addPaintingForm" role="admin">
          <PaintingForm/>
        </PrivateRoute>
        <Route component={Error}></Route>
      </Switch>
      </ScrollToTop>
      <ScrollButton/>
      <Footer/>
    </React.Fragment>
    </div>
    </>
  );
}

export default App;
