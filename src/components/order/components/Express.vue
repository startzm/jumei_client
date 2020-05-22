<template>
    <div class="express">
        <div class="title">
            <span><i class="el-icon-truck"></i></span>
            物流跟踪</div>
        <div class="type">
            <img :src="express.logo" alt="">
            <div>
                <div>国内承运人：<span>{{express.typename}}</span></div>
                <div class="id">运单号：{{express.number}}</div>
            </div>
            <span class="deliverystatus" v-if="express.deliverystatus==3">已签收</span>
        </div>
        <div class="detail">
            <el-timeline>
                <el-timeline-item
                :color="point_color(key)"
                :icon="point_icon(key)"
                v-for="(item, key) in list"
                :timestamp="item.time"
                :key="key"
                placement="top">
                    <el-card>
                        <p>{{item.status}}</p>
                    </el-card>
                </el-timeline-item>
        
            </el-timeline>
            <div class="show" @click="show_all">展开
                <span v-if="!showAll"><i class="el-icon-arrow-down"></i></span>
                <span v-else><i class="el-icon-arrow-up"></i></span></div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        express: {}
    },
    data() {
        return {
            list: [],
            showAll: false
        }
    },
    methods: {
        show_all() {
            if (!this.showAll) {
                 this.list = this.express.list
                 this.showAll = true
            } else {
                this.list = []
                this.list.push(this.express.list[0], this.express.list[1])
                this.showAll = false
            }
           
        },
        point_color (key) {
            if (key == 0 && this.express.deliverystatus == 3) {
                return '#0BBD87'
            } else {
                return '#409eef'
            }
        },
        point_icon (key) {
            if (key == 0 && this.express.deliverystatus == 3) {
                return 'el-icon-check'
            } else {
                return ''
            }
        }
    },
    created() {
        this.list.push(this.express.list[0], this.express.list[1])
    },

    
}
</script>

<style scoped>
    .express {
        font-size: 0.7rem;

        background-color: #fff;
    }

    .express >>> .el-card__body{
        font-size: 0.7rem!important;
        color: #666;
        padding: 0 2vw 0 2vw!important;
    }

    .express >>> .el-card {
        width: 70vw !important;
    }

    .show {
        text-align: center;
        font-size: 0.8rem;
        color: #a6a6a6
    }

    .title {
        font-size: 0.9rem;
        height: 45px;
        line-height: 45px;
        color: #33444e;
        font-weight: 550;
        margin-left: 3vw;
        border-bottom: 1px solid #f5f5f5;
    }
    
    .title i {
        font-size: 1.2rem !important;
        margin-right: 1vw;
        color: #a6a6a6
    }

    .type {
        height: 60px;
        line-height: 40px;
        margin-left: 3vw;
        position: relative;
        border-bottom: 1px solid #f5f5f5
    }

    .type img {
        margin: 10px;
        display: inline-block;
        vertical-align: top;
        height: 40px;
    }

    .detail {
        margin-top: 5vw;
        padding-bottom: 4vw;
    }

    .type > div {
        display: inline-block;
        vertical-align: top;
        height: 60px;
        overflow: hidden;
        margin-top: 10px;
    }
    .type > div > div {
        display: block;
        height: 20px;
        line-height: 20px !important;
        font-size: 0.85rem;
        margin-left: 3vw;
        margin-top: 0px;
        color: #333
    }

    .type > div > div > span {
        color: #0BBD87
    }

    .id {
        font-size: 0.7rem!important;
        color: #666!important
    }

    .deliverystatus {
        font-size: 0.8rem;
        color: #a6a6a6;
        position: absolute;
        height: 58px;
        line-height: 58px;
        right: 3vw;
        top: 0;
        display: inline-block;
    }
</style>