import { createApp } from 'vue';
import VueScreen from 'vue-screen';

const Test = {
  template: `
  <table>
    <tr v-for="key of gridKeys" :key="key">
      <th>{{ key }}</th>
      <td :class="key">{{ $grid[key] }}</td>
    </tr>
  </table>
  `,
  computed: {
    gridKeys() {
      return Object.keys(this.$grid)
    }
  }
};


createApp({
  components: {
    Test,
  },
  template: '<div id="#app"><Test></Test></div>',
})
  .use(VueScreen, {
    grid: {
      a: 0,
      b: 600,
      c: 1000
    }
  })
  .mount('#app')
