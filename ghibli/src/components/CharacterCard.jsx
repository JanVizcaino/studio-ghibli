import { Link } from 'react-router-dom'

// Tarjeta básica tolerante a datos normalizados
export default function CharacterCard({ character }) {
  const { id, name, image, description } = character

  return (
    <li className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-xl hover:-translate-y-1 duration-300">
      <Link 
        to={`/characters/${id}`} 
        className="block text-gray-900 no-underline"
      >
        <h3 className="text-lg font-semibold px-4 pt-4 pb-2 text-gray-800 hover:text-indigo-600 transition-colors">
          {name}
        </h3>

        {image && (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-auto rounded-none object-cover"
          />
        )}
      </Link>

      <div className="px-4 pb-4">
        <p className="text-sm text-gray-600 mb-2">
          {description}
        </p>

        <Link 
          to={`/characters/${id}`} 
          className="inline-block mt-2 text-sm text-indigo-500 hover:text-indigo-700 font-medium transition"
        >
          Ver detalle →
        </Link>
      </div>
    </li>
  )
}
