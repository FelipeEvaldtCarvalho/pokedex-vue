<template>
  <div class="loading">
    <img src="../assets/loading.gif" alt="" />
    <h1>Loading...</h1>
  </div>
</template>

<script>
export default {
  name: "PokeLoading",
};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  img {
    width: 90px;
  }
}
</style>
