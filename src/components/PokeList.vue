<template>
  <div class="poke-list">
    <div class="input">
      <input type="text" v-model="searchField" />
      <div class="leds">
        <span class="led"></span>
        <span class="led"></span>
      </div>
      <div class="ledzao"></div>
      <div class="speaker"></div>
    </div>
    <Transition name="fade" mode="out-in">
      <div class="cards-container" v-if="!!listToShow.length">
        <PokeCard
          v-for="(pokemon, index) in listToShow"
          :key="index"
          :pokemon="pokemon"
        />
      </div>
      <PokeNotFound v-else />
    </Transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PokeNotFound from "./PokeNotFound.vue";
import PokeCard from "./PokeCard.vue";

export default {
  components: { PokeCard, PokeNotFound },
  name: "PokeList",
  data() {
    return {
      searchField: "",
    };
  },
  computed: {
    ...mapGetters({
      pokemons: "getPokemons",
    }),
    listToShow() {
      const sortedPokemonList = [...this.pokemons];
      return !this.searchField
        ? sortedPokemonList.sort((a, b) => a.id - b.id)
        : this.serchList();
    },
  },
  methods: {
    serchList() {
      const search = this.searchField.toLowerCase();
      return this.pokemons
        .sort((a, b) => a.id - b.id)
        .filter((pokemon) => {
          const pokemonName = pokemon.name.toLowerCase();
          return pokemonName.includes(search);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=VT323&display=swap");

.poke-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4rem;
  margin: 2rem 1rem;
  align-items: center;
  .input {
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 550px;
    padding: 2rem;
    align-self: center;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 75%);
    background-color: black;
    position: relative;

    &::after {
      content: "";
      width: calc(100% - 4px);
      max-width: 550px;
      height: calc(100% - 4px);
      position: absolute;
      background: #dedede;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 75%);
      z-index: 1;
    }

    .leds {
      position: absolute;
      border-radius: 50%;
      display: flex;
      gap: 15px;
      z-index: 3;
      top: 8px;

      .led {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px black solid;
        background-color: #c12026;
        position: relative;

        &:before {
          content: "";
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #ffffff;
          opacity: 0.5;
          position: absolute;
          right: 50%;
          top: 1px;
        }
      }
    }

    .ledzao {
      position: absolute;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px black solid;
      background-color: #c12026;
      z-index: 3;
      left: 2rem;
      bottom: 8px;

      &:before {
        content: "";
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #ffffff;
        opacity: 0.5;
        position: absolute;
        right: 50%;
        top: 2px;
      }
    }

    input {
      width: 100%;
      max-width: 500px;
      font-size: 2rem;
      padding: 0 0.5rem;
      border-radius: 0.5rem;
      border: 2px solid black;
      background-color: #1d3721;
      z-index: 2;
      font-family: "VT323", monospace;
      color: rgba(227, 227, 227, 0.357);
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        background-color: #51ae5e;

        color: rgb(227, 227, 227);
      }
    }

    .speaker {
      position: absolute;
      width: 30px;
      height: 3px;
      background-color: #000;
      z-index: 3;
      right: 2rem;
      bottom: 8px;

      &:after {
        content: "";
        position: absolute;
        width: 30px;
        height: 3px;
        background-color: #000;
        z-index: 3;
        bottom: 6px;
      }

      &:before {
        content: "";
        position: absolute;
        width: 30px;
        height: 3px;
        background-color: #000;
        z-index: 3;
        bottom: 12px;
      }
    }
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    gap: 2rem;
  }
}
</style>
