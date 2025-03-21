import { useEffect, useState } from "react";
import getPokemonsData from "../utlis/api";
import "../public/main.css";

export default function PokemonList() {
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const { count, results } = await getPokemonsData(offset);
        setTotalCount(count);
        setPokemons((prevPokemons) => [...prevPokemons, ...results]);
      } catch (err) {
        setError("Error fetching data");
      }
    };

    fetchPokemons();
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 5);
  };

  return (
    <div className="pokemon-list-page">
      <h1>Pokemon List</h1>
      <ul className="pokemon-list">
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>
            <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
            <img src={pokemon.image} alt={pokemon.name} />
          </li>
        ))}
      </ul>
      <p>
        Displaying {pokemons.length} of {totalCount} Pokemon
      </p>
      {pokemons.length < totalCount && <button onClick={handleLoadMore}>Load More</button>}

      {error && <p>{error}</p>}
    </div>
  );
}
