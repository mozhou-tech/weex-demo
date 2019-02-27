<template>
    <div class="wrapper">
        <scroller class="scroller" @loadmore="onloadmore">
            <div class="page-title-box" ref="pageTitle">
                <text class="page-title">Top Airing Anime</text>
            </div>
            <div class="item" v-for="item in items" :key="item.id">
                <div class="item-content">
                    <div class="item-imgbox">
                        <image class="item-img" :src="item.attributes.posterImage.small" alt="" />
                    </div>
                    <div class="item-info">
                        <div class="item-info-detail">
                            <text class="title">{{getTitle(item)}}</text>
                        </div>
                        <div>
                            <text class="desc">{{getDesc(item)}}</text>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loadingbox">
                <image class="loading" src="https://img.alicdn.com/tfs/TB1CWnby7yWBuNjy0FpXXassXXa-32-32.gif" />
            </div>
        </scroller>
        <div class="up" @click="goToTop">
            <image class="img" src="https://img.alicdn.com/tps/TB1ZVOEOpXXXXcQaXXXXXXXXXXX-200-200.png" />
        </div>
    </div>
</template>

<script>
    const dom = weex.requireModule('dom') || {};
    const stream = weex.requireModule('stream') || {};
    const modal = weex.requireModule('modal') || {};
    const API = 'https://kitsu.io/api/edge/anime?filter%5Bstatus%5D=current&sort=-userCount&page%5Blimit%5D=20'
    import {isUserLogined} from "../functions/user";
    const navigator = weex.requireModule('navigator') || {};

    export default {
        data () {
            return {
                items: [],
                firstId: 1
            }
        },

        created: function() {
            const self = this;
            stream.fetch({
                method: 'GET',
                url: API,
                type:'json'
            }, function(ret) {
                if(!ret.ok){
                    modal.toast({
                        message: 'Network Error!',
                        duration: 3
                    });
                }else{
                    self.firstId = ret.data.data[0].id;
                    self.items = self.items.concat(ret.data.data);
                }
            });
        },
        created: function() {
            if(!isUserLogined()){
                navigator.push({url: '/pages/Login.html', animated: "true"})
            }
        },
        methods: {
            onloadmore: function (e) {
                const self = this;
                const offset = this.items.length;

                stream.fetch({
                    method: 'GET',
                    url: API + `&page%5Boffset%5D=${offset}`,
                    type:'json'
                }, function(ret) {
                    if(!ret.ok){
                        modal.toast({
                            message: 'Network Error!',
                            duration: 3
                        });
                    }else{
                        self.items = self.items.concat(ret.data.data);
                    }
                });
            },
            goToTop: function (e) {
                const el = this.$refs.pageTitle;

                dom.scrollToElement(el, {
                    offset: 0
                })
            },
            getDesc: function(item) {
                if (item.attributes.synopsis) {
                    return item.attributes.synopsis.trim();
                }
                return '...'
            },
            getTitle: function(item) {
                const titleObj = item.attributes.titles;
                if (titleObj) {
                    return titleObj.en || titleObj.en_jp || titleObj.ja_jp;
                }
                return '...'
            }
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
    }
    .scroller {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9;
    }
    .page-title-box {
        padding: 20px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #efefef;
    }
    .page-title {
        text-align: center;
        font-size: 60px;
    }
    .item {
        padding: 20px;
        height: 220px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #efefef;
    }
    .item-content {
        flex-direction: row;
        width: 710px;
        background-color: #ffffff;
    }
    .item-imgbox {
        height: 180px;
        width: 180px;
        margin-right: 20px;
    }
    .item-img {
        width: 180px;
        height: 180px;
    }
    .item-info {
        height: 180px;
        width: 510px;
        position: relative;
    }
    .item-info-detail {
        position: relative;
        color: #A2A2A2;
    }
    .title {
        lines: 1;
        text-overflow: ellipsis;
        font-size: 32px;
        color: #2D2D2D;
        line-height: 40px;
    }
    .desc {
        lines: 3;
        text-overflow: ellipsis;
        font-size: 32px;
        color: #999;
    }
    .detail-info {
        margin-top: 15px;
    }
    .up {
        width: 70px;
        height: 70px;
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 999;
    }
    .img {
        width: 70px;
        height: 70px;
    }
    .loadingbox {
        align-items: center;
        padding: 20px;
        height: 80px;
    }
    .loading {
        height: 40px;
        width: 40px;
    }
</style>