import { createApp } from "vue";
import VueScreen from "vue-screen";
import App from "./app.vue";

createApp(App)
  .use(VueScreen, 'bootstrap4')
  .mount("#app");
