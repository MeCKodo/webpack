<template>
	<div id='app'>
		<h1>{{ msg }}12</h1>
		<index></index>
		<div id="kodo">dfsdf</div>
	</div>
</template>

<script>
	import index from './pages/index/index.vue';
	export default {
		data() {
			return {
				// note: changing this line won't causes changes
				// with hot-reload because the reloaded component
				// preserves its current state and we are modifying
				// its initial state.
				msg: 'Hello Vue!',
			};
		},
		components: {
			index,
		},
	};
</script>

<style lang='sass'>
	@import 'main.scss';

	body {
		background: #ddd;
		font-family: Helvetica, sans-serif;
		h1 {
			color: red;
		}
	}
</style>
