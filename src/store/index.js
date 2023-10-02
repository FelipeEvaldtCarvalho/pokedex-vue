import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { getPokeCardInfo } from "../services/helper.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemons: [],
    homeLoading: true,
    pokemonsError: false,
  },
  getters: {
    getPokemonsLength: (state) => state.pokemons.length,
    getPokemons: (state) => state.pokemons,
    getHomeLoading: (state) => state.homeLoading,
    getPokemonsError: (state) => state.pokemonsError,
    getPokemon: (state) => (id) =>
      state.pokemons.find((pokemon) => pokemon.id == id),
  },
  mutations: {
    setPokemons: (state, value) => (state.pokemons = value),
    setPokemonsError: (state, value) => (state.pokemonsError = value),
    setHomeLoading: (state, value) => (state.homeLoading = value),
  },
  actions: {
    fetchPokemons: async ({ commit }) => {
      commit("setHomeLoading", true);

      try {
        const {
          data: { results },
          // } = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=15");
        } = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=493");
        const pokemonList = [];
        results.forEach(async (pokemon) => {
          const pokeInfo = await getPokeCardInfo(pokemon);
          pokemonList.push(pokeInfo);
        });
        commit("setPokemons", pokemonList);
        commit("setPokemonsError", false);
      } catch (error) {
        commit("setPokemonsError", true);
      } finally {
        commit("setHomeLoading", false);
      }
    },
  },
  modules: {},
});
