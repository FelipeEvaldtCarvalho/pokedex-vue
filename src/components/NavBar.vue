<template>
  <nav>
    <div class="fill-left"></div>
    <div class="poke-header">
      <div class="part1">
        <div class="cam-border">
          <div class="cam-lens"></div>
        </div>
        <div class="leds">
          <div class="led led-red"></div>
          <div class="led led-yellow"></div>
          <div class="led led-green"></div>
        </div>
      </div>
    </div>
    <div class="fill-right"></div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  .fill-left {
    display: none;
    height: 115px;
    background-color: red;
    flex-grow: 1;
    border-bottom: 2px black solid;
  }
  .poke-header {
    display: flex;
    .part1 {
      height: 115px;
      width: 300px;
      background-color: black;
      position: relative;
    }
    .part1:before {
      content: "";
      width: 300px;
      height: 113px;
      background: red;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }

    .part1,
    .part1:before {
      -webkit-clip-path: polygon(
        0 0,
        100% 0,
        100% 83%,
        45% 83%,
        33% 100%,
        0 100%
      );
      clip-path: polygon(0 0, 100% 0, 100% 80%, 45% 80%, 33% 100%, 0 100%);
    }

    .cam-border {
      background: black;
      width: 70px;
      height: 70px;
      position: relative;
      top: 25px;
      left: 25px;
      clip-path: circle(50% at 50% 50%);
    }
    .cam-border:before {
      content: "";
      width: 68px;
      height: 68px;
      background: #dedede;
      display: block;
      position: absolute;
      top: 1px;
      left: 1px;
    }

    .cam-border,
    .cam-border:before {
      -webkit-clip-path: circle(50% at 50% 50%);
      clip-path: circle(50% at 50% 50%);
    }

    .cam-lens {
      background: black;

      width: 56px;
      height: 56px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-clip-path: circle(50% at 50% 50%);
      clip-path: circle(50% at 50% 50%);

      &:after {
        content: "";
        width: 12px;
        height: 12px;
        background: #a5d8f5;
        border-radius: 50%;
        left: 40%;
        top: 5px;
        transform: translateX(-50%);
        display: block;
        position: absolute;
      }

      &:before {
        content: "";
        width: 44px;
        height: 44px;
        background: #50a3d9;
        border: 5px #50a3d9 solid;
        border-radius: 50%;
        display: block;
        position: absolute;
        top: 1px;
        left: 1px;
        box-shadow: inset 0px 10px 1px 1px #0000003f;
        transform: rotate(200deg);
      }
    }
    .leds {
      display: flex;
      position: absolute;
      top: 15px;
      left: 150px;
      gap: 15px;

      .led {
        width: 15px;
        height: 15px;
        position: relative;
        border: 1px black solid;
        border-radius: 50%;

        &:before {
          content: "";
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ffffff;
          opacity: 0.5;
          position: absolute;
          right: 50%;
          top: 2px;
        }

        &-red {
          background: #c12026;
        }
        &-yellow {
          background: #fddf0b;
        }
        &-green {
          background: #336d3b;
        }
      }
    }
  }
  .fill-right {
    height: 92px;
    background-color: red;
    flex-grow: 1;
    flex-grow: 1;
    border-bottom: 1.99px black solid;
  }
}
</style>
