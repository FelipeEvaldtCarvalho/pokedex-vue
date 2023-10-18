<template>
  <section class="poke-info">
    <div class="btn-container">
      <button class="btn-return" @click="$router.push('/')">
        <ion-icon name="chevron-back-outline"></ion-icon> Return
      </button>
      <div class="btn-controll">
        <button @click="prev">
          <ion-icon name="caret-back-outline"></ion-icon>
        </button>
        <button @click="next">
          <ion-icon name="caret-forward-outline"></ion-icon>
        </button>
      </div>
    </div>
    <div class="info-container">
      <poke-image :pokemon="pokemonData" />
      <div class="info-text">
        <div class="intro-info">
          <h2 class="poke-name">{{ pokemonData.name }}</h2>
          <h2 class="poke-code">#{{ pokemonData.idString }}</h2>
        </div>
        <PokeTypes :types="pokemonData.types" />
        <div class="about">
          <h3>About</h3>
          <p class="description text-center mb-4">
            {{ pokemonData.description || "Ecology under research." }}
          </p>
          <div class="about-items">
            <div class="item about-weight">
              <p class="item-title">Weight</p>
              <p class="item-info">
                <span class="material-icons"> scale </span
                >{{ (pokemonData.weight * 0.1).toFixed(1) }} Kg
              </p>
            </div>
            <div class="item about-height">
              <p class="item-title">Height</p>
              <p class="item-info">
                <span class="material-icons"> square_foot </span
                >{{ (pokemonData.height * 0.1).toFixed(1) }} m
              </p>
            </div>
            <div class="item about-abilities">
              <p class="item-title">Moves</p>
              <div class="moves-container">
                <p
                  class="item-info moves"
                  v-for="(ability, index) in pokemonData.abilities"
                  :key="index"
                >
                  {{ ability.ability.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="d-flex flex-column w-100 gap-3 align-items-center mt-4 stats-container"
    >
      <h3>Base Stats</h3>
      <div class="stat" v-for="(stat, i) in pokemonData.stats" :key="i">
        <div class="stat-text">
          <p class="stat-text-name">{{ stat.stat.name }}</p>
          <p>{{ stat.base_stat }}</p>
        </div>
        <span class="progressbar">
          <div class="progress" role="progressbar">
            <div
              class="progress-bar"
              :style="`width: ${
                stat.stat.name.toUpperCase() == 'HP'
                  ? HPBar
                  : statBar(stat.base_stat)
              }%`"
            ></div>
          </div>
        </span>
      </div>
    </div>
    <div class="d-flex flex-column w-100 gap-3 align-items-center mt-4">
      <h3>Evolutions</h3>
      <PokeEvolutions :evolutions="pokemonData.evolutions" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PokeImage from "./PokeImage.vue";
import PokeEvolutions from "./PokeEvolutions.vue";
import PokeTypes from "./PokeTypes.vue";
export default {
  components: { PokeImage, PokeTypes, PokeEvolutions },
  name: "PokeInfo",
  computed: {
    ...mapGetters({ pokemon: "getPokemon", listLength: "getPokemonsLength" }),
    pokeId() {
      return this.$route.params.id;
    },
    pokemonData() {
      const data = this.pokemon(this.pokeId);
      return data || {};
    },
    HPBar() {
      const maxHP = this.pokemonData.stats[0].base_stat * 2 + 204;
      const baseHP = this.pokemonData.stats[0].base_stat;
      return !maxHP ? 0 : (baseHP / maxHP) * 100;
    },
  },
  methods: {
    prev() {
      const prevNumber = parseInt(this.pokemonData.id) - 1;
      const prevPoke = prevNumber == 0 ? this.listLength : prevNumber;
      return this.$router.push(`/pokemon/${prevPoke}`);
    },
    next() {
      const nextNumber = parseInt(this.pokemonData.id) + 1;
      const nextPoke = nextNumber > this.listLength ? 1 : nextNumber;
      return this.$router.push(`/pokemon/${nextPoke}`);
    },
    statBar(baseStat) {
      const maxStat = (baseStat * 2 + 99) * 1.1;
      return !maxStat ? 0 : (baseStat / maxStat) * 100;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@import "../scss/variables.scss";
.poke-info {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding: 1rem;

  .btn-container {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
    max-width: 1000px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);

    .btn-return {
      border-radius: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      border: 2px black solid;
      cursor: pointer;
      background: #27aafe;
      box-shadow: 0 2px #999;
      font-size: 1.2rem;
      font-weight: 600;

      &:active {
        box-shadow: 0 0px #666;
        transform: translateY(2px);
      }
    }

    .btn-controll {
      display: flex;
      width: 100%;
      justify-content: space-between;

      button {
        border-radius: 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 50px;
        border: 2px black solid;
        cursor: pointer;
        background: #27aafe;
        box-shadow: 0 2px #999;
        font-size: 1.2rem;

        &:active {
          box-shadow: 0 0px #666;
          transform: translateY(2px);
        }
      }
    }
  }
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1000px;
  margin: auto;

  @media (min-width: 1000px) {
    flex-direction: row;
    margin-top: 150px;
    min-width: 1000px;
  }

  .info-text {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (min-width: 1000px) {
      width: 100%;
    }
    .intro-info {
      display: flex;
      flex-direction: column;
      text-align: center;
      text-transform: capitalize;

      @media (min-width: 1000px) {
        flex-direction: row;
        justify-content: center;
        gap: 2rem;
      }

      .poke-code {
        color: gray;
      }
    }

    .about {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      width: 100%;

      .description {
        font-size: 1.1rem;

        @media (min-width: 1000px) {
          font-size: 1.4rem;
        }
      }

      &-items {
        display: flex;
        gap: 0.5rem;
        width: 100%;

        .item {
          width: 33%;
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 0.3rem;
          justify-content: flex-start;
          align-items: center;
          border-right: solid gray 1px;

          .material-icons {
            font-size: 16px;

            @media (min-width: 1000px) {
              font-size: 22px;
            }
          }

          &-title {
            font-size: 16px;
            color: gray;
            font-weight: 600;

            @media (min-width: 1000px) {
              font-size: 20px;
            }
          }

          &-info {
            display: flex;
            align-items: center;
            gap: 0.1rem;
            font-size: 14px;

            @media (min-width: 1000px) {
              font-size: 18px;
            }
          }

          .moves-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            .moves {
              text-transform: capitalize;
            }
          }
          &:last-child {
            border-right: none;
          }
        }
      }
    }
  }
}
.stats-container {
  max-width: 1000px;
  margin: auto;
  .stat {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;

    &-text {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      width: 120px;
      justify-content: end;

      &-name {
        text-align: right;
        text-transform: capitalize;
        font-weight: 600;
        color: gray;
      }
    }
    .progressbar {
      flex-grow: 1;
    }
    .progress {
      border: 1px solid black;
    }
    .progress-bar {
      background-color: #27aafe;
    }
  }
}
</style>
