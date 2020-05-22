<template>
    <div class="question_page">
        <head-bar>
            <span slot="title">绑定帐号</span>
            <span slot="button"></span>
        </head-bar>
        <div>
            <div
            v-for="(item, key) in banding_data.data"
            :item="item"
            :key="key"
            class="item"
            >
                <span><img :src="item.site_img_logo" alt=""></span>
                <span class="name">{{item.site_name}}</span>

                <span
                v-if="is_phone(item)"
                class="banded"
                >
                <i class="el-icon-check"></i>
                已绑定
                <i class="el-icon-arrow-right"></i></span>

                <span
                v-else
                >未绑定
                    <i class="el-icon-arrow-right"></i></span>
            </div>
        </div>

    
    </div>
</template>

<script>
import {get_banding} from '@/network/other/settings'

import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'Banding',
    data() {
        return {
            banding_data: {},
        }
    },
    components: {
        HeadBar
    },
    created() {
        get_banding().then(res=> {
            this.banding_data = res.data
            
        })
    },
    methods: {
        is_phone(item) {
            return item.order == 0? true: false
        }
    },
}
</script>

<style scoped>
    .item img {
        margin-top: 10px;
        margin-right: 2vw;
        height: 35px;
    }


    .item span {
        display: inline-block;
        vertical-align: top;
        height: 60px;
        line-height: 60px;
    }

    .item span:first-child {
        vertical-align: middle;
    }
    .item {
        padding-left: 3vw;
        padding-right: 3vw;
        height: 60px;
        line-height: 60px;
        font-size: 0.8rem;
        position: relative;
        border-bottom: 1px solid #f5f5f5
    }

    .item span:last-child {
        font-size: 0.7rem;
        position: absolute;
        right: 3vw;
        color: #9a9a9a
    }

    .banded {
        color: #000!important;

    }

    .banded i:first-child {
        color: #fff;
        background-color: #94dca4;
        border-radius: 50%;
    }
</style>