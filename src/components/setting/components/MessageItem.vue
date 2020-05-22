<template>
    <div class="item" v-if="Object.keys(item).length!=0">
        <span>
            {{item.type_name}}
        </span>
        <span class="switch">
            <el-switch
            v-model="status"
            active-color="#fe4470"
            @change="switch_change"
            >
            </el-switch>

        </span>
        <message ref="message"></message>
    </div>
</template>

<script>
import {set_message_settings} from '@/network/other/settings'

import Message from '@/common/message/Message'
export default {
    name: 'MessageItem',
    props: {
        item: {}
    },
    components: {
        Message
    },
    data() {
        return {
            status: true,
            time: 10
        }
    },
    methods: {
        switch_change(status) {
            let s = status?1: 0
            set_message_settings({id: this.item.type_id, status: s}).then(res => {
                if (res.data == 0) {
                    this.$refs.message.show('操作失败', 'error', 
                    document.documentElement.clientHeight * 0.8)
                }
            })
        }
    },
    created() {
        this.status = this.item.status==1?true: false
        
    }
}
</script>

<style scoped>
    .item {
        height: 45px;
        border-bottom: 1px solid #f3f3f3;
        line-height: 45px;
        padding: 0 3vw;
        font-size: 0.95rem;
    }

    .active-icon-class {
        background-color: #fe4470;
    }

    .switch{
        float: right;
    }

</style>