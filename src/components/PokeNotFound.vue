<template>
  <div class="error">
    <img src="../assets/404.gif" alt="" />
    <div class="error-content">
      <h1>Oops!</h1>
      <h2>Sorry! Nothing found here!</h2>
    </div>
  </div>
</template>

<script>
export default { name: "PokeNotFound" };
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
    gap: 0.5rem;
    align-items: center;
    width: auto;
    text-align: center;
    background-color: rgb(171, 103, 255);
    border-radius: 2rem;
    padding: 2rem;
    margin: 0 1rem;

    h1 {
      font-size: 2rem;
    }

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
