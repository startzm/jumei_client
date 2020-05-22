<template>
    <div class="integral">
        <head-bar 
        class="head"
        >
            <span slot="title">我的聚美积分</span>
            <span slot="button" class="intr" @click="to_rule">
                积分说明
            </span>
        </head-bar>

        <scroll
        class="content"
        ref="scroll"
        >
            <div class="my_integral">
                <div class="title">聚美积分</div>
                <div class='count'>{{count}}</div>
                <div class="freeze"><i class="el-icon-lock"></i>冻结积分: 0</div>
            </div>

            <div class="integral_detail">
                <i class="el-icon-coin"></i>
                积分明细
            </div>
            
            <integral-item
            v-for="(item, key) in integral_data"
            :item="item"
            :key="key"
            ></integral-item>
            
        </scroll>
    </div>
</template>

<script>
import { get_integral } from '@/network/other/integral'

import Scroll from '@/common/scroll/Scroll'
import HeadBar from '@/components/common/HeadBar'
import IntegralItem from './components/IntegralItem'

export default {
    name: 'Integral',
    components: {
        Scroll,
        HeadBar,
        IntegralItem
    },
    data() {
        return {
            integral_data: {},
            count: ''
        }
    },
    methods: {
        to_rule() {
            this.$router.push({
                name: 'IntegralRule'
            })
        }
    },
    created() {
        get_integral().then( res => {
            this.count = res.data.count;
            this.integral_data = res.data.record
        })
    }
}
</script>

<style scoped>
    .integral {
        background-color: #f5f5f5;
    }

    .head {
        z-index: 1000
    }


    .content {
        height: calc(100vh - 45px);
    }

    .intr {
        font-size: 0.9rem;
    }

    .my_integral {
        padding-top: 10vw;
        color: #fff;
        height: 30vw;
        text-align: center;
        background-image: linear-gradient(to right , #fa6aa0, #fe7a8a);
    }

    .title {
        font-size: 0.8rem;
    }
    .count {
        font-size: 2.2rem;
    
    }

    .freeze {
        font-size: 0.9rem;
    }

    .integral_detail {
        margin-top: 2vw;
        height: 45px;
        padding-left: 3vw;
        line-height: 45px;
        background-color: #fff;
        border-bottom: 1px solid #f5f5f5;
        font-size: 0.95rem;
        color: #666666
    }

    .integral_detail i {
        color: #a5a5a5;
        font-size: 1.5rem;
    }
</style>