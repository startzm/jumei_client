<template>
    <div class="check_all_bar">
        <div class="check_all">
           <span class="check" @click="all_checked" :class="{active:checked}">
                <i class="el-icon-check"></i>
            </span>
            <span class="all">
                全选
            </span>
        </div>


        <div class="btn-group">
            <span class="collect" @click="collect_good">移入收藏</span>
            <span class="remove_cart" @click="remove_good">删除商品</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'EditBar',
    props: {
        checked_all: true
    },
    data () {
        return {
            checked: true
        }
    },
    methods: {
        remove_good () {
            this.$emit('remove_good')
        },
        all_checked () {
            this.$emit('all_checked')
            this.checked = !this.checked
        },
        collect_good () {
            this.$emit('collect_good')
        }
    },
    created() {
        if (!this.checked_all) {
            this.checked == false
        } else {
            this.checked == true
        }
    },
}
</script>

<style scoped>
    .check_all_bar {
        position: fixed;
        z-index: 1000;
        bottom: 50px;
        height: 45px;
        line-height: 45px;
        padding-left: 3%;
        padding-right: 3%;
        background-color: #fff;
        width: 100vw;
        border-top: 1px solid #eee;
    }
    .check_all_bar div {
        display: inline-block;
    }

    
     .check {
        background-color: #fff;
        color: white;
        border-radius: 50%;
        padding: 0px 2px 0px 2px;
        border: 1px solid #333;
    }

    .active {
        border: 1px solid #fe4470 !important;
        background-color: #fe4470;
    }

    .all {
        font-weight: 550;
    }

    .collect {
        border: 1px solid #f3f3f3;
        color: #494948;
        padding: 8px 18px 8px 18px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .remove_cart {
        border: 1px solid #fe4470;
        color: #fe4470;
        padding: 8px 18px 8px 18px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
    }

    .btn-group {
        float: right;
        margin-right: 8%;
    }
</style>