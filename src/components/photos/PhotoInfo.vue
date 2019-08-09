<template>
    <div class="photo-container">
        <h3>{{ phophinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ phophinfo.add_time | dateFormat }}</span>
            <span>点击：{{ phophinfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <div class="thumbs">
            <vue-preview :slides="thumbImgList"></vue-preview>
        </div>


        <!-- 图片内容区域 -->
        <div class="content" v-html="phophinfo.content">

        </div>


        <!-- 放置一个现成的 评论子组件 -->
        <my-comment :id="id"></my-comment>
    </div>
</template>
<script>
import axios from 'axios'

// 导入评论子组件
import comment from "@/components/subcomponents/comment.vue"

export default {
    data(){
        return{
            id: this.$route.params.id,
            phophinfo: {}, //图片详情
            thumbImgList: [] //缩略图数组
        }
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs()
    },
    methods: {
        getPhotoInfo() {
            // 获取图片的详情 
            axios.get("http://www.liulongbin.top:3005/api/getimageInfo/" + this.id).then((res)=>{
                if(res.data.status === 0){
                    this.phophinfo = res.data.message[0]
                }
            })
        },
        getThumbs() {
            // 获取缩略图
            axios.get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id).then(res=>{
                if(res.data.status === 0){
                    // 循环每个图片数据，补全图片的宽和高
                    res.data.message.forEach(item => {
                        item.w = 600
                        item.h = 400
                        item.msrc = item.src
                    });
                    this.thumbImgList = res.data.message;

                    // 把完整的数据保存到 list 中
                }
            })
        }
    },
    components: { //注册 评论子组件
        myComment:comment
    }
}
</script>
<style lang="less" scoped>
.photo-container{
    padding: 3px;
    h3{
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
}
</style>
