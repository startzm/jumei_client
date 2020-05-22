<template>
    <div class="act_item">
        <div :style="style" class="img" @click="to_act"></div>
        <div class="info">
            <div class="title" @click="to_act"><span>会场</span>{{item.title}}</div>
            <div class="intr">{{intr}}</div>
            <div class="time">截止时间: {{date}}</div>
        </div>
        <span class="btn" @click="to_act">疯抢中</span>
    </div>
</template>

<script>
export default {
    name: "CalendarActItem",
    props: {
        item: {}
    },
    data() {
        return {
            style: {},
            intr: '',
            date: ''
        }
    },
    methods: {
        to_act() {
            this.$router.push({
                name: 'Act',
                query: {
                    id: this.item.url
                }
            })
        }
    },
    created() {
        this.style = {
            'background': 'url('+ this.item['img_url'] +') no-repeat',
            'background-position': 'center',
            'background-size': '50vw 25vw'
        }
        let nav = JSON.parse(this.item.nav.replace(/'/g, '"'))
        if (Object.keys(nav).length > 0) {
            this.intr = nav[Object.keys(nav)[0]]
        }

        let day = new Date();
        day.setTime(day.getTime()+24*60*60*1000);
        this.date = day.getFullYear()+"/" + (day.getMonth()+1) + "/" + day.getDate() + ' 9:59';
    },
}
</script>

<style scoped>
    .act_item {
        background-color: #fff;
        height: 25vw;
        border-bottom: 1px solid #eee;
        padding: 3vw;
        position: relative;
    }

    .img {
        height: 25vw;
        width: 25vw;
    }
    .act_item > div {
        display: inline-block;
        vertical-align: top;
    }

    .info {
        padding-left: 2vw;
    }

    .info span {
        color: #fff;
        background-color: #fe4470;
        border-radius: 5px;
        padding: 1px 3px;
        font-size: 0.7rem !important;
        font-weight: 500!important;
        margin-right: 1vw;
    }

    .title {
        font-size: 0.85rem;
        font-weight: 550
    }

    .btn {
        position: absolute;
        right: 3vw;
        bottom: 3vw;
        color: #fe4470;
        border:1px solid #fe4470;
        border-radius: 30px;
        padding: 3px 15px;
        font-size: 0.8rem;
    }

    .intr {
        margin-top: 2vw;
        font-size: 0.75rem;
        color: #737373
    }

    .time {
        position: absolute;
        bottom: 3vw;
        color: #737373;
        font-size: 0.7rem;
    }
</style>