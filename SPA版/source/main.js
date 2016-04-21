import './index.scss';
import Vue from 'vue';
import VueRouter from "vue-router";
import routerMap from "./router";
Vue.use(VueRouter);
const router = new VueRouter();
routerMap(router);

const app = Vue.extend({
    el: function () {
        return "html"
    },
    route: {
        data(transition){
            transition.next();
        }
    },
    data () {
        return {}
    },
    ready () {
        console.log(router);
        console.log("init");
    }
});

router.start(app, "#app");
