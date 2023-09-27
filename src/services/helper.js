import axios from "axios";

const formatId = (id) =>
  id.toString().length === 1
    ? `00${id}`
    : id.toString().length === 2
    ? `0${id}`
    : id.toString();

const getType = ([type]) => type.type.name;

export const getPokeCardInfo = async ({ url }) => {
  let pokeInfo;

  try {
    const {
      data: { id, name, types, height, weight, stats, abilities },
    } = await axios.get(url);

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
    };
  } catch (error) {
    console.log(error);
  }
  try {
    const {
      data: { chain },
    } = await axios.get(
      `https://pokeapi.co/api/v2/evolution-chain/${pokeInfo.id}/`
    );
    pokeInfo.evolutions = chain;
  } catch {
    pokeInfo.evolutions = false;
  }
  return pokeInfo;
};
