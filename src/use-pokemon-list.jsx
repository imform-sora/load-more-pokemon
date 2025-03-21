import { useEffect, useState } from "react";
import getPokemonsData from "./utils/api";

export default function usePokemonList() {
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

  return { totalCount, pokemons, error, handleLoadMore };
}
