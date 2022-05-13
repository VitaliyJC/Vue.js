import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FirstCalcilator from '../views/FirstCalcilator.vue';
import NotFound from '../views/NotFoundView.vue';
import AddPaymentForm from '../components/AddPaymentForm.vue';


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/mycalc',
    name: 'mycalc',
    component: FirstCalcilator
  },
  {
    path: "/add/:section/:category",
    name: "AddPaymentForm",
    component: AddPaymentForm,
  },
  {
    path: "/notfound",
    name: "NotFound",
    component: NotFound,
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

export default router