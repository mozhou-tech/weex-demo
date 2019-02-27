<template>
    <div class="wrapper">
        <text  class="page-title">创建文章</text>
        <div class="textbox">
            <text>请输入文章标题:</text>
        </div>
        <input type="text" class="input" v-model="title"/>
        <div class="textbox">
            <text>请输入文章正文:</text>
        </div>
        <textarea class="textarea" rows="10" @change="onChange"></textarea>
        <text class="button" @click="submit">{{loading ? '提交中...' : '提交'}}</text>
    </div>
</template>

<script>
    const stream = weex.requireModule('stream') || {};
    const modal = weex.requireModule('modal') || {};
    const API = 'https://jsonplaceholder.typicode.com/posts';

    export default {
        data: function () {
            return {
                title: '',
                article: '',
                loading: false
            }
        },
        methods: {
            submit: function() {
                const {title, article, loading} = this;
                const self = this;

                if (!title || !article) {
                    modal.toast({
                        message: '文章标题和正文不能为空。',
                        duration: 3
                    });
                    return;
                }
                if (loading) {return;}
                this.loading = true;

                const body = JSON.stringify({title, article});

                stream.fetch({
                    method: 'POST',
                    url: API,
                    type:'json',
                    body: body
                }, function(ret) {
                    self.loading = false;

                    if(!ret.ok){
                        modal.toast({
                            message: 'Network Error!',
                            duration: 3
                        });
                    }else{
                        modal.toast({
                            message: '提交成功!' + body,
                            duration: 3
                        });
                    }
                })
            },
            onChange: function(event){
                const value = event.value || '';

                this.article = value.trim();
            }
        }
    }
</script>

<style>
    .wrapper {
        padding: 30px;
    }
    .page-title {
        font-size: 60px;
        font-weight: bold;
        margin-bottom: 50px;
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
    .textarea {
        margin-top: 10px;
        margin-bottom: 60px;
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
    .textarea:focus {
        border-color: #3399ff;
    }
    .textbox {
        margin: 30px 0;
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