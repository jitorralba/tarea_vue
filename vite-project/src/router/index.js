import { createRouter, createWebHistory} from 'vue-router'
import Home from '../components/Home.vue'
import Detail from '../components/Detail.vue'

const routes = [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: Detail,
    }
  ];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;