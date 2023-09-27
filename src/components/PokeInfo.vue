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
      <div class="screen">
        <div :class="`bg bg-${pokemon(pokeId).type}`">
          <img
            class="poke-img"
            draggable="false"
            :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
              pokemon(pokeId).idString
            }.png`"
            :alt="`${pokemon(pokeId).name}-image`"
          />
        </div>
        <div class="leds">
          <span class="led"></span>
          <span class="led"></span>
        </div>
        <div class="ledzao"></div>
        <div class="speaker"></div>
      </div>
      <div class="info-text">
        <div class="intro-info">
          <h2 class="poke-name">{{ pokemon(pokeId).name }}</h2>
          <h2 class="poke-code">#{{ pokemon(pokeId).idString }}</h2>
        </div>
        <div class="types">
          <span
            v-for="({ type }, index) in pokemon(pokeId).types"
            :key="index"
            :class="`type type-${type.name}`"
            ><p>{{ type.name }}</p></span
          >
        </div>
        <div class="about">
          <h3>About</h3>
          <div class="about-items">
            <div class="item about-weight">
              <p>Weight</p>
              <span
                ><ion-icon name="scale-sharp"></ion-icon>
                {{ (pokemon(pokeId).weight * 0.1).toFixed(1) }} Kg</span
              >
            </div>
            <div class="item about-height">
              {{ pokemon(pokeId).height }}
            </div>
            <div class="item about-abilities">
              <p
                v-for="(ability, index) in pokemon(pokeId).abilities"
                :key="index"
              >
                {{ ability.ability.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PokeInfo",

  computed: {
    ...mapGetters({ pokemon: "getPokemon", listLength: "getPokemonsLength" }),
    pokeId() {
      return this.$route.params.id;
    },
  },
  methods: {
    prev() {
      const prevNumber = parseInt(this.pokemon(this.pokeId).id) - 1;
      const prevPoke = prevNumber == 0 ? this.listLength : prevNumber;
      return this.$router.push(`/pokemon/${prevPoke}`);
    },
    next() {
      const nextNumber = parseInt(this.pokemon(this.pokeId).id) + 1;
      const nextPoke = nextNumber > this.listLength ? 1 : nextNumber;
      return this.$router.push(`/pokemon/${nextPoke}`);
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
.screen {
  margin-top: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1/1;
  max-width: 300px;
  padding: 2rem;
  align-self: center;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 90%);
  background-color: black;
  position: relative;
  border-radius: 0.2rem;

  &::after {
    content: "";
    width: calc(100% - 4px);
    max-width: 550px;
    height: calc(100% - 4px);
    position: absolute;
    background: #dedede;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 90%);
    z-index: 1;
    border-radius: 0.2rem;
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
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px black solid;
    background-color: #c12026;
    z-index: 3;
    left: 3rem;
    bottom: 5px;

    box-shadow: inset 0px 5px 1px 1px #0000003f;
    transform: rotate(200deg);

    &:before {
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #ffffff;
      opacity: 0.5;
      position: absolute;
      left: 65%;
      bottom: 4px;
    }
  }

  .bg {
    width: 100%;
    max-width: 500px;
    background: black;
    position: relative;
    border: 2px solid black;
    border-radius: 0.2rem;
    z-index: 4;

    &:before {
      position: absolute;
      content: "";
      width: 100%;
      height: 40%;
      bottom: 0;
      z-index: 5;
      background: black;
      opacity: 0.2;
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
    }

    @each $type, $color in $types {
      &-#{$type} {
        background-color: $color;
      }
    }

    .poke-img {
      width: 100%;
      z-index: 6;
      position: relative;
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

.info-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .info-text {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    .intro-info {
      display: flex;
      flex-direction: column;
      text-align: center;
      text-transform: capitalize;

      .poke-code {
        color: gray;
      }
    }
    .types {
      display: flex;
      gap: 2rem;
      width: 100%;
      justify-content: center;
      text-transform: capitalize;

      .type {
        padding: 0.5rem 1.5rem;
        border-radius: 2rem;
        position: relative;
        overflow: hidden;
        transition: 0.2s all ease;

        &:hover {
          transform: scale(1.05);
        }

        p {
          position: relative;
          z-index: 2;
          font-weight: 600;
        }

        &:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 50%;
          background: black;
          opacity: 0.2;
          z-index: 1;
          right: 0;
          bottom: 0;
          border-radius: 2rem;
        }
      }

      @each $type, $color in $types {
        .type-#{$type} {
          background-color: $color;
          color: map.get($types-font, $type);
        }
      }
    }

    .about {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      width: 100%;

      &-items {
        display: flex;
        gap: 0.5rem;
        width: 100%;

        .item {
          width: 33%;
        }
      }

      &- {
      }
    }
  }
}
</style>
