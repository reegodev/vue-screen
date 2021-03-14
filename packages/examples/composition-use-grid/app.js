import { createApp, computed } from 'vue';
import { useGrid } from 'vue-screen';

const Test = {
  template: `
  <table>
    <tr v-for="key of gridKeys" :key="key">
      <th>{{ key }}</th>
      <td :class="key">{{ grid[key] }}</td>
    </tr>
  </table>
  `,
  setup() {
    const grid = useGrid('tailwind')

    const gridKeys = computed(() => {
      return Object.keys(grid)
    })

    return {
      grid,
      gridKeys,
    }
  }
};

createApp({
  components: {
    Test,
  },
  template: '<div id="#app"><Test></Test></div>',
}).mount('#app')
