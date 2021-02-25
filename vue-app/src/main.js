import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Card from './shared/components/UIElements/Card.vue'
import Avatar from './shared/components/UIElements/Avatar.vue'


const app = createApp(App)

app.component('the-card', Card)
app.component('the-avatar', Avatar)

app.use(store)
app.use(router)

  .mount("#app");
