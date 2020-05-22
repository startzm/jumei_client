<template>
    <div class="lottery_item">
        <img :src="item.image" alt="" lazy @load="img_load">
        <div class="brand">
            <h6>
                {{item.brand}}
            </h6>
            <span>×1份</span>
        </div>

        <div class="title">
            {{item.desc}}
        </div>

        <span class="join" @click="join_lott" v-if="!is_joined">马上抢</span>
        <span class="has_joined" v-else>已参与</span>

        <p class="tip">{{item.tip}}</p>

        <span class="join_num" >{{number}}人已参与</span>
    </div>
</template>

<script>
import {join_lottery} from '@/network/other/daily_lottery'

export default {
    name: 'LotteryItem',
    props: {
        item: {}
    },
    data () {
        return {
            is_joined: false,
            number: ''
        }
    },
    methods: {
        img_load () {
            this.$emit('img_load')
        },

        join_lott () {
            join_lottery ({'id': this.item.id}).then (res=>{
               if (res.data == 1) {
                  this.is_joined = true
                  this.number = parseInt(this.number) + 1
                  this.$emit('join')
               }
            })
        }
    },
    created() {
        this.is_joined = this.item.is_joined
        this.number = this.item.number
    },
}
</script>

<style scoped>
    .lottery_item {
        background-color: #fff;
        width: 80vw;
        margin: 5vw;
        padding: 5vw 5vw 2vw 5vw;
        border-radius: 10px
    }

    img {
        width: 78vw;
        border: 1px solid #f5f5f5;
    }

    .brand {
        margin-top: 2vw;
    }

    .brand h6 {
        display: inline;
        font-size: 0.9rem;
    }

    .brand span {
        position: absolute;
        font-size: 0.9rem;
        right: 10vw;
        font-weight: 550;
        color: #ff3d55
    }
    
    .title {
        margin-top: 3vw;
        color: #636363;
        font-size: 0.9rem;
    }

    .join {
        color: #fff;
        margin-top: 2vw;
        background-color: #ff3d55;
        padding: 2vw 8vw;
        border-radius: 30px;
        float: right;
    }

    .tip {
        margin-top: 14vw;
        font-size: 0.75rem;
        color: #999999
    }

    .join_num {
        position: absolute;
        font-size: 0.75rem;
        right: 10vw;
        margin-top: -7vw;
        color: #d2aa77
    }

    .has_joined {
        color: #fff;
        margin-top: 2vw;
        padding: 2vw 8vw;
        border-radius: 30px;
        float: right;
        background-color: #666;
    }
</style>