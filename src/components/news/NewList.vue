<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in arr" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间:{{ item.add_time | dateFormat }}</span>
                            <span>点击：{{ item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return{
            arr: []
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            axios
                .get("http://www.liulongbin.top:3005/api/getnewslist")
                .then(res => {
                    if(res.data.status === 0){
                        this.arr = res.data.message;
                    }
                })
                .catch(res => {
                console.log(res);
                });
        }
    }
}
</script>
<style lang="less" scoped>
.mui-table-view{
    li{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
