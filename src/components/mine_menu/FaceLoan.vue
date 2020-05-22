<template>
    <div>
        <head-bar class="head">
            <span slot="title">颜值贷</span>
            <span slot="button"><i class="el-icon-refresh-right"></i></span>
        </head-bar>
        <div class="main">
            <div class="title">
                <span>最高可借</span>
                <span>￥<span class="count">50,000</span></span>
            </div>
        </div>
        <div class="other">
            <p>日利率低至<span>万6</span>（最终以风险审核为准）<span @click="show"><i class="el-icon-warning-outline"></i></span></p>
            <div class="btn" @click="show">免费拿额度</div>
            <div class="student">
                <span><i class="el-icon-check"></i></span>
                我不是学生</div>
            <p>已有<span>1813758</span>名用户获得了借款额度</p>
        </div>
        
        <div class="act">
            <div class="new_act">
                <span>|</span>
                最新活动
            </div>
            <div class="question" @click="show">
                常见问题
            </div>
        </div>

        <div class="tabbar">
            <div class="active"><span><i class="el-icon-s-finance"></i></span>
            <span>首页</span></div>
            <div @click="show"><span><i class="el-icon-user-solid"></i></span>
            <span>我的</span></div>
        </div>
        <span class="service" @click="show"><i class="el-icon-headset"></i></span>
        <message ref="message"></message>
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import Message from '@/common/message/Message'

export default {
    name: 'FaceLoan',
    components: {
        HeadBar,
        Message
    },
    methods: {
        show() {
            this.$refs.message.show('敬请期待', 'info', 
            document.documentElement.clientHeight * 0.8)
        }
    }
}
</script>

<style scoped>
    .main {
        height: 50vw;
        text-align: center;
        overflow: hidden;
    }

    .title {
        display: inline-block;
        width: 45vw;
        height: 45vw;
        border: 10px solid #fe4470;
        border-radius: 50%;
        margin-top: 10vw;
        line-height: 10vw;
    }

    .title > span {
        display: block;
        font-size: 1.3rem
    }

    .title > span:first-child {
        margin-top: 10vw
    }

    .title > span:last-child {
        color: #fe4470
    }
    .count{
        font-size: 2.5rem;
        font-weight: 550
    }

    .other {
        text-align: center;
    }
    .other p {
        font-size: 0.9rem;
        color: #333;
    }

    .other p span {
        color: #fe4470
    }


    .btn {
        margin-top: 3vw;
        color: #fff;
        background-image: linear-gradient(to bottom , #ff47a9, #ff4a61);
        background-color: #fe4470;
        display: inline-block;
        padding: 3vw 12vw;
        font-size: 1.2rem;
        border-radius: 30px;
    }

    .student {
        font-size: 0.9rem;
        margin-top: 3vw;
    }

    .student span {
        background-color: #fe4470;
        color: #fff;
        border-radius: 5px;
        padding: 0 1.5px;
    }

    .act {
        border-top: 5px solid #f5f5f5;
        padding: 5vw;
    }

    .new_act {
        font-size: 1.2rem;
        font-weight: 500;
    }

    .new_act span {
        font-weight: 900 !important;
        color: #fe4470
    }

    .question {
        margin-top: 15vw;
        font-size: 0.9rem;
        text-align: center;
        color: #999
    }

    .service {
        position: absolute;
        color: #fff;
        border-radius: 50%;
        background-color: #fd4785;
        bottom: 25vw;
        right: 5vw;
        display: inline-block;
        height: 10vw;
        width: 10vw;
        font-size: 1.8rem;
        text-align: center;
        line-height: 10vw;
    }

    .tabbar {
        position: fixed;
        border-top: 1px solid #f5f5f5;
        bottom: 0;
        height: 55px;
        width: 100%;
        display: flex;
    }

    .tabbar > div {
        flex: 1;
        text-align: center;
        color: #bfbfbf;
        font-size: 0.9rem;
    }

    .tabbar > div:first-child {
        border-right: 1px solid #f5f5f5
    }
    .tabbar > div > span {
        display: block;
    }

    .tabbar > div > span:first-child {
        font-size: 1.5rem
    }

    .active {
        color: #fe4470!important
    }
</style>