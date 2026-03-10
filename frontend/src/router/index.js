import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import EmployeeDashboard from '../views/EmployeeDashboard.vue';
import EmployerDashboard from '../views/EmployerDashboard.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login, meta: { guest: true } },
  { path: '/signup', name: 'Signup', component: Signup, meta: { guest: true } },
  {
    path: '/employee',
    name: 'EmployeeDashboard',
    component: EmployeeDashboard,
    meta: { requiresAuth: true, role: 'employee' },
  },
  {
    path: '/employer',
    name: 'EmployerDashboard',
    component: EmployerDashboard,
    meta: { requiresAuth: true, role: 'employer' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (to.meta.requiresAuth && !user) {
    return next('/login');
  }

  if (to.meta.guest && user) {
    return next(user.role === 'employer' ? '/employer' : '/employee');
  }

  if (to.meta.role && user && user.role !== to.meta.role) {
    return next(user.role === 'employer' ? '/employer' : '/employee');
  }

  next();
});

export default router;
