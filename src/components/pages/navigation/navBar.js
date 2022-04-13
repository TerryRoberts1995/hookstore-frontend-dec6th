import React, {useState, useEffect} from 'react';
import {A} from 'hookrouter';
import {useAppContext} from '../../Context';
import Cookies from 'js-cookie';

export default function NavBar () {
  const {
    loggedIn,
    setLoggedIn,
    login,
    logout,
    active,
    setActive,
  } = useAppContext ();

  function handleActive (link) {
    if (link) {
      buttonType ();
    }

    setActive (link);
  }

  const buttonType = () => {
    if (Cookies.get ('username')) {
      setLoggedIn (false);
      logout ();
    } else if (loggedIn && Cookies.get ('username')) {
      login ();
    }
  };

  useEffect (() => {
    if (Cookies.get ('username')) {
      setLoggedIn (true);
    }

    console.log (active);
  });

  return (
    <div className="navigation-container">
      <div className="nav-link-wrapper">
        <div className="nav-link">
          <A
            className={`link ${active === 'home' ? 'active' : ''}`}
            onClick={e => handleActive (e.target.name)}
            href="/"
            name="home"
          >
            Home
          </A>
        </div>
        <div className="nav-link">
          <A
            className={`link ${active === 'add' ? 'active' : ''}`}
            onClick={e => handleActive (e.target.name)}
            href="/add"
            name="add"
          >
            Add-Book
          </A>
        </div>
        <div className="nav-link">
          <A
            className={`link ${active === 'signup' ? 'active' : ''}`}
            onClick={e => handleActive (e.target.name)}
            href="/signup"
            name="signup"
          >
            {loggedIn ? '' : 'Sign Up'}
          </A>
        </div>
        <div className="nav-link">
          <A
            className={`link ${active === 'login' ? 'active' : ''}`}
            onClick={e => handleActive (e.target.name)}
            href="/login"
            name="login"
          >
            {loggedIn ? 'Logout' : 'Login'}
          </A>
        </div>
      </div>
    </div>
  );
}
