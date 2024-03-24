import { createApp } from "vue";
import VueScreen from "vue-screen";
import App from "./app.vue";

createApp(App)
  .use(VueScreen)
  .mount("#app");
