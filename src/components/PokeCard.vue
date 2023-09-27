<template>
  <div
    @click="$router.push(`/pokemon/${pokemon.id}`)"
    :class="`poke-card poke-card-${pokemon.type}`"
  >
    <img
      draggable="false"
      :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.idString}.png`"
      :alt="`${info.name}-image`"
    />
    <h2 class="name">{{ pokemon.name }}</h2>
    <h2 class="poke-id">#{{ pokemon.idString }}</h2>
  </div>
</template>

<script>
export default {
  name: "PokeCard",
  data() {
    return {
      info: {},
    };
  },
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
.poke-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  aspect-ratio: 1/1;
  border-radius: 1rem;
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: 0.6s ease all;

  &:hover {
    transform: scale(1.05);
  }

  .name {
    position: absolute;
    bottom: 1rem;
    text-transform: capitalize;
    z-index: 3;
  }
  .poke-id {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 3;
  }

  img {
    z-index: 3;
    width: 80%;
  }

  @each $type, $color in $types {
    &-#{$type} {
      background-color: $color;
      color: map.get($types-font, $type);
    }
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 50%;
    bottom: 0;
    background: black;
    opacity: 0.2;
    border-radius: 1rem;
    z-index: 2;
  }
}
</style>
