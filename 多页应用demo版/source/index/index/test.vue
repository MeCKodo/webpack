<template>
    <div class="hello" @click="test">

        <h1>{{ msg }}</h1>
    </div>
    <div id="mine">
        <figure @click="test"></figure>
    </div>阿斯顿
</template>
<style lang="sass">
        figure {
            width:300px;
            height:400px;
            background: url("images/picture.png");
        }
    h1 {
        font-size:50px;
    }

</style>
<script >
    export default {
        data () {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                msg: 'Hello Wsorld!'
            }
        },
        methods : {
            test (){
                console.log(1);
            }
        }
    }
</script>
