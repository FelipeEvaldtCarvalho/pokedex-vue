<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import NavBar from "./components/NavBar.vue";
export default {
  methods: {
    ...mapActions(["fetchPokemons"]),
  },
  mounted() {
    this.fetchPokemons();
  },
  components: { NavBar },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@100;200;300;400;500;600;700;800;900&display=swap");

* {
  font-family: "Montserrat Alternates", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
p {
  margin: 0;
}
body {
  min-height: 100vh;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #212121;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
