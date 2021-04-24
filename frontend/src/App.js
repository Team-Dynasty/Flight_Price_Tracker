import Header from './components/Header';
import './App.css';
import Hero from './components/Hero';


import Signup from './components/Sign/Signup'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Hero/>
    </div>
  );
}

export default App;

