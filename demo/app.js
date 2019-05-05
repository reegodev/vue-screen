Vue.component('Screen', {
  template: '#screen',
  computed: {
    media() {
      return {
        sm: this.$screen.sm,
        md: this.$screen.md,
        lg: this.$screen.lg,
        xl: this.$screen.xl,
      }
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
    device() {
      if (this.$screen.xl) {
        return 'WideScreen';
      }

      if (this.$screen.lg) {
        return 'Desktop';
      }

      if (this.$screen.md) {
        return 'Tablet';
      }

      return 'Phone';
    }
  },
  watch: {
    '$screen.width'() {
      this.$refs.feed.add('Width changed');
    },
    '$screen.height'() {
      this.$refs.feed.add('Height changed');
    },
    '$screen.sm'(current) {
      this.$refs.feed.add(`Breakpoint ${current ? 'entered' : 'left'}: SM`);
    },
    '$screen.md'(current) {
      this.$refs.feed.add(`Breakpoint ${current ? 'entered' : 'left'}: MD`);
    },
    '$screen.lg'(current) {
      this.$refs.feed.add(`Breakpoint ${current ? 'entered' : 'left'}: LG`);
    },
    '$screen.xl'(current) {
      this.$refs.feed.add(`Breakpoint ${current ? 'entered' : 'left'}: XL`);
    },
  },
});

Vue.component('Feed', {
  template: '#feed',
  data() {
    return {
      events: [],
    };
  },
  methods: {
    add(message) {
      this.events.unshift({
        message,
        id: Date.now(),
      });
      setTimeout(() => this.events.pop(), 3000);
    },
  },
});

Vue.component('Phone', {
  template: '#phone',
});

Vue.component('Tablet', {
  template: '#tablet',
});

Vue.component('Desktop', {
  template: '#desktop'
});

Vue.component('WideScreen', {
  template: '#widescreen',
});

Vue.component('Github', {
  template: '#github',
})

new Vue({
  el: '#app',
});
