import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Characters from './pages/Characters.jsx'
import Contact from './pages/Contact.jsx'
import Game from './pages/Game.jsx'
import FilmDetail from './pages/FilmDetail.jsx' // NUEVO

export default function App() {
  return (
    <>
      <header className="bg-gray-900 text-white shadow-md">
        <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold tracking-wide text-indigo-400">
            🎬 My Movie App
          </h1>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition-colors duration-200 hover:text-indigo-400 ${
                    isActive ? 'text-indigo-400 font-semibold' : 'text-gray-300'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/characters"
                className={({ isActive }) =>
                  `transition-colors duration-200 hover:text-indigo-400 ${
                    isActive ? 'text-indigo-400 font-semibold' : 'text-gray-300'
                  }`
                }
              >
                Characters
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `transition-colors duration-200 hover:text-indigo-400 ${
                    isActive ? 'text-indigo-400 font-semibold' : 'text-gray-300'
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/game"
                className={({ isActive }) =>
                  `transition-colors duration-200 hover:text-indigo-400 ${
                    isActive ? 'text-indigo-400 font-semibold' : 'text-gray-300'
                  }`
                }
              >
                Game
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<FilmDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </main>
    </>
  )
}
