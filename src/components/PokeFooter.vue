<template>
  <footer>
    <div class="triangle"></div>
  </footer>
</template>

<script>
export default {
  name: "PokeFooter",
};
</script>

<style lang="scss" scoped>
footer {
  margin-top: 100px;
  display: flex;
  height: 100px;
  width: 100%;
  background-color: red;
  border-top: 2px black solid;
  position: relative;
  .triangle {
    clip-path: polygon(0 0, 0 100%, 100% 50%);
    background-color: black;
    width: 30px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);

    &::after {
      content: "";
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      position: absolute;
      background: yellow;
      clip-path: polygon(0 0, 0 100%, 100% 50%);
      z-index: 1;
      top: 50%;
      left: 50%;
      transform: translate(-52%, -50%);
    }
  }
}
</style>
