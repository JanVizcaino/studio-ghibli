import { useState } from 'react' 

export default function Game() { 
  // 1) Estado del tablero: 9 casillas vacías (null). Representamos 3x3 como un array. 
  const [board, setBoard] = useState(Array(9).fill(null)) 

  // 2) Estado del turno: empieza jugando "X" 
  const [turn, setTurn] = useState('X') 

  // Al hacer clic en una casilla... 
  function handleClick(index) { 
    // Si la casilla ya está ocupada, no hacemos nada (regla simple). 
    if (board[index] !== null) return 

    // 1. Creamos una copia nueva del tablero (nunca mutar el estado directo). 
    const newBoard = [...board] 

    // 2. Marcamos la casilla con "X" o "O" según el turno. 
    newBoard[index] = turn 

    // 3. Guardamos el nuevo tablero en el estado. 
    setBoard(newBoard) 

    // 4. Cambiamos de turno: si era X, pasa a O; si era O, pasa a X. 
    setTurn(prev => (prev === 'X' ? 'O' : 'X')) 
  }

  // Reiniciar el juego a su estado inicial 
  function resetGame() { 
    setBoard(Array(9).fill(null)) 
    setTurn('X') 
  } 

  return ( 
    <section> 
      <h2>Mini Tres en Raya</h2> 
      <p>Turno actual: {turn}</p> 

      {/* Tablero 3x3 renderizado como 9 botones */} 
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 60px)', 
        gap: '10px', 
        margin: '1rem 0' 
      }}> 
        {board.map((cell, index) => ( 
          <button 
            key={index} 
            onClick={() => handleClick(index)} 
            style={{ height: '60px', fontSize: '1.4rem' }} 
          > 
            {cell} 
          </button> 
        ))} 
      </div> 

      <button onClick={resetGame}>Reiniciar</button> 

      <p style={{ marginTop: '1rem', color: '#666', fontSize: '.9rem' }}> 
        useState guarda tablero y turno. Cada vez que cambian, React vuelve a pintar. 
      </p> 
    </section> 
  ) 
}
