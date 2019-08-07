<template>
  <div>
    <!-- 轮播图区 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in arr" :key="item.img">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格 到 六宫格 的改造过程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/sex/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
            <img src="@/assets/sex/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/sex/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/sex/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/sex/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="@/assets/sex/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
    
    
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      arr: []
    };
  },
  created() {
    this.gitList();
  },
  methods: {
    gitList() {
      axios
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(res => {
          this.arr = res.data.message;
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.mui-grid-view.mui-grid-9{
    background-color: #fff;
    border: none;
    img{
        width: 60px;
        height: 60px;
    }
    .mui-media-body{
        font-size: 13px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none;
}
</style>
