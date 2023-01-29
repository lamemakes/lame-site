import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Defining global vars
const HOST = "https://lamemakes.com";

app.provide("host", HOST);

app.use(router);

app.mount("#app");
