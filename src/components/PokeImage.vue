<template>
  <div class="screen">
    <div :class="`bg bg-${pokemon.type}`">
      <img
        class="poke-img"
        draggable="false"
        :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.idString}.png`"
        :alt="`${pokemon.name}-image`"
      />
    </div>
    <div class="leds">
      <span class="led"></span>
      <span class="led"></span>
    </div>
    <div class="ledzao"></div>
    <div class="speaker"></div>
  </div>
</template>

<script>
export default {
  name: "PokeImage",
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@import "../scss/variables.scss";
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
      user-select: none;
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
</style>
