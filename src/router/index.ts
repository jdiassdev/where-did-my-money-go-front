import { createRouter, createWebHistory } from "vue-router";
import HomePublic from "../views/HomePublic.vue";
import RegisterUser from "@/views/RegisterUser.vue";
import LoginUser from "@/views/LoginUser.vue";
import ProfileUser from "@/views/ProfileUser.vue";
import TransactionMenu from "@/views/TransactionMenu.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home-public",
      component: HomePublic,
    },
    {
      path: "/transaction-menu",
      name: "transaction-menu",
      component: TransactionMenu,
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
  const isAuth = Boolean(localStorage.getItem("token"));

  if (to.meta.requiresAuth && !isAuth) {
    return { name: "login" };
  }

  if (isAuth && (to.name === "login" || to.name === "register")) {
    return { name: "transaction-menu" };
  }
});

export default router;
