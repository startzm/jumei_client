<template>
    <div class="address-item" 
        @click="edit_address">
        <div class="address-left">
            <i class="el-icon-location-outline"></i>
        </div>
        <div class="address-center" v-if="item.phoneNum">
            <div class="address_head">
            <span class="default_icon">默认</span>
            <span>收货人：{{"*" + item.name.substring(1,)}}</span>
            <span class="phone">{{item.phoneNum.substring(0,3) + "****" + item.phoneNum.substring(7,11)}}</span>
            </div>

            <div class="address">
                {{item.city}} {{item.detailAdd}}
            </div>
            
        </div>
        <div class='tip' v-else>您还未设置收货地址，请前往设置</div>
        <div class="address-right">
            <i class="el-icon-arrow-right"></i>
        </div>
        

    </div>
</template>

<script>
export default {
    name: 'DefaultAddress',
    props: {
        item: {}
    },
    methods: {
         edit_address() {   
            this.$router.push({
                path: 'address'
            })
        }
    },
    created() {
    },

}
</script>

<style scoped>
     .address-item {
        padding-left: 3%;
        padding-right: 3%;
        background-color: #fff;
        min-height: 15vw;
        position: relative;
        margin-bottom: 2.5%;
        border-bottom: 1px solid #eee;
        color: #33444e;
        font-weight: 550;
    }

    i {
        color: #a6a6a6;
        font-size: 1.2rem
    }

    .address_head {
        height: 8vw;
        line-height: 8vw;
        font-size: 0.9rem;
    }
    
    .phone {
        position: absolute;
        right: 12vw;
    }

    .address {
        font-size: 0.7rem;
        color: #33444e;
        height: 10vw;
    }

    .default_icon {
        background-color: #fe4470;
        color: #fff;
        font-size: 0.7rem;
        padding: 0 4px 0 4px;
        border-radius: 3px;
    }

    .address-left {
        display: inline-block;
        width: 6vw;
        font-size: 1.2rem;
    }
    .address-center {
        display: inline-block;
        width: 75vw;
    }
    .address-right {
        position: absolute;
        display: inline-block;
        top: 6vw;
        right: 3vw;
    }

    .tip {
        display: inline-block;
        font-size: 0.9rem;
        line-height: 45px;
    }
</style>