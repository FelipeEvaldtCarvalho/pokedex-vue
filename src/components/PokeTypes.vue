<template>
  <div class="types">
    <span
      v-for="({ type }, index) in types"
      :key="index"
      :class="`type type-${type.name}`"
      ><p>{{ type.name }}</p></span
    >
  </div>
</template>

<script>
export default {
  name: "PokeTypes",
  props: {
    types: {
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@import "../scss/variables.scss";
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
      margin: 0;
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
</style>
