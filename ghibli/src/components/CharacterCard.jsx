// Tarjeta básica que intenta mostrar nombre, imagen y descripción 
// Soporta dos "formas": local (name/image/description) y API Ghibli 
export default function CharacterCard({ character }) { 
  const name = character.name ?? character.title 
  const image = character.image ?? character.movie_banner ?? '' 
  const description = character.description ?? 'Sin descripción' 

  return ( 
    <li> 
      <h3>{name}</h3> 
      {image && <img src={image} alt={name} />} 
      <p>{description}</p> 
    </li> 
  ) 
} 
