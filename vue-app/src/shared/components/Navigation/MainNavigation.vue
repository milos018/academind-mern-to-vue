<template>
  <teleport to="body">
    <backdrop v-if="drawerIsOpen" @click="closeDrawer"></backdrop>
  </teleport>
  <side-drawer v-if="drawerIsOpen">
    <nav class="main-navigation__drawer-nav">
      <nav-links @click="closeDrawer"></nav-links>
    </nav>
  </side-drawer>
  <main-header>
    <button className="main-navigation__menu-btn" @click="openDrawer">
      <span />
      <span />
      <span />
    </button>
    <h1 class="main-navigation__title">
      <router-link to="/">Your Places</router-link>
    </h1>
    <nav class="main-navigation__header-nav">
      <nav-links></nav-links>
    </nav>
  </main-header>
</template>

<script>
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import NavLinks from "./NavLinks";
import Backdrop from "../UIElements/Backdrop";

export default {
  components: {
    MainHeader,
    SideDrawer,
    NavLinks,
    Backdrop
  },
  data() {
    return {
      drawerIsOpen: false
    };
  },
  methods: {
    openDrawer() {
      this.drawerIsOpen = true;
    },
    closeDrawer() {
      this.drawerIsOpen = false;
    }
  }
};
</script>

<style>
.main-navigation__menu-btn {
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 2rem;
  cursor: pointer;
}

.main-navigation__menu-btn span {
  display: block;
  width: 3rem;
  height: 2.5px;
  background: white;
}

.main-navigation__title {
  color: white;
}

.main-navigation__title a {
  text-decoration: none;
  color: white;
}

.main-navigation__header-nav {
  display: none;
}

.main-navigation__drawer-nav {
  height: 100%;
}

@media (min-width: 768px) {
  .main-navigation__menu-btn {
    display: none;
  }

  .main-navigation__header-nav {
    display: block;
  }
}
</style>
