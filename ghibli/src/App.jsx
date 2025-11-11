import Greeting from './components/Greeting.jsx' 
import Counter from './components/Counter.jsx' 
import Game from './components/Game.jsx'

function App() { 
  return ( 
    <main> 
      <h1>Ghibli App</h1> 
      <Greeting name="DAW1" /> 
      <Counter /> 
      <Game />
    </main> 
  ) 
} 

export default App 
