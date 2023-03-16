import { createApp } from "vue";
import VueScreen from "vue-screen";
import App from "./app.vue";

createApp(App)
  .use(VueScreen, {
    grid: {
      a: 0,
      b: 600,
      c: 1000
    }
  })
  .mount("#app");
