<template>
    <div class="card">
        <text>用户名：</text>
        <input type="text" class="input" v-model="loginForm.username">
        <text>密码：</text>
        <input type="text" class="input" v-model="loginForm.password">
        <text class="button" @click="loginSubmit">{{loading ? '提交中...' : '提交'}}</text>
    </div>
</template>

<style scoped>
    .card {
        width: 650px;
        justify-content: center;
        border-width: 1px;
        border-color: #DDDDDD;
        border-radius: 20px;
        padding: 50px;
        margin: 50px;
        background-color: #FFFFFF;
    }

    .input {
        margin-top: 10px;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        color: #666666;
        border-width: 2px;
        border-style: solid;
        border-color: #41B883;
        font-size: 36px;
    }

    .input:focus {
        border-color: #3399ff;
    }

    .button {
        height: 80px;
        line-height: 80px;
        background-color: #3399ff;
        color: #fff;
        border-radius: 4px;
        text-align: center;
    }
</style>

<script>
    import {httpPost} from "../functions";
    import {isUserLogined,login} from "../functions/user";

    const stream = weex.requireModule('stream') || {};
    const modal = weex.requireModule('modal') || {};
    const navigator = weex.requireModule('navigator') || {};
    export default {
        data() {
            return {
                loading: false,
                loginForm: {
                    username: "user",
                    password: "123"
                }
            }
        },
        created() {
            if(isUserLogined()){
                navigator.push({url: '/pages/Home.html', animated: "true"})
            }else{
                console.log("未登录")
            }
        },
        methods: {
            loginSubmit() {
                this.loading = true;
                let self = this;
                httpPost("/weex-demo/login",JSON.stringify(this.loginForm),function (res) {
                    self.loading = false;
                    console.log(res);
                    login('login');
                    modal.toast({
                        message: '登录成功',
                        duration: 2
                    })
                },res=>{
                    self.loading = false;
                    console.log(res);
                });
            }
        }
    }
</script>
