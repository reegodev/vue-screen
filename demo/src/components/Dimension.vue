<template>
  <div class="dimension" :class="orientation">
    <div class="line"></div>
    <span class="value">{{ value }}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    orientation: {
      type: String,
      default() {
        return 'h';
      }
    },
  }
}
</script>

<style lang="scss">
.dimension {
  font-size: 18px;
  font-weight: 700;
  position: absolute;

  .line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #38454f;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: -10px;
      height: 23px;
      background-color: #38454f;
      width: 3px;
    }

    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: -10px;
      height: 23px;
      background-color: #38454f;
      width: 3px;
    }
  }

  .value {
    background-color: #38454f;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    position: relative;
  }

  &.h {
    top: 100%;
    left: 0;
    right: 0;
    text-align: center;
    padding: 20px 0;
  }

  &.v {
    top: 0;
    left: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0 20px;

    .line {
      top: 0;
      bottom: 0;
      left: 50%;
      height: auto;
      width: 3px;

      &:before, &:after {
        transform: rotate(90deg);
      }

      &:after {
        bottom: -10px;
        top: auto;
      }
    }
  }
}
</style>
