<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name: 'Message',
    methods: {
        show(msg='操作成功！', type='', offset=20) {
            this.$message({
                showClose: true,
                message: msg,
                duration: 2000,
                center: true,
                offset: offset,
                type: type
            })
        }
    }
}
</script>

<style>
    .el-message{
        min-width: 0px !important;
        width: 60vw !important;
        top: 60%;
    }
</style>