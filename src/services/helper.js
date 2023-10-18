import axios from "axios";

export const formatId = (id) =>
  id.toString().length === 1
    ? `00${id}`
    : id.toString().length === 2
    ? `0${id}`
    : id.toString();

const getType = ([type]) => type.type.name;

const getImageId = (urlStr) => {
  const regex = /[^v]\d/;
  const searchId = urlStr.search(regex);
  return urlStr.slice(searchId + 1, -1);
};

const getDescription = (flavors) => {
  let tempDescription = [];
  tempDescription = flavors
    .filter((flavor) => flavor.language.name === "en")
    .map((item) => item.flavor_text);

  const num = Math.floor(Math.random() * tempDescription.length);

  return tempDescription[num];
};

const flattenArray = (arr) => {
  const result = [];

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  });

  return result;
};

const getEvolutions = (chain) => {
  let apiData = [chain];
  let evolutionId = getImageId(chain.species.url);
  let evoChainFormattedData = [
    {
      id: evolutionId,
      name: chain.species.name,
    },
  ];
  let maxEvo = 2;
  for (var i = 0; i < maxEvo; i++) {
    if (apiData[i].evolves_to.length > 1) {
      let multiEvoPath = [];
      apiData[i].evolves_to.forEach((pokemon) => {
        apiData.push(pokemon);
        evolutionId = getImageId(pokemon.species.url);
        multiEvoPath.push({
          id: evolutionId,
          name: pokemon.species.name,
        });
      });
      evoChainFormattedData.push(multiEvoPath);
    } else {
      if (apiData[i].evolves_to.length) {
        let nextEvoData = apiData[i].evolves_to[0];
        apiData.push(nextEvoData);
        evolutionId = getImageId(nextEvoData.species.url);
        evoChainFormattedData.push({
          id: evolutionId,
          name: nextEvoData.species.name,
        });
      } else {
        i = maxEvo;
      }
    }
  }
  return flattenArray(evoChainFormattedData);
};

export const getPokeCardInfo = async ({ url }) => {
  let pokeInfo;

  try {
    const { data } = await axios.get(url);
    const { id, name, types, height, weight, stats, abilities } = data;
    const pokemonSpeciesURL = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    const {
      data: { flavor_text_entries, evolution_chain },
    } = await axios.get(pokemonSpeciesURL);
    pokeInfo = {
      id,
      idString: formatId(id),
      name,
      type: getType(types),
      types,
      height,
      weight,
      stats,
      abilities,
      description: getDescription(flavor_text_entries),
      evolutionChainUrl: evolution_chain.url,
    };
  } catch (error) {
    console.log(error);
  }
  try {
    const {
      data: { chain },
    } = await axios.get(pokeInfo.evolutionChainUrl);
    pokeInfo.evolutions = getEvolutions(chain);
  } catch {
    pokeInfo.evolutions = false;
  }
  return pokeInfo;
};
