<template>
    <div class="goodsinfo-container">

        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>


        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：
                        <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量：
                        <numbox></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>


        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>

    </div>
    <!-- 分析：为什么 商品评论中的 的轮播图那么丑： -->
    <!-- 1. 首页中的图片，它的宽和高，都是 使用了 100% 的宽度 -->
    <!-- 2. 在商品详情页面中，轮播图的 图片，如果也使用 宽高 为 100%的话，页面不好看 -->
    <!-- 3. 商品详情页面中的轮播图，期望 高度是 100%，但是 宽度为 自适应 -->
    <!-- 4. 经过分析，得到 问题的原因： 首页中的轮播图 和详情页中的轮播图，分歧点是 宽度到底是 100% 还是自适应 -->
    <!-- 5.  既然这两个 轮播图，其它方面都是没有冲突的，只是 宽度有分歧，那么，我们可以定义一个属性，让 使用轮播图的 调用者，手动指定 是否为 100%的宽度  -->
</template>
<script>
import axios from 'axios'

// 导入轮播图组件
import swiper from '@/components/subcomponents/swiper.vue'

// 导入 数字选择框组件
import numbox from '@/components/subcomponents/goodsinfo_numbox.vue'
export default {
    data(){
        return {
            id: this.$route.params.id, //将路由参数对象中的 id 挂载到 data ，
            lunbotu: [], //轮播图的数据
            goodsinfo: {}, //获取到的商品的信息
            ballFlag: false //控制小球的隐藏和显示的标识符
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsInfo()
    },
    methods: {
        getLunbotu() {
            axios.get("http://www.liulongbin.top:3005/api/getthumimages/"+ this.id )
            .then(res=>{
                console.log(res)
                if(res.data.status === 0){
                    // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img, 不认识 item.src
                    res.data.message.forEach(item =>{
                        item.img = item.src;
                    })
                    this.lunbotu = res.data.message;
                }
            })
        },
        getGoodsInfo() {
            axios.get("http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id)
            .then(res=>{
                if(res.data.status === 0){
                    this.goodsinfo = res.data.message[0]
                }
            })
        },
        goDesc(id) {
            // 点击使用编程式导航跳转到 图文介绍页面
            this.$router.push({ name: "goodsdesc" , params: { id }})
        },
        goComment(id) {
            // 点击跳转到 评论页面
            this.$router.push({ name: "goodscomment" , params: { id }})
        },
        addToShopCar() {
            // 添加到购物车
            this.ballFlag = !this.ballFlag;
        },
        beforeEnter(el) {
            el.style.transform = "translate(0,0)";
        },
        enter(el, done) {
            el.offsetWidth;


            // 小球动画优化思路
            // 1. 先分析导致 动画 不准确 的本质原因；我们把 小球 最终 位移道德 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
            // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后，问题就出现了；
            // 3. 因此，我们经过分析，得到结论；不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个锁表值；
            // 4. 经过分析，得到解题思路； 先得到 徽标的 横纵 坐标，再得到 小球的横纵坐标，然后 让 y 值 求差，x值也 求差，得到 的结果，就是横纵坐标要位移的距离
            // 5. 如何 获取 徽标和小球的 位置？？？ domObject.getBoundingClientRect()

            // 获取小球的 在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取 徽标 在页面中的位置
            const badgePosition = document
                .getElementById("badge")
                .getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px,${yDist}px)`;
            el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag;
        }
    },
    components: {
        swiper,
        numbox
    }
}
</script>
<style lang="less" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;

    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 150px;
        // transform: translate(88px,230px);
    }
}
</style>