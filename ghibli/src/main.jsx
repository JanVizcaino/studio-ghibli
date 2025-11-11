import { StrictMode } from 'react' 
import { createRoot } from 'react-dom/client' 
import './index.css' 
import App from './App.jsx' 

// 1) Obtenemos el contenedor donde React "montará" la app. 
const rootElement = document.getElementById('root') 

// 2) Creamos la raíz de React con el nuevo API concurrente. 
const root = createRoot(rootElement) 

// 3) Renderizamos la aplicación. StrictMode activa comprobaciones en dev. 
root.render( 
  <StrictMode> 
    <App /> 
  </StrictMode> 
) 
