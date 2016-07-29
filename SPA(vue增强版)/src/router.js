export default function (router) {
	router.map({
		'/': {
			name: 'home',
            component(resolve) {
                require(['./App.vue'], resolve);
            },
        },
    });
}
