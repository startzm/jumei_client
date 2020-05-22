<template>
    <div>
        <head-bar>
            <span slot="title">新消息设置</span>
            <span slot="button"></span>
        </head-bar>
        <div>
            <div
            v-for="(items, key) in items_list"
            :items="items"
            :key="key"
            class="setting_group"
            >
                <message-item
                v-for="item in items"
                :item="item"
                :key="item.type_id"
                ></message-item>
            </div>
        </div>

        <div class="bgc"></div>
    </div>
</template>

<script>
import {get_message_settings} from '@/network/other/settings'

import HeadBar from '@/components/common/HeadBar'
import MessageItem from './components/MessageItem'

export default {
    name: 'MessageSettings',
    components: {
        HeadBar,
        MessageItem
    },
    data() {
        return {
            items_list: {}
        }
    },
    created() {
        get_message_settings().then( res => {
            this.items_list = res.data.data
        })
    },
}
</script>

<style scoped>
.bgc {
    background-color: #f3f3f3;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -100;
}

.setting_group {
    background-color: #fff;
    margin-top: 3vw;
    border-bottom: 1px solid #d5d5d5
}

</style>