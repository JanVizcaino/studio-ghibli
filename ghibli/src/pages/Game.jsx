import GameComponent from '../components/Game.jsx' // Ajusta la ruta si es necesario

export default function Game() {
  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Game</h2>
      <p className="text-gray-600 mb-6">
        Bienvenido al tres en raya.
      </p>
      <div className="flex justify-center">
        <GameComponent />
      </div>
    </section>
  );
}
