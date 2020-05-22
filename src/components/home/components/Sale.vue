<template>
    <div id="sale-header" v-if="Object.keys(items).length != 0">
        <img :src="items[0]['img']['1200']" alt="">
        <count-down :endTime="end_timestamp" :tipText="'疯抢仅剩'" @refresh="refresh"></count-down>
    </div>
</template>

<script>
import CountDown from '@/common/countdown/CountDown'

export default {
    name: 'SetDiamondZone',
    components: {
        CountDown
    },
    props: {
        items: {}
    },
    data() {
        return {
            end_timestamp: ''
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
        refresh() {
            this.$emit('refresh')
        }
    },
    created() {
        this.count_down_end()
    },
}
</script>

<style scoped>
    #sale-header {
        background:	#f5f5f5;
        padding-top: 3%;
        padding-bottom: 2%;
        text-align: center
    }

    #sale-header img {
        width: 100%;
        height: calc(100vw * 0.077)
    }

    .diamond-count {
        font-size: 5px;
        background: #EEB422;
        border-radius: 10px;
        text-align: center;
        color: white;
    }
</style>