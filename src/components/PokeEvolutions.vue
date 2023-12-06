<template>
  <div class="poke-evolutions" v-if="evolutions">
    <div class="evolutions" v-for="(pokemon, index) in evolutions" :key="index">
      <div class="img-container" @click="selectPokemon(pokemon)">
        <img
          draggable="false"
          :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatId(
            +pokemon.id
          )}.png`"
          :alt="`${pokemon.name}-image`"
        />
      </div>
      <p
        class="text-center text-capitalize fs-4 fw-semibold"
        style="color: gray"
      >
        {{ pokemon.name }}
      </p>
      <p class="text-center">#{{ formatId(+pokemon.id) }}</p>
    </div>
  </div>
</template>

<script>
import { formatId } from "../services/helper";
export default {
  name: "PokeEvolutions",
  props: {
    evolutions: {
      default: false,
    },
  },
  methods: {
    formatId,
    selectPokemon(pokemon) {
      if (this.$route.params.id == pokemon.id) {
        return window.scrollTo(0, 0);
      }
      this.$router.push(`/pokemon/${pokemon.id}`);
      return window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped lang="scss">
.poke-evolutions {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1000px) {
    max-width: 1000px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4rem;
  }

  .evolutions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .img-container {
      position: relative;
      width: 150px;
      aspect-ratio: 1/1;
      border: 4px solid black;
      border-radius: 50%;
      overflow: hidden;
      background-color: gray;
      transition: 0.6s all ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }

      img {
        position: absolute;
        width: 120%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
