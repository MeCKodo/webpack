<template>
    <div id="app">
    </div>
    <hello></hello>
    <div id="box">

    </div>
    <div id="pox" class="box">
123
    </div>
</template>

<script>
    import hello from './test'

    export default {
        components: {
            hello
        }
    }
</script>

<style>
    body {
        font-family: Helvetica, sans-serif;

    }
    div {
        color: grey;
    }
    #pox {
        width:200px;
        height:200px;
        background: #abcdef;
    }
    #box {
        width: 100px;
        height: 100px;
        background: url("images/bg.png") repeat;
        display: flex;

    }
</style>
