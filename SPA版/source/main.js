import "./index.scss";
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
    data () {
        return {}
    },
    ready () {
        console.log("初始化vue");
    }
});

router.start(app, "#app");
