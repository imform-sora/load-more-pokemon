import usePokemonList from "./use-pokemon-list";
import "../public/main.css";

export default function PokemonList() {
  const { totalCount, pokemons, error, handleLoadMore } = usePokemonList();

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
