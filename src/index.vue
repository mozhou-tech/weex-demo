<template>
  <div class="wrapper">
    <text class="button" @click="loginPage">请先登录</text>
    <br>
    <text class="button" @click="listPage">列表页</text>
    <br>
    <text class="button" @click="formPage">发布文章</text>
    <br>
  </div>
</template>

<script>
    var navigator = weex.requireModule('navigator');
    var modal = weex.requireModule('modal');

    export default {
        methods: {
            formPage (event) {
                navigator.push({url: '/pages/Form.html', animated: "true"})
            },
            listPage (event) {
                navigator.push({url: '/pages/List.html', animated: "true"})
            },
            loginPage (event) {
                navigator.push({url: '/pages/Login.html', animated: "true"})
            }
        }
    };
</script>

<style scoped>
  .wrapper {
    align-items: center;
    justify-content: center;
  }
  .button {
    width: 400px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 5px;
    background-color: #3eaf7c;
    font-size: 48px;
    color: #fff;
    text-align: center;
  }
</style>