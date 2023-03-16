import { createApp } from "vue";
import VueScreen from "vue-screen";
import App from "./app.vue";

createApp(App)
  .use(VueScreen, {
    ssr: {
      width: 800,
      height: 600,
    },
  })
  .mount("#app");
