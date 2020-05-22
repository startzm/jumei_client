<template>
    <div class="lottery_bar">
        <div :class="{active: isHome}">
            <i class="el-icon-s-home"></i><br>
            首页
        </div>

         <div :class="{active: !isHome}">
            <i class="el-icon-s-custom"></i><br>
            我的
        </div>
    </div>
</template>

<script>
export default {
    name: 'LotteryBar',
    data() {
        return {
            is_home: true
        }
    },
    methods: {
        isHome () {
            if (this.is_home) {
                return true
            } else {
                return false
            }
        }
    },
}
</script>

<style scoped>
    .lottery_bar {
        background-color: #fff;
        width: 100vw;
        position: fixed;
        bottom: 0;
        height: 45px;
        display: flex;
    }

    .lottery_bar div {
        flex: 1;
        text-align: center;
        font-size: 0.8rem;
        color: #9a9a9a
    }

    .lottery_bar div i {
        font-size: 1.8rem;
    }

    .active {
        color: #ff3c55 !important
    }
    
</style>