// Aquí desestructuramos { name } para usarlo directamente.
function Greeting({ name }) {
  return (
    <p className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300">
      Hola, {name} 😹😉
    </p>
  )
}

export default Greeting
