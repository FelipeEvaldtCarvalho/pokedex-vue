<template>
  <section class="poke-view">
    <PokeInfo />
  </section>
</template>

<script>
import PokeInfo from "@/components/PokeInfo.vue";
export default {
  components: { PokeInfo },
  name: "PokeView",
};
</script>

<style lang="scss" scoped>
.poke-view {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
