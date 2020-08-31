import React from 'react';
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.App}>
      <h2> Привет </h2>
    </div>
  );
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default app;
