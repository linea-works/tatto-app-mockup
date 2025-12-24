import { createRouter, createWebHistory } from "vue-router";
import EntryView from "../views/EntryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "entry",
      component: EntryView,
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/register-success",
      name: "register-success",
      component: () => import("../views/RegisterSuccessView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/profile/edit",
      name: "profile-edit",
      component: () => import("../views/EditProfileView.vue"),
    },
    {
      path: "/booking/:id",
      name: "booking-detail",
      component: () => import("../views/BookingDetailView.vue"),
    },
    {
      path: "/booking",
      name: "booking",
      component: () => import("../views/BookingView.vue"),
    },
    {
      path: "/booking-confirm",
      name: "booking-confirm",
      component: () => import("../views/BookingConfirmView.vue"),
    },
    {
      path: "/booking-success",
      name: "booking-success",
      component: () => import("../views/BookingSuccessView.vue"),
    },
    {
      path: "/admin/login",
      name: "admin-login",
      component: () => import("../views/AdminLoginView.vue"),
    },
    {
      path: "/admin/dashboard",
      name: "admin-dashboard",
      component: () => import("../views/AdminDashboardView.vue"),
    },
  ],
});

export default router;
