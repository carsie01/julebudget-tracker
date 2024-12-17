import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import BudgetTracker from '../views/BudgetTracker.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/budget-tracker', name: 'BudgetTracker', component: BudgetTracker },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
