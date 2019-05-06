<template>
  <div class="device">
    <transition name="fade" mode="out-in">
      <component :is="device"></component>
    </transition>

    <div class="breakpoint">{{ breakpoint }}</div>
    
    <Dimension :value="$screen.width" />
    <Dimension :value="$screen.height" orientation="v" />
  </div>
</template>

<script>
import Dimension from './Dimension.vue'
import Phone from './devices/Phone.vue'
import Tablet from './devices/Tablet.vue'
import Desktop from './devices/Desktop.vue'
import Widescreen from './devices/Widescreen.vue'

export default {
  components: {
    Dimension,
    Phone,
    Tablet,
    Desktop,
    Widescreen,
  },

  computed: {
    device() {
      if (this.$screen.xl) {
        return 'Widescreen';
      }

      if (this.$screen.lg) {
        return 'Desktop';
      }

      if (this.$screen.md) {
        return 'Tablet';
      }

      return 'Phone';
    },
    breakpoint() {
      if (this.$screen.xl) {
        return 'xl';
      }

      if (this.$screen.lg) {
        return 'lg';
      }

      if (this.$screen.md) {
        return 'md';
      }

      if (this.$screen.sm) {
        return 'sm';
      }

      return 'xs';
    },
  },
}
</script>

<style lang="scss">
.device {
  position: relative;

  svg {
    display: block;

    .screen:not(.sm) & {
      width: 140px;
    }
  }

  .breakpoint {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    font-size: 34px;
    text-transform: uppercase;
    transform: translate(-50%, -50%);

    .xl & {
      transform: translate(-50%, -180%);
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s linear;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}

</style>
