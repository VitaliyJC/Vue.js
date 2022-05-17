import Vue from 'vue';
import VueRouter from 'vue-router';
// import HomeView from '../views/HomeView.vue';
// import FirstCalcilator from '../views/FirstCalcilator.vue';
// import NotFound from '../views/NotFoundView.vue';
// import AddPaymentForm from '../components/AddPaymentForm.vue';


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: () => import( /* webpackChunkName: "HomeView" */ '../views/HomeView.vue'),
  },
  {
    path: '/mycalc',
    name: 'mycalc',
    component: () => import( /* webpackChunkName: "FirstCalcilator" */ '../views/FirstCalcilator.vue'),
  },
  {
    path: "/add/:section/:category",
    name: "AddPaymentForm",
    component: () => import( /* webpackChunkName: "AddPaymentForm" */ '../components/AddPaymentForm.vue'),
  },
  {
    path: "/notfound",
    name: "NotFound",
    component: () => import( /* webpackChunkName: "NotFoundView" */ '../views/NotFoundView.vue'),
  },
  {
    path: "*",
    redirect: {
      name: "NotFound"
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const getTitleByRouteName = (routeName) => {
  return {
    home: "Take a look on your payments and add more!",
    mycalc: "Anything about our awesome application!",
    NotFound: "Oops! Seems like we lost this page :(",
  } [routeName];
};

router.afterEach((to) => {
  document.title = getTitleByRouteName(to.name);
});

export default router