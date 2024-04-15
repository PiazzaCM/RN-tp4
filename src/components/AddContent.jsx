import React, { useEffect, useState } from 'react';

function AddContent() {
  const [pokemones, setPokemones] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getPokemones = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
        const listaPokemones = await response.json();
        const { results } = listaPokemones;

        const pokemon = await Promise.all(results.map(async (pokemon) => {
          const data = await fetch(pokemon.url);
          const poke = await data.json();
          return {
            id: poke.id,
            name: poke.name,
            img: poke.sprites.other.dream_world.front_default 
          };
        }));
        setPokemones(pokemon);
      } catch (error) {
        console.error("no se pudo traer el pokeemonnn", error);
      }
    };

    getPokemones();
  }, []);

  const otroPokemon = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const borrar = (index) => {
    setPokemones(prevPokemones => prevPokemones.filter((_, i) => i !== index));
  };

  return (
    <>
    <div>     
         {currentIndex < pokemones.length - 1 && (
        <button className="btn btn-primary" onClick={otroPokemon}>Cargar siguiente Pokémon o evolucion</button>
      )}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {pokemones.slice(0, currentIndex + 1).map((pokemon, index) => (
          <div key={pokemon.id} style={{ marginRight: "20px", marginBottom: "20px" }}>
            <h2>{pokemon.name}</h2>
            <button className="btn btn-primary" onClick={() => borrar(index)}>Borrar</button>
            {pokemon.img && <img src={pokemon.img} alt={pokemon.name} />}

          </div>
        ))}
      </div>

    </>
  );
}

export default AddContent;
