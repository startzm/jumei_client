<template>
    <div class="address-item">
        <div class="address_head">
            <span v-if="isDefault" class="default_icon">默认</span>
            <span>{{"*" + item.name.substring(1,)}}</span>
            <span class="phone">{{item.phoneNum.substring(0,3) + "****" + item.phoneNum.substring(7,11)}}</span>
        </div>

        <div class="address">
            {{item.city}} {{item.detailAdd}}
        </div>

        <span class="edit" @click="edit_address">
            <i class="el-icon-edit-outline"></i>
        </span>

        <div class="address_default" v-if="isDefault">
            <span class="check">
                <i class="el-icon-check"></i>
            </span>
            <span class="set_text">默认地址</span>
        </div>

        <div class="address_default" v-else>
            <div class="set" @click="set_default">
            </div>
            <span class="set_text">设为默认地址</span>
        </div>
    </div>
</template>

<script>
import { change_address } from '@/network/user/address'

export default {
    name: 'AddressItem',
    props: {
        item: {},
        default: ''
    },
    methods: {
        set_default () {
            this.item['isDefault'] = 1
            change_address(this.item).then( res => {
                if (res.data == 1) {
                    this.$emit('change_default', this.item.id)
                }
            })
        },
        edit_address () {
            this.$router.push({
                name: 'NewAddress',
                params: {
                    isChange: true,
                    data: this.item
                }
            })
        }
    },
    computed: {
         isDefault () {         
            if (this.default == this.item.id) {
                return true
            } else {
                return false
            }
        }
    },
}
</script>

<style scoped>
    .address-item {
        padding-left: 3%;
        padding-right: 3%;
        background-color: #fff;
        height: 28vw;
        position: relative;
        margin-bottom: 2.5%;
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
        color: #9a9a9a;
        height: 10vw;
    }

    .edit {
        position: absolute;
        font-size: 2rem;
        right: 2vw;
        top: 2vw;
        color: #9a9a9a
    }

    .check {
        background-color: #fe4470;
        color: white;
        border-radius: 50%;
        padding: 0px 2px 0px 2px;
        height: 16px;
        width: 16px;
    }

    .set {
        display: inline-block;
        color: white;
        height: 16px;
        width: 16px;
        border: 1px solid #000;
        border-radius: 50%;
    }

    .set_text {
        display: inline-block;
        margin-top: -3px;
        font-size: 0.8rem;
    }

    .default_icon {
        background-color: #fe4470;
        color: #fff;
        font-size: 0.7rem;
        padding: 0 4px 0 4px;
        border-radius: 3px;
    }
</style>