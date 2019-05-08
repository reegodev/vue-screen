<template>
  <div class="device">
    <div class="device-type" ref="device">
      <transition name="fade" mode="out-in" appear @enter="updateDevice">
        <component :is="device"></component>
      </transition>
    </div>

    <div class="breakpoint">{{ breakpoint }}</div>
    
    <Dimension :value="$screen.width" :w="deviceWidth" :h="deviceHeight" />
    <Dimension :value="$screen.height" orientation="v" :w="deviceWidth" :h="deviceHeight" />
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

  data() {
    return {
      deviceWidth: 0,
      deviceHeight: 0,
    }
  },

  mounted() {
    this.updateDevice();
  },

  computed: {
    device() {
      if (this.$screen.xl) {
        return 'Widescreen';
      }

      if (this.$screen.lg && !this.$screen.touch) {
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

  watch: {
    '$screen.width'(current, old) {
      this.updateDevice();
    },
    '$screen.height'(current, old) {
      this.updateDevice();
    },
  },

  methods: {
    updateDevice() {
      this.deviceWidth = this.$screen.landscape && this.$screen.touch ? this.$refs.device.offsetHeight : this.$refs.device.offsetWidth;
      this.deviceHeight = this.$screen.landscape && this.$screen.touch ? this.$refs.device.offsetWidth : this.$refs.device.offsetHeight;
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

    .screen.landscape:not(.md) & {
      width: 60px;
    }
  }

  .device-type {
    transition: transform 0.3s ease-out;

    .can-touch.landscape & {
      transform: rotate(-90deg);
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

    .screen.landscape:not(.md) & {
      font-size: 24px;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s linear, transform 0.25s ease-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: scale(0, 0);
  }
}

</style>
