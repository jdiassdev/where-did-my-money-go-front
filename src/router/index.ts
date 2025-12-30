import { createRouter, createWebHistory } from "vue-router";
import HomePublic from "../views/HomePublic.vue";
import RegisterUser from "@/views/RegisterUser.vue";
import LoginUser from "@/views/LoginUser.vue";
import ProfileUser from "@/views/ProfileUser.vue";
import HomeApp from "@/views/HomeApp.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home-public",
      component: HomePublic,
    },
    {
      path: "/app",
      name: "home-app",
      component: HomeApp,
      meta: { requiresAuth: true },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterUser,
    },
    {
      path: "/login",
      name: "login",
      component: LoginUser,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileUser,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to) => {
  const isAuth = !!localStorage.getItem("token");
  // path: "/login",
  // name: "login",
  // component: LoginUser,
  // meta: { requiresAuth: true },

  if (to.meta.requiresAuth && !isAuth) {
    return "/login";
  }
});

export default router;
