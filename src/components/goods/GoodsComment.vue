<template>
    <div>
        <cmtbox :id="$route.params.id"></cmtbox>
    </div>
</template>
<script>
import cmtbox from '@/components/subcomponents/comment.vue'

export default {
    data(){
        return {}
    },
    components: {
        cmtbox   
    }
}
</script>
<style lang="less" scoped>

</style>