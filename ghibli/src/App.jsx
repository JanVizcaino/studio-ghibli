import Greeting from './components/Greeting.jsx'

function App() { 
  return ( 
    <main> 
      <h1>Ghibli App</h1> 

      {/* Mismo componente, datos distintos. Reutilización real. */} 
      <Greeting name="DAW1" /> 
      <Greeting name="DAW2" /> 
    </main> 
  ) 
} 

export default App 
