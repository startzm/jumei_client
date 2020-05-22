<template>
    <div class="prize_info" v-if="Object.keys(prize_data).lenth !=0">
        <div class="prize">
            <div>
                <span class="title">抽奖奖品区</span>
                <span class="lucky"><span>今日抽奖次数: {{count}}</span>
                <span class="lucky-draw" @click="turntable_start">抽奖</span></span>
            </div><br>
            <div>
                <span
                v-for="(img, key) in prize_data.prize_info"
                :img="img"
                :key="key"
                class="prize_img"
                >
                    <img :src="img" alt="">
                </span>
            </div>
        </div>

        <div class="task">
            <span class="title">做任务拿大奖</span>
            <div class="task_detail" :style="background">
                <div class="task_item">
                    <br>
                    <span class="task_title">{{prize_data.task_list[0].title_big}}</span>&nbsp;
                    <span class="task_info">{{prize_data.task_list[0].num_info.replace('\\', '')}}</span>
                    <br><span class="task_memo">{{prize_data.task_list[0].title_memo}}</span>
                </div>
                <span class="go_task">去完成</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SigninPrize',
    props: {
        prize_data: {},
        turntable_count: ''
    },
    data() {
        return {
            background: {},
            count: ''
        }
    },
    methods: {
        turntable_start () {
            this.$emit('turntable_start')
        },
        start_turntable () {
            this.count = parseInt(this.count) - 1
        }
    },
    created() {
        this.count = this.turntable_count
        this.background = {
            'background': 'url(http://p15.jmstatic.com/zengzhang/416b8390b75732487d7a45667c08a92f.png) no-repeat left top',
            'background-size': 'cover'
        }
    }
}
</script>

<style scoped>
    .prize_info {
        background-color: #fff;
        width: 92vw;
        height: 85vw;
        margin: 4vw;
        border-radius: 10px;
    }
    
    .prize {
        padding: 5vw;
        height: 35vw;
    }

    .prize img {
        width: 17vw;
    }

    .title {
        font-size: 1.2rem;
        font-weight: 550
    }

    .lucky {
        position: absolute;
        right: 7vw;
        font-size: 0.8rem;
        color: #6d6d6d
    }

    .lucky-draw {
        color: #fff;
        display: inline-block;
        border-radius: 30px;
        padding: 5px 25px;
        background-image: linear-gradient(to right , #ffaac5, #fe4470);
    }

    .prize_img {
        display: inline-block;
        border: 1px solid #eee;
        border-radius: 5px;
        margin-right: 2vw;
    }

    .prize > div:last-child {
         height: 20vw;
         overflow: hidden;
    }

    .task {
        height: 45vw;
        position: relative;
    }

    .task .title{
        margin: 5vw;
    }
    .task_detail {
        margin-top: 5vw;
        height: 20vw;
        padding-left: 20vw;
        padding-top: 0vw;
    }

    .go_task {
        position: absolute;
        font-size: 1rem;
        right: 8vw;
        top: 18vw;
        color: #fe4470;
        background-color: #fff;
        padding: 5px 15px;
        border-radius: 30px
    }

    .task_title {
        color: #fff;
        margin-top: 20px;
        font-size: 1.1rem;
    }

    .task_info {
        color: #fff;
        font-size: 1rem;
    }

    .task_memo {
        color: #fff;
        font-size: 0.7rem
    }
    .task_item {
        padding-bottom: -5px;
    }
</style>