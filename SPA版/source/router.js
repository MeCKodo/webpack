export default function (router){
    router.map({
        '*' : {
            name : "404",
            component (resolve) {
                require(['./common/404.vue'], resolve);
            }
        },
        '/' : {
            name : "home",
            component (resolve) {
                require(['./common/home.vue'], resolve);
            }
        },
        'profile' : {
            name : "profile",
            component (resolve) {
                require(['./views/profile.vue'], resolve);
            }
        },
        'list' : {
            name : "list",
            component (resolve) {
                require(['./views/list.vue'], resolve);
            }
        }
    });
}