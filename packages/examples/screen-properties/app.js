import { createApp } from 'vue';
import VueScreen from 'vue-screen';

const Test = {
  template: `
  <table>
    <tr v-for="key of screenKeys" :key="key">
      <th>{{ key }}</th>
      <td :class="key">{{ $screen[key] }}</td>
    </tr>
  </table>
  `,
  computed: {
    screenKeys() {
      return Object.keys(this.$screen)
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
    screen: {
      
    }
  })
  .mount('#app')
