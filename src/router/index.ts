import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // /search/screens -> /search?q=screens
      path: "/",
      redirect: () => {
        // the function receives the target route as the argument
        // we return a redirect path/location here.
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
  ],
});

export default router;
