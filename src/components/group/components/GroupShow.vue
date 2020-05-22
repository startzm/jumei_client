<template>
    <div v-if="this.group.length!=0" class="groups">
        <div class="title">这些人正在开团，可直接参与</div>
        <div class="content">
          <div :class="{group_info: isSlider}">
              <div v-for="item in group"
                :item="item"
                :key="item.group_id"
                class="group"
                :class="{anim:animate}"
                >   
                    <div class="left">
                        <img :src="item.header" alt="">
                        <div>{{item.username}}</div>
                    </div>
                    <div class="right">
                        <div class="time_tip">
                            <span>还差<span class="group_count">1人</span>拼成</span><br>
                            <count-down :endTime="end_timestamp" :tipText="'剩余'" class="count_down"></count-down>
                        </div>
                    
                        <div v-if="user_init==true"><span class="join_group" @click="join_group(item.group_id, item.phone)" :class="{self:is_self(item.phone)}">去拼单</span></div>
                    </div>
                </div>
          </div>
            
        </div>
        <message ref="message"></message>
    </div>
</template>

<script>
import store from '@/store/store'
import Message from '@/common/message/Message'
import CountDown from '@/common/countdown/CountDown'

export default {
    name: 'GroupShow',
    store,
    components: {
        CountDown,
        Message
    },
    props: {
        group: {}
    },
    data() {
        return {
            user: {},
            phone: '',

            end_timestamp: '',
            animate: false,
            intNum: '',
            total: '',
            key: 0,
            key1: 1,
            group_show: [],
            isSlider: false,

            isSelf: false,
            user_init: false
        }
    },
    methods: {
        count_down_end() {
            let now = new Date();
            let tomorrow = now.setTime(now.getTime()+24*60*60*1000);
            tomorrow = new Date(tomorrow)
            let end_time = (tomorrow.getFullYear()) + "/" + 
                        (tomorrow.getMonth() + 1) + "/" +
                        (tomorrow.getDate()) + " " + 
                        "10:00:00";
            this.end_timestamp = (new Date(end_time).getTime()/1000).toString();
        },
        join_group (id, phone) {
            if (phone==this.phone) { 
                this.$refs.message.show('拼单失败，不能与自己拼单哦', 'error', 
                document.documentElement.clientHeight * 0.8)
            } else {
                this.$emit('join_group', id)
            }
        },
        is_self(phone) {
            if (phone==this.phone) {
                return true
            } else {
                return false
            }
        }
    },
    created() {
        this.count_down_end();
        if (this.group.length > 2) {
            this.isSlider = true
        }
        
    },
    mounted() {
         if (this.$store.getters.getLoginStatus) {
            this.user = this.$store.getters.getUser
            this.phone = this.user.phoneNum.substring(0,3) + '****' + this.user.phoneNum.substring(7,11)
        }

        this.user_init = true
    },
}
</script>

<style scoped>
    .groups {
        overflow: hidden;
    }
    img {
        height: 30px;
        border-radius: 50%;
        margin-top: 10px;
        margin-right: 1.5vw;
    }

    .title {
        padding-left: 5%;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 0.9rem;
        font-weight: 400;
        border-bottom: 1px solid #eee;
    }

    .time_tip {
        line-height: 22px!important;
        color: #666;
        font-size: 0.8rem;
        text-align: right;
    }
    .count_down >>> span {
        background-color: #fff !important;
        color: #666 !important;
        font-weight: 500!important;
        font-size: 0.8rem;
    }

    .group {
        height: 50px;
        overflow: hidden;
        line-height: 50px;
        border-bottom: 1px solid #eee;
    }

    .group div {
        display: inline-block;
        vertical-align: top;
    }

    .group_count {
        color: #fe4470!important;
    }

    .join_group {
        margin-left: 2vw;
        color: #fff;
        background-color: #fe4470;
        border-radius: 5px;
        padding: 3px 10px;
        font-size: 0.8rem
    }
    .left {
        width: 30vw;
        height: 50px;
        overflow: hidden;
        margin-left: 5vw;
        font-size: 0.9rem;
    }

    .right {
        width: 60vw;
        height: 50px;
        overflow: hidden;
        text-align: right;
    }

    .self {
        background-color: 	#808080!important;
    }

    .content {
        min-height: 51px;
        max-height: 102px;
        overflow: hidden;
    }

    .group_info {
        animation: myMove2 5s linear infinite;
        animation-fill-mode: forwards;
    }

    @keyframes myMove2 {
    0% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(-51px);
    }
    50% {
        transform: translateY(-51px);
    }
    75% {
        transform: translateY(-102px);
    }
    100% {
        transform: translateY(-102px);
    }
    }
</style>