import { createRouter, createWebHistory } from 'vue-router';

// Importer dine komponenter
import Home from '../views/Home.vue';


// Definer ruterne
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/budget',
    name: 'BudgetPage',
    component: BudgetPage,
  },
];

// Opret router-objektet
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
