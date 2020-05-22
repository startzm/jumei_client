<template>
    <el-drawer
    :title="title"
    :visible.sync="drawer"
    :direction="direction"
    :size="size"
    :show-close="show_close"
    >
        <slot>aaaaaaaa</slot>
    </el-drawer>
</template>

<script>
export default {
    name: 'Drawer',
    props: {
        title: {
            type: String,
            default: ''
        },
        direction: {
            type: String,
            default: 'rtl'
        },
        size: {
            type: String,
            default: '60%'
        },
        show_close: {
            type: Boolean,
            default: true
        }
    },
    components: {
       
    },
    data() {
        return{
            drawer: false,
        }
    },
    methods: {
        show() {
            this.drawer = true
        },
        close() {
            this.drawer = false
        }
    },
    created: function () {
    
    }
}
</script>