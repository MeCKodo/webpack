<template>
    <div id="app">
        <hello></hello>
    </div>
    <div id="box">

    </div>
    <div id="pox" class="box">

    </div>
</template>

<script>
    import Hello from './test'

    export default {
        components: {
            Hello
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
