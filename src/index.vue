<template>
  <div class="wrapper">
    <text>loading...</text>
  </div>
</template>

<script>
    var navigator = weex.requireModule('navigator');

    export default {
        created(){
            navigator.push({url: '/pages/Login.html', animated: "true"})
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