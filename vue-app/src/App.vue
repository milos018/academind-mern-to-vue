<template>
  <main-navigation></main-navigation>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import { useStore } from "vuex";
import MainNavigation from "./shared/components/Navigation/MainNavigation.vue";

export default {
  components: { MainNavigation },
  setup() {
    const store = useStore();

    if (localStorage.getItem("userData")) {
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (
        new Date(userData.tokenExpiration).toUTCString() >
        new Date().toUTCString()
      ) {
        store.dispatch("login", userData);
      } else {
        store.dispatch("logout");
      }
    }

    return {};
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Open Sans", sans-serif;
}

body {
  margin: 0;
  background: #4d4d4d;
}

.slide-in-left-enter {
  transform: translateX(-100%);
}

.slide-in-left-enter-active {
  transform: translateX(0);
  opacity: 1;
  transition: all 200ms;
}

.slide-in-left-exit {
  transform: translateX(0%);
  opacity: 1;
}

.slide-in-left-exit-active {
  transform: translateX(-100%);
  opacity: 0;
  transition: all 200ms;
}

.center {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
