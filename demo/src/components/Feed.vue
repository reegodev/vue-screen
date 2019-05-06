<template>
  <div class="feed">
    <transition-group name="list" tag="ul">
      <li v-for="event of events" :key="event.id">{{ event.message }}</li>
    </transition-group>
  </div>
</template>

<script>
export default {
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
}
</script>

<style lang="scss">
.feed {
 position: fixed;
 top: 0;
 right: 0;

  ul {
    padding: 15px;

    li {
      background-color: #38454f;
      padding: 15px;
      color: #fff;
      min-width: 200px;
      max-width: 100%;
      font-size: 12px;
      margin-top: 5px;
      border-radius: 3px;
    }
  }
}

.list-enter-active, .list-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30%);
}

</style>
