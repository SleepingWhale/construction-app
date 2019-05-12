import React from 'react';
import './App.css';

function App() {
  fetch('/companies?search=e&filters[]=Electrical&count=10&page=3').then((data) => console.log(data));
  return (
    <div className="App">
      aaa
    </div>
  );
}

export default App;
