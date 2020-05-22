<template>
    <div>
        <head-bar 
        class="head"
        >
            <span slot="title">使用规则</span>
            <span slot="button"></span>
        </head-bar>

        <scroll
        class="content"
        >
            <rule-detail
            v-for="(item, key) in rule_data"
            :item="item"
            :key="key"
            ></rule-detail>

        </scroll>
    </div>
</template>

<script>
import HeadBar from '../../common/HeadBar'
import Scroll from '@/common/scroll/Scroll'
import RuleDetail from './RuleDetail'
import { get_coupon_rule } from '@/network/other/coupon'

export default {
    name: 'OtherRule',
    components: {
        HeadBar,
        Scroll,
        RuleDetail
    },
    data () {
        return {
            rule_data: {}
        }
    },
    created() {
        get_coupon_rule().then( res => {
            this.rule_data = res.data.items
        })
    },

}
</script>

<style scoped>
    .content {
        height: calc( 100vh - 55px )
    }
</style>