<template>
  <section class="poke-view">
    <Transition name="fade" mode="out-in">
      <pokeLoading v-if="load" />
      <PokeError v-else-if="error && !load" />
      <PokeInfo v-else />
    </Transition>
  </section>
</template>

<script>
import PokeError from "@/components/PokeError.vue";
import PokeLoading from "@/components/PokeLoading.vue";
import PokeInfo from "@/components/PokeInfo.vue";
import { mapGetters } from "vuex";
export default {
  components: { PokeInfo, PokeLoading, PokeError },
  name: "PokeView",
  computed: {
    ...mapGetters({
      load: "getHomeLoading",
      error: "getPokemonsError",
    }),
  },
};
</script>

<style lang="scss" scoped>
.poke-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 80vh;
}
</style>
