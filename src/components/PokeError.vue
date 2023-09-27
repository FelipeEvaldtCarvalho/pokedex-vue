<template>
  <div class="error">
    <img src="../assets/error.gif" alt="" />
    <div class="error-content">
      <h1>Oops!</h1>
      <h2>Sorry! Something went wrong</h2>
      <button @click="tryAgain">Try again</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PokeError",
  methods: {
    ...mapActions({ tryAgain: "fetchPokemons" }),
  },
};
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  align-items: center;
  gap: 1rem;

  &-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    width: auto;
    text-align: center;
    background-color: rgb(255, 153, 153);
    border-radius: 2rem;
    padding: 2rem;
    margin: 0 1rem;

    button {
      border-radius: 1rem;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      padding: 1rem;
      background: #fff;
      transition: 0.6s all ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
