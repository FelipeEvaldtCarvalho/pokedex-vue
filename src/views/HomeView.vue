<template>
  <section>
    <Transition name="fade" mode="out-in">
      <pokeLoading v-if="load" />
      <PokeError v-else-if="error && !load" />
      <PokeList v-else />
    </Transition>
  </section>
</template>

<script>
import PokeError from "@/components/PokeError.vue";
import PokeLoading from "@/components/PokeLoading.vue";
import PokeList from "@/components/PokeList.vue";
import { mapGetters } from "vuex";
export default {
  name: "HomeView",
  computed: {
    ...mapGetters({
      load: "getHomeLoading",
      error: "getPokemonsError",
    }),
  },
  components: { PokeError, PokeLoading, PokeList },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 115px);
}
</style>
