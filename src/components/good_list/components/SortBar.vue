<template>
    <div id="sort_content">
        <ul id="sort_bar">
            <li :class="{'active': isActive(0)}">
                <span @click="main_sort">综合
                    <i class="el-icon-arrow-down"></i></span>
            </li>

            <li :class="{'active': isActive(1)}">
                <span @click="price_sort">价格<i 
                :class="price_sort_type=='asce'?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
            </li>
            <li :class="{'active': isActive(2)}">
                <span @click="sales_sort">销量</span>
            </li>
            <li>
                <span @click="show_filter">筛选</span>
            </li>
        </ul>
    
    </div>
</template>

<script>

export default {
    name: 'SortBar',
    components: {
    },
    data () {
        return {
            price_sort_type: '',
            active: 0,
        }
    },
    methods: {
        show_filter () {
            this.$emit('show_filter')
        },
        price_sort () {
            this.active = 1;
            if (this.price_sort_type == 'desc') {
                this.price_sort_type = 'asce';
            } else {
                this.price_sort_type = 'desc';
            }
            this.$emit('price_sort', this.price_sort_type);
        },
        main_sort () {
            this.active = 0;
            this.price_sort_type = 'main';
            this.$emit('main_sort', this.price_sort_type);
        },
        price_sort () {
            this.active = 1;
            if (this.price_sort_type == 'desc') {
                this.price_sort_type = 'asce';
            } else {
                this.price_sort_type = 'desc';
            }
            this.$emit('price_sort', this.price_sort_type);
        },
        sales_sort () {
            this.active = 2;
            this.$emit('sales_sort');
        },
        isActive (key) {
            if (key==this.active) {
                return true
            }
        },
        close_drawer() {
            this.$refs.sort_drawer.close()
        }
    },

}
</script>

<style scoped>
    #sort_content {
        left: 0%;
        overflow: hidden;
         margin-left: calc(100vw * 0.1 * -1);
    }

    #sort_bar {
        background-color: #fff;
        padding-top: 1%;
        padding-bottom: 1%;
        display: flex;
        width: 100vw;
        margin-top: 0px;
        overflow: hidden;
    }
    #sort_bar li {
        text-align: center;
        flex: 1;
        display: inline-block;
        line-height: 30px;
    }

    #sort_bar li span {
        font-size: 0.7rem;
        display: inline-block;
        color: #333333;
        width: calc(100vw * 0.22);
        /* padding: 5% 28% 5% 28%; */
        background-color: #f5f5f5;
    }

    .active span{
        color: #fe4478 !important
    }

    .sort_drawer {
        position: relative;
    }
    
</style>