<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 在组件中，使用v-for循环的化，一定要使用 key -->
            <!-- 将来，谁使用此 轮播图组件，谁为我们传递 arr -->
            <!-- 此时，arr 应该是 父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
                <img :src="item.img" alt="" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props: ["lunbotuList","isfull"],
    data(){
        return {

        }
    }
}
</script>
<style lang="less" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
      text-align: center;
    img {
    //   width: 100%;
      height: 100%;
    }
  }
}
.full{
    width: 100%;
}
</style>