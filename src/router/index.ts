import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LandingEditor from "@/views/LandingEditor.vue";
import ReadOnlyBin from "@/views/ReadOnlyBin.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "landing",
    component: LandingEditor,
  },
  {
    path: "/:id",
    component: ReadOnlyBin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
