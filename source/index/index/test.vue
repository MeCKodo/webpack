<template>
    <div class="hello" @click="test">

        <h1>{{ msg }}</h1>
    </div>
    <div id="mine">
        <figure></figure>
    </div>
</template>
<style lang="sass">
    #mine {
        figure {
            width:200px;
            height:400px;
            background: url("images/myprofile.jpg");
        }
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
