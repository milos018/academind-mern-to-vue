import { createRouter, createWebHistory } from "vue-router";
import Users from "./user/pages/Users.vue";

const routes = [
  {
    path: "/",
    name: "Users",
    component: Users
  },
  {
    path: "/places/new",
    name: "NewPlace",
    component: () =>
      import(/* webpackChunkName: "new-place" */ "./places/pages/NewPlace.vue")
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
    path: "/places/:placeId",
    name: "Updateplace",
    component: () =>
      import(
        /* webpackChunkName: "update-place" */ "./places/pages/UpdatePlace.vue"
      )
  },
  {
    path: "/auth",
    name: "Auth",
    component: () =>
      import(/* webpackChunkName: "auth" */ "./user/pages/Auth.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
