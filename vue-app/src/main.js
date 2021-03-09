import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Card from "./shared/components/UIElements/Card.vue";
import Avatar from "./shared/components/UIElements/Avatar.vue";
import TheButton from "./shared/components/FormElements/TheButton.vue";
import TheModal from "./shared/components/UIElements/Modal.vue";
import TheBackdrop from "./shared/components/UIElements/Backdrop.vue";

const app = createApp(App);

app.component("the-card", Card);
app.component("the-avatar", Avatar);
app.component("the-button", TheButton);
app.component("the-modal", TheModal);
app.component("the-backdrop", TheBackdrop);

app.use(store);
app.use(router).mount("#app");
