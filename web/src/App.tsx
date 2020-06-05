import React from 'react';
import './App.css';

//import Home from './pages/Home';
import Routes from './routes';
//import Header from './Header';
//import { useState } from 'react';

function App() {
  //const [counter, setCounter] = useState(0);
  //function handleButtonClick(){
  //  console.log("oi");
  //  setCounter(counter+1);
  //}

  return (
    <Routes />
    //<div>
    //  <Header title="Hello World"/>
    //  <h1>{counter}</h1>
    //  <button type="button" onClick={handleButtonClick}>Aumentar</button>
    //</div>
  );
}

export default App;
