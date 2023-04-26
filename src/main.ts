import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import { IonicVue } from "@ionic/vue";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Custom SASS Markup */
import "./css/style.css";

/* Import and Create our Users Store */
import { useAuth } from "./store/auth";

const pinia = createPinia();

const app = createApp(App);

app.use(IonicVue);
app.use(pinia);
const auth = useAuth();
app.use(router);

// router.isReady().then(() => {
app.mount("#app");
defineCustomElements(window);
// });
