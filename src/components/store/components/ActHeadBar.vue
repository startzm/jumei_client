<template>
    <div class="touch-header">
        <span id="go_back" @click="go_back">
            <i class="el-icon-arrow-left"></i>
        </span>
        <h6>{{ title }}</h6>
        <span id="go_home" @click="go_back">
            <i class="el-icon-house"></i>
        </span>
        <div class="show_drawer" v-if="(has_nav)">
            <i class='el-icon-arrow-down'></i>
        </div>
    </div>
</template>


<script>
export default {
    name: 'ActHeadBar',
    props: {
        title: '',
        has_nav: false
    },
    methods: {
        go_back () {
            this.$router.go(-1)
        }
    },
}
</script>

<style scoped>
    .touch-header {
        text-align: center;
        height: 45px;
        position: relative;
        background: #fff;
        margin: 0;
        padding: 0;
        width: 100%;
        border-bottom: 1px solid #c6c6c6;
    }

    .touch-header span {
        color: #999999;
        font-size: 1.5rem;
    }

    #go_back {
        position: absolute;
        top: 5px;
        left: 15px;
    }

    #go_home {
        position: absolute;
        top: 5px;
        right: 15px;
    }

    .touch-header h6 {
        display: block;
        text-align: center;
        margin: 0 2.1875rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 1rem;
        color: #333;
        height: 45px;
        line-height: 45px;
    }

    .show_drawer {
        
        font-size: 1.8rem;
        position: absolute;
        right: 0;
        top: 50px;
        text-align: center;
        z-index: 200;
        width: 40px;
        line-height: 40px;
        background: rgba(255,255,255,.95);
        opacity: .95;
    }
</style>