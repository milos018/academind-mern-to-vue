import { createRouter, createWebHistory } from "vue-router";
import Users from "./users/pages/Users.vue";

const routes = [
  {
    path: "/",
    name: "Users",
    component: Users
  },
  {
    path: "/:userId/places",
    name: "UserPlaces",
    component: () =>
      import(
        /* webpackChunkName: "user-places" */ "./places/pages/UserPlaces.vue"
      )
  },
  {
    path: "/places/new",
    name: "NewPlace",
    component: () =>
      import(/* webpackChunkName: "new-place" */ "./places/pages/NewPlace.vue")
  },
  {
    path: "/auth",
    name: "Auth",
    component: () =>
      import(/* webpackChunkName: "auth" */ "./auth/pages/Auth.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
