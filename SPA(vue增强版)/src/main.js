import './scss/_reset.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import routerConfig from './router';

if (process.env.NODE_ENV !== 'production') {
	console.log('fuck');
}

Vue.use(VueRouter);
Vue.use(Vuex);
const router = new VueRouter({
    hashbang: false,
});

routerConfig(router);

const app = Vue.extend({
    el() {
        return 'html';
    },
});

router.start(app, '#container');
window.router = router;
