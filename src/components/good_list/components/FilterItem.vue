<template>
    <div class="filter-list" v-if="show_items.length!=0">
        <div class="filter_header">
            <span>{{ title }}</span>
            <span v-if="have_show_all" 
            class="show_all"
            @click="show_all_tag"
            >全部
                <i :class="show_all?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
            </span>
        </div>

        <slot></slot>

        <div class="filter_item" v-show="show_all">
            <span
            v-for="item in show_items"
            :key="item.id"
            :item_id="item.id"
            class="item"
            :class="{active: isActive(item.id)}"
            @click="filter_click(item.id)"
            >
                {{ item.name }}
            </span>
        </div>

        <div class="filter_item" v-show="!show_all">
            <span
            v-for="item in items"
            :key="item.id"
            :item_id="item.id"
            class="item"
            :class="{active: isActive(item.id)}"
            @click="filter_click(item.id)"
            >
                {{ item.name }}
            </span>
        </div>
    </div>

</template>

<script>
export default {
    name: 'FilterItem',
    props: {
        items: {},
        title: '',
        type: ''
    },
    data () {
        return {
            show_items: [],
            have_show_all: false,
            show_all: false,
            choose: 0
        }
    },
    methods: {
        show_all_tag () {
            if (!this.show_all) {
                this.show_all = true;
            } else {
                this.show_all = false;
            }
        },

        filter_click (key) {
            if (this.choose != key) {
                this.choose = key;
            } else {
                this.choose = 0;
            }
            
            if (this.type == 'price') {
                this.$emit('filter_click', this.type, this.items[key].min, this.items[key].max)
            }
            
        },

        isActive (key) {
            if (key == this.choose) {
                return true
            } else {
                return false
            }
        },
        reset () {
            this.choose = 0
        }
    },
    created () {
        this.show_items = this.items.length < 10? this.items: this.items.slice(0, 6);
        this.show_all = this.items.length > 10? true: false;
        this.have_show_all = this.items.length > 10? true: false;
        
    }
}
</script>

<style scoped>
    .filter-list {
        margin-top: 5%;
    }

    .filter_item {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 3% 0 3%;
        vertical-align: middle
    }

    .filter_header {
        padding: 3%;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        font-weight: 500;
    }

    .item {
        display: table-cell;
        width: 30%;
        background-color: #f5f5f5;
        color: #333333;
        line-height: 45px;
        margin-top: 3%;
        height: 45px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        vertical-align: middle;
        font-size: 0.7rem;
    }

    .filter_item .item:after{
        width: 30%;
         display: table-cell;
        height: 45px;
        content: ''
    }

    .show_all {
        float: right;
        font-size: 0.7rem;
    }

    .active {
        background-color: #fe4478;
        color: white;
    }
</style>