import Header from './components/Header'
import './App.css';
import Hero from './components/Hero'
import styled from 'styled-components'
function App() {
  return (
    <Apps className="App">
        <Header/>
        <Hero/>
    </Apps>
  );
}

export default App;


const Apps = styled.div `
height:90vh;
background-color:black;
`