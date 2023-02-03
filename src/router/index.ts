import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: () => {
        return { name: "projects" };
      },
    },
    {
      path: "/projects/:projectId?/",
      name: "projects",
      component: () => import("../views/LameProjects.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/LameAbout.vue"),
    },
    {
      path: "/pics/:picName?",
      name: "pics",
      component: () => import("../views/LamePics.vue"),
    },
    {
      path: "/music",
      name: "music",
      component: () => import("../views/LameMusic.vue"),
    },
    {
      path: "/404",
      name: "notFound",
      component: () => import("../views/Lame404.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: () => {
        return { name: "notFound" };
      },
    },
  ],
});

export default router;
