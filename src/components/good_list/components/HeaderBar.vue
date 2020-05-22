<template>
    <div id="header-bar">
        <div>
            <span id="back" @click="go_back">
                <i class="el-icon-arrow-left"></i>
            </span>
            <span id="search" @click="show_category">
                <input type="text" :placeholder="search_text" disabled >
            </span>
            <span id="category" v-show="index==0">
                <button @click="switch_type" id="category_btn">
                    <i :class="icon_class"></i>
                </button>
            </span>
        </div>
        <br>
        
    </div>
</template>

<script>
import DescriptionNav from '../../common/DescriptionNav'

export default {
    name: 'MainHeadeBar',
    components: {
        DescriptionNav
    },
    props: {
        show_type: '',
        index: '',
        q: ''
    },
    data() {
        return {
            default_text: '搜索商品 分类 功效',
            nav_items: ['商品', '口碑', '店铺'],
            nav_num: 3
        }
    },
    methods: {
        switch_type () {
            this.$emit('switch_type')
        },
        go_back () {
            this.$router.go(-1)
        },
        show_category() {
            this.$emit('show_category')
        }
    },
    computed: {
        icon_class () {
            if (this.show_type == 'list') {
                return 'el-icon-menu'
            } else {
                return 'el-icon-tickets'
            }
        },
        search_text () {
            if (this.q) {
                return this.q
            } else {
                return this.default_text
            }
        }
    },
}
</script>

<style scoped>
    #header-bar {
        height: 45px;
        width: 100vw;
        background-color: white;
        display: flex
    }

    #back {
        background-color: #fff;
        border: none;
        position: absolute;
        margin-top: 0.2rem;
        left: 3%;
    }

    i {
        font-size: 1.4rem;
        color: #676767
    }

    #header-bar div {
        margin-top: 2vw;
        margin-left: 5vw;
        text-align: center;
    }

    #search {
        width: calc( 100vw * 0.6)
    }

    #category {
        width: 15%
    }
    #search input{
        background-color: #F5F5F5;
        height: 1.5rem;
        border-radius: 15px;
        box-shadow: 0 0 0 #F5F5F5;
        border: 1px solid #f1f1f1;
        text-align: center;
        margin-left: 1.4rem;
        width: calc( 100vw * 0.7)
    }

    #category_btn {
        margin-left: 0.3rem;
        height: 1.5rem;
        width: 2rem;
        padding: 0;
        text-align: center;
        vertical-align: middle;
        border: 0;
        background-color: #fff;
    }

</style>