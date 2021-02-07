import { createApp, computed } from 'vue';
import { useScreen } from 'vue-screen';

const Test = {
  template: `
  <table>
    <tr v-for="key of screenKeys" :key="key">
      <th>{{ key }}</th>
      <td :class="key">{{ screen[key] }}</td>
    </tr>
  </table>
  `,
  setup() {
    const screen = useScreen()

    const screenKeys = computed(() => {
      return Object.keys(screen)
    })

    return {
      screen,
      screenKeys,
    }
  }
};

createApp({
  components: {
    Test,
  },
  template: '<div id="#app"><Test></Test></div>',
}).mount('#app')
