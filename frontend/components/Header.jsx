import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../src/App.css';
import logo from '../src/assets/logo.png';

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo" className="header-logo" />
      </Link>
      <button className="button" onClick={() => navigate("/game")}>
        Go to Game
      </button>
    </header>
  );
};
