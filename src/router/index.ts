import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterUser from "@/views/RegisterUser.vue";
import LoginUser from "@/views/LoginUser.vue";
import ProfileUser from "@/views/ProfileUser.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
