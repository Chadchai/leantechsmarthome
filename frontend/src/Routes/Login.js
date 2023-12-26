import React, { useState, useEffect } from 'react';
import '../App.css';

import Appbar from '../components/appbar1';
import SignIn from '../components/Signin';
import Footer from '../components/Footer';
function Login() {

  return (
    <div className="App">
         
      <header className="App-header">
    
     <SignIn/>
   
      </header>
      <Footer/>
   
    </div>
  );
}

export default Login;
