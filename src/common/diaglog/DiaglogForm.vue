<template>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="80%"
    :modal="true"
    :before-close="handleClose"
    style="margin-top: 20%"
    >
    
    <slot>

    </slot>

    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="info" @click="submit" round>确 定</el-button>
    </el-dialog>
</template>

<script>
export default {
    name: 'Diaglog',
    props: {
        modal: true,
    },
    data() {
      return {
          introduce: '',
          dialogVisible: false
      }
    },
    methods: {
        show () {
            this.dialogVisible = true
        },
        submit () {
            this.dialogVisible = false
            this.$emit('submit')
        },
        handleClose(done) {
            this.$emit('diaglog_close')
            done();
        }
    }
}
</script>


<style>
    .is-round {
        background-color: #fe4470 !important;
        border: 1px solid #fe4470
    }

    .el-dialog {
        border-radius: 10px !important;
        z-index: 3000!important;
        position: absolute;
    }

     .v-modal {
        z-index: 1000!important;
    }
</style>