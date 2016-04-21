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
                require(['./views/index/index.vue'], resolve);
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
    router.beforeEach(({to,next}) => {
        console.log(localStorage.getItem('kodo'));
        if (to.auth) {
            // 对身份进行验证...
            if(localStorage.getItem('kodo')) {
                next();
            } else {
                alert('身份验证已过期,请登入');
                let redirect = encodeURIComponent(to.path);
                console.log(redirect);

                router.go({name: 'login'});
            }
        } else {
            next();
        }
        // transition.next();
    });
}
