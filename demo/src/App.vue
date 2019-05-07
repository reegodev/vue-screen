<template>
  <div id="app" class="screen" :class="media" :style="{height: `${$screen.height}px`}">
    <Description/>
    <Device/>
    <Credits/>
    <Feed ref="feed"/>
  </div>
</template>

<script>
import Description from './components/Description.vue'
import Device from './components/Device.vue'
import Feed from './components/Feed.vue'
import Credits from './components/Credits.vue'

export default {
  name: 'app',

  components: {
    Description,
    Device,
    Feed,
    Credits,
  },

  computed: {
    media() {
      return {
        sm: this.$screen.sm,
        md: this.$screen.md,
        lg: this.$screen.lg,
        xl: this.$screen.xl,
      }
    },
  },

  watch: {
    '$screen.width'(current, old) {
      this.addResizeEvent('Width', current, old);
    },
    '$screen.height'(current, old) {
      this.addResizeEvent('Height', current, old);
    },
    '$screen.sm'(active) {
      this.addBreakpointEvent('SM', active);
    },
    '$screen.md'(active) {
      this.addBreakpointEvent('MD', active);
    },
    '$screen.lg'(active) {
      this.addBreakpointEvent('LG', active);
    },
    '$screen.xl'(active) {
      this.addBreakpointEvent('XL', active);
    },
  },

  methods: {
    addBreakpointEvent(breakpoint, active) {
      this.$refs.feed.add(`Breakpoint ${active ? 'entered' : 'left'}: ${breakpoint}`);
    },
    addResizeEvent(property, current, old) {
      this.$refs.feed.add(`${property} changed: ${old} → ${current}`);
    }
  }
}
</script>

<style lang="scss">

.screen {
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #fbafaf;
  padding: 15px;
  transition: background-color 0.3s ease-out;
  overflow: hidden;

  .description a {
    background-color: #d86767;
  }

  &.sm {
    background-color: #f2c6b4;

    .description a {
      background-color: #d46b40;
    }
  }

  &.md {
    background-color: #f3e8cb;

    .description a {
      background-color: #bfa152;
    }
  }

  &.lg {
    background-color: #bbe7f5;

    .description a {
      background-color: #42a9bb;
    }
  }

  &.xl {
    background-color: #abbeea;

    .description a {
      background-color: #516eb1;
    }
  }
}
</style>
