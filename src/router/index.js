import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LameAbout.vue"),
  },
  {
    path: "/:projectName?/",
    name: "projects",
    component: () => import("../views/LameProjects.vue"),
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
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
