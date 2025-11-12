import { useEffect, useState } from 'react'

// Combinaciones ganadoras
const winLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

function checkWinner(board) {
  for (const [a, b, c] of winLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState('X')

  const winner = checkWinner(board)

  useEffect(() => {
    document.title = winner ? `Ganó ${winner} — Tres en Raya` : `Turno: ${turn} — Tres en Raya`
  }, [winner, turn])

  function handleClick(index) {
    if (winner || board[index] !== null) {
      return alert('Movimiento inválido. Reinicia para volver a jugar.')
    }

    const newBoard = [...board]
    newBoard[index] = turn
    const possibleWinner = checkWinner(newBoard)

    if (possibleWinner) {
      setBoard(newBoard)
      return alert(`¡${possibleWinner} ha ganado!`)
    }

    setBoard(newBoard)
    setTurn(prev => (prev === 'X' ? 'O' : 'X'))
  }

  function resetGame() {
    setBoard(Array(9).fill(null))
    setTurn('X')
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-800 p-6">
      <h2 className="text-3xl font-bold mb-2 text-indigo-600">Tres en Raya</h2>
      {!winner && <p className="text-lg mb-4">Turno actual: <span className="font-semibold">{turn}</span></p>}
      {winner && <p className="text-lg mb-4 font-semibold text-green-600">¡Ganó {winner}!</p>}

      {/* Tablero */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`w-20 h-20 text-3xl font-bold rounded-lg shadow-sm transition
              ${cell === 'X' ? 'text-indigo-600' : cell === 'O' ? 'text-pink-500' : 'text-gray-400'}
              bg-white hover:bg-indigo-50 active:scale-95`}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 active:scale-95 transition font-medium"
      >
        Reiniciar
      </button>

      <p className="mt-6 text-sm text-gray-600 max-w-md text-center">
        Aprendemos que <code className="bg-gray-100 px-1 rounded">useState</code> guarda datos que sobreviven entre renders, 
        y con <code className="bg-gray-100 px-1 rounded">useEffect</code> reaccionamos a cambios para afectar al mundo exterior, 
        como el título del documento.
      </p>
    </section>
  )
}
