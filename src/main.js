
import Vue from 'vue';
import App from './App.vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

import * as VueGoogleMaps from 'vue2-google-maps';
import VueRouter from 'vue-router';

import Navigation from './views/Navigation.vue';
import Establishments from './views/Establishments.vue';
import AboutRestaurant from './views/AboutRestaurant.vue';
import Contacts from './views/Contacts.vue';
import Home from './views/Home.vue';
import Articles from './views/Articles.vue';
import Post from './views/Post.vue';
import About from './views/About.vue';
import PageNotFound from './views/PageNotFound.vue';
import http from './services/http-common';

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAMYs36lxiibKs1CnMAfE7APQMe3UrdW2Q',
  },
});

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/establishments',
      name: 'Establishments',
      component: Establishments,
    },
    {
      path: '/establishments/:id',
      name: 'AboutRestaurant',
      component: AboutRestaurant,
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts,
    },
    {
      path: '/articles',
      name: 'Articles',
      component: Articles,
    },
    {
      path: '/posts/:id',
      name: 'Post',
      component: Post,
    },
    {
      path: '/navigation',
      name: 'Navigation',
      component: Navigation,
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound,
    },

  ],
});

new Vue({
  router,
  http,
  render: h => h(App),
}).$mount('#app');
