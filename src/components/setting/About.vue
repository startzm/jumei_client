<template>
    <div class="about" v-if="Object.keys(rule_data).length!=0">
        <head-bar class="head">
            <span slot="title">关于聚美</span>
            <span slot="button"></span>
        </head-bar>

        <div class="logo">
            <img :src="rule_data['logo_info']['logo_url']" alt="">
        </div>

        <div
        v-for="(item, key) in rule_data.rules_list"
        :item="item"
        :key="key"
        @click="to_detail(item.url, item.title)"
        class="item"
        >
        {{item.title}}
        <span><i class="el-icon-arrow-right"></i></span>
        </div>

        
    </div>
</template>

<script>
import {get_rules} from '@/network/other/settings'

import HeadBar from '@/components/common/HeadBar'

export default {
    name: "ActivitiesCalendar",
    components: {
        HeadBar
    },
    data() {
        return {
            rule_data: {}
        }
    },
    methods: {
        to_detail (path, title) {
            this.$router.push({
                name: 'RuleDetail',
                params: {
                    path: path,
                    title: title
                }
            })

        }
    },
    created() {
        get_rules().then(res => {
            this.rule_data = res.data
        });
    },
}
</script>

<style scoped>
    .about {
        background-color: #f5f5f5;
    }
    .head {
        z-index: 1000;
    }

    .logo {
        height: 20vw;
        line-height: 20vw;
        text-align: center;
        width: 100vw;
    }

    .logo img {
        height: 8vw
    }

    .item {
        display: block;
        height: 45px;
        line-height: 45px;
        color: #000;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        padding-left: 3vw;
        font-size: 0.8rem;
        font-weight: 550
    }
    
    .item span {
        position: absolute;
        font-size: 1.2rem;
        color: #666;
        right: 3vw;
    }
</style>