import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Card from "./shared/components/UIElements/Card.vue";
import Avatar from "./shared/components/UIElements/Avatar.vue";
import TheButton from "./shared/components/FormElements/TheButton.vue";
import TheModal from "./shared/components/UIElements/Modal.vue";
import TheBackdrop from "./shared/components/UIElements/Backdrop.vue";
import Input from "./shared/components/FormElements/Input.vue";
import ErrorModal from "./shared/components/UIElements/ErrorModal.vue";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner.vue";

const app = createApp(App);

app.component("the-card", Card);
app.component("the-avatar", Avatar);
app.component("the-button", TheButton);
app.component("the-modal", TheModal);
app.component("the-backdrop", TheBackdrop);
app.component("the-input", Input);
app.component("the-error-modal", ErrorModal);
app.component("the-loading-spinner", LoadingSpinner);

app.use(store);
app.use(router).mount("#app");
