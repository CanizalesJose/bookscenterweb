import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import LogoutView from '../views/LogoutView.vue';
import CatalogView from '../views/CatalogView.vue';
import UsersAdminView from '../views/UsersAdminView.vue';
import AuthorAdminView from '../views/AuthorAdminView.vue';
import CategoryAdminView from '@/views/CategoryAdminView.vue';
import BookAdminView from '@/views/BookAdminView.vue';
import LoanAdminView from '@/views/LoanAdminView.vue';
import CatalogAdminView from '@/views/CatalogAdminView.vue';
import AboutView from '@/views/AboutView.vue';
import NotFound from '@/views/NotFound.vue';
import myUserView from '@/views/myUserView.vue';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'LogoutView',
    component: LogoutView
  },{
    path: '/catalog',
    name: 'CatalogView',
    component: CatalogView
  },
  {
    path: '/adminUsers',
    name: 'UsersAdminView',
    component: UsersAdminView
  },
  {
    path: '/adminAuthors',
    name: 'AuthorAdminView',
    component: AuthorAdminView
  },
  {
    path: '/adminCategories',
    name: 'CategoryAdminView',
    component: CategoryAdminView
  },
  {
    path: '/adminBooks',
    name: 'BookAdminView',
    component: BookAdminView
  },
  {
    path: '/adminLoans',
    name: 'LoanAdminView',
    component: LoanAdminView
  },
  {
    path: '/adminCatalog',
    name: 'CatalogAdminView',
    component: CatalogAdminView
  },
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView
  },
  {
    path: '/myUser',
    name: 'myUser',
    component: myUserView
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;