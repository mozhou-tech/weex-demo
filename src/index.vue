<template>
  <div class="wrapper">
    <text>loading...</text>
  </div>
</template>

<script>
    var navigator = weex.requireModule('navigator');
    import {getEntryUrl} from "./functions";

    export default {
        created(){
            navigator.push({url: getEntryUrl("pages/Login"), animated: "true"})
        },
        methods: {

        }
    };
</script>

<style scoped>
  .wrapper {
    align-items: center;
    justify-content: center;
  }
</style>