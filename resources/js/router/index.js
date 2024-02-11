// src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import Resume from '../views/Resume.vue';
import Pdf from '../views/Pdf.vue';

const routes = [
  {
    path: '/',
    name: 'Resume',
    component: Resume
  },
  {
    path: '/pdf',
    name: 'PDF',
    component: Pdf
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
