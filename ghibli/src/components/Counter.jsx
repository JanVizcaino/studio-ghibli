/*import { useState } from 'react' 

export default function Counter() { 
  // count es el valor actual. setCount es la función para cambiarlo. 
  // El valor inicial es 0. 
  const [count, setCount] = useState(0) 

  // Manejador de clic: suma 1 al contador. 
  function handleClick() { 
    // Forma segura: usamos el valor previo para evitar condiciones de carrera. 
    setCount(prev => prev + 1) 
  } 

  return ( 
    <section> 
      <strong>Contador:</strong> {count} 
      <div> 
        <button onClick={handleClick}>Sumar 1</button> 
      </div>
    </section> 
  ) 
}*/

import { useEffect, useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `Contador: ${count}`
  }, [count])

  function handleClick() {
    setCount(prev => prev + 1)
  }

  return (
    <section className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-6 max-w-sm mx-auto mt-10 transition hover:shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        Contador: <span className="text-indigo-600">{count}</span>
      </h2>

      <button
        onClick={handleClick}
        className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition active:scale-95"
      >
        ➕ Sumar 1
      </button>
    </section>
  )
}
