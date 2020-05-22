<template>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="80%"
    :modal="modal"
    :before-close="handleClose"
    style="margin-top: 20%"
    >
    <span>{{ introduce }}</span>
    <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="close" round>确 定</el-button>
    </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'Diaglog',
    props: {
        modal: true,
        handle_close: true
    },
    data() {
      return {
          introduce: '',
          dialogVisible: false
      }
    },
    methods: {
        show (introduce) {
            this.introduce = introduce
            this.dialogVisible = true
        },
        close () {
            this.dialogVisible = false
            this.$emit('diaglog_close')
        },
        handleClose(done) {
            if (this.handle_close) {
                this.$emit('diaglog_close')
            }
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
    }
</style>