import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

const getPokemonsData = async (offset = 0) => {
  const res = await axios.get(BASE_URL, {
    params: {
      limit: 5,
      offset: offset,
    },
  });

  // 긱 포켓몬의 상세 정보 가져오기
  const pokemonDetails = await Promise.all(
    res.data.results.map(async (pokemon) => {
      const detailRes = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        image: detailRes.data.sprites.other["official-artwork"].front_default,
      };
    })
  );

  return {
    count: res.data.count,
    results: pokemonDetails,
  };
};

export default getPokemonsData;
