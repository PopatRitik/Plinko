import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/App.css';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1>Play Plinko, Earn More!</h1>
      <h3>
        Plinko lets players drop a ball from the top of our triangular pin
        pyramid to find the winning route down to a corresponding multiplier.
        Inspired by the Japanese mechanical game known as Pachinko, Plinko
        provides players with the ability to customise your risk factor and
        multipliers ensuring this game is suited for everyone at
        our online casino!
      </h3>
      <button className="button hb" onClick={() => navigate("/game")}>
        Go to Game
      </button>
    </div>
  );
};
