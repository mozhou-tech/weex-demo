<template>
    <div class="wrapper">
       <text>Home Pages</text>
        <text @click="logout">退出登录</text>

        <br>
        <br>
        <a href="/pages/Form.html">
            <text class="button">填单页</text>
        </a>
        <br>
        <a href="/pages/List.html">
            <text class="button">列表页</text>
        </a>
        <br>
    </div>
</template>

<script>
    const dom = weex.requireModule('dom') || {};
    const stream = weex.requireModule('stream') || {};
    const modal = weex.requireModule('modal') || {};
    import {isUserLogined,logout} from "../functions/user";
    const navigator = weex.requireModule('navigator') || {};

    export default {
        data () {
            return {

            }
        },

        created: function() {
            if(!isUserLogined()){
                navigator.push({url: '/pages/Login.html', animated: "true"})
            }
        },

        methods: {
            logout:function () {
                logout()
            },
        }
    }
</script>
<style scoped>
    .wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
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