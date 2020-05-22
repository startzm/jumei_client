<template>
    <div class="signin_info" v-if="Object.keys(item).length !=0">
        <div class="my_prize">
            <i class="el-icon-present"></i>
            <span>我的奖品</span>
        </div>

        <div class="info_box">
            <div class="info">
                <span class="doubt">&nbsp;？</span>
                <p>本期已连续签到
                    <span>{{days}}</span>
                    天</p>
                <div class="draw">
                    <div
                    v-for="(draw, key) in draw_data"
                    :draw="draw"
                    :key="key"
                    class="draw_item"
                    >
                    <div v-if="!is_checked(key)">
                        <img :src="draw.img" alt="">
                        <span>{{draw.day}}天</span>
                    </div>

                    <div v-else class="is_checked">
                        <i class="el-icon-s-claim"></i><br>
                        <span>{{draw.day}}天</span>
                    </div>
                    
                    </div>
                </div>
            </div>
            <div class="tip">
                <p><i class="el-icon-s-claim"></i><span>签到小管家</span></p>
                <span>每日来签到，天天领奖励 有机会赢iphoneX</span>
            </div>
        </div>

        
    </div>
</template>

<script>
export default {
    name: 'SigninInfo',
    props: {
        item: {},
        days: ''
    },
    data() {
        return {
            draw_data: {}
        }
    },
    methods: {
        is_checked (key) {
            if (key < parseInt(this.days)) {
                return true
            } else {
                return false
            }
        }
    },
    created() {
        this.draw_data = this.item.draw_every_day
    }
}
</script>

<style scoped>
    .signin_info {
        background: url('~@/assets/img/signin_bg.jpg') no-repeat left top;
        background-size: 100%;
        padding-left: 4vw;
        padding-right: 4vw;
        padding-bottom: 4vw;
    }

    .my_prize {
        height: 70px;
        line-height: 70px;
        font-size: 1.1rem;
    }

    .my_prize i {
        font-size: 1.2rem;
        padding: 2vw;
        border-radius: 50px;
        background-color: #fff;
        font-weight: 600;
        color: #fe4470
    }

    .my_prize span {
        margin-left: 2vw;
        font-weight: 550;
        color: #fff
    }

    .info_box {
        background-color: #fff;
        width: 92vw;
        height: 70vw;
        border-radius: 10px;
    }

    .info {
        height: 40vw;
        border-bottom: 1px solid #f5f5f5;
        position: relative;
        padding-top: 5vw
    }

    .doubt {
        position: absolute;
        display: inline-block;
        color: #fff;
        right: 3vw;
        top: 3vw;
        background-color: #ffa777;
        height: 25px;
        line-height: 25px;
        width: 25px;
        border-radius: 50%;
        text-align: center;
        font-size: 1.1rem;
        font-weight: 600
    }

    .info p {
        text-align: center;
        font-size: 1.2rem;
        font-weight: 520
    }

    .info p span {
        color: #fe4470
    }

    .draw {
        display: flex;
    }

    .draw_item {
        flex: 1;
        width: 12.5vw;
        text-align: center
    }

    .draw_item img {
        width: 10vw;
    }
    .draw_item span {
        font-size: 0.95rem;
    }

    .tip {
        padding-left: 3vw;
        position: relative;
        height: 20vw;
    }

    .tip p {
        font-size: 1.1rem;
        font-weight: 550
    }

    .tip p i {
        font-size: 1.5rem;
        color: #fe4470
    }

    .tip > span {
        position: absolute;
        bottom: 5vw;
        color: #6d6d6d;
        font-size: 0.9rem;
    }

    .is_checked {
        margin-top: 1.5vw;
        color: #fe4470
    }

    .is_checked i {
        border-radius: 50%;
        background-color: #fe4470;
        color: #fff;
        padding: 5px;
        font-size: 1.2rem;
    }

    .is_checked span {
        display: inline-block;
        margin-top: 2.3vw
    }
</style>