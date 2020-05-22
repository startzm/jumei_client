<template>
        <drawer ref="drawer" 
            :size="'85%'"
            class="category_drawer"
            :show_close="false"
            >
                <div id="category_drawer_header">
          
                    <el-select
                    v-model="value"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入关键词"
                    default-first-option
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                    v-for="(item, key) in options"
                    :key="key"
                    :label="item"
                    :value="item"
                    @click="checked_option(item)"
                    >
                    </el-option>
                    </el-select>
                    <img src="@/assets/img/search_btn.png" @click="search">
                </div>
            <el-tree :data="data" 
            :props="defaultProps" 
            accordion 
            @node-click="handleNodeClick"
            class="el-tree"
            >
            </el-tree>
            </drawer>

</template>

<script>
import Drawer from '@/common/drawer/Drawer'

import { good_ajax_search } from '@/network/good/search'
import get_category from '@/network/good/get_category'

export default {
    name: 'Category',
    components: {
        Drawer
    },
    inject: ['reload'],
    data() {
        return {
            category_data: {},
            search_text: '搜索商品名称、品牌、功效',
            data: [],
            category_num: 0,
            defaultProps: {
                children: 'children',
                label: 'label'
            },

            options: [],
            value: '',
            list: [],
            loading: false,
            query: ''
            }
    },
    methods: {
      handleNodeClick(data) {
          if (!data.hasOwnProperty('children')) {
              let sub_categories = this.category_data[this.category_num]['sub_categories']
              for (let key in sub_categories) {
                  if (sub_categories[key]['name'] == data.label) {
                      this.close_drawer()
                      this.$router.push({
                          path: '/good_list',
                          query: {
                              'category_id': sub_categories[key]['category_id'],
                              'q': ''
                          }
                      })
                      this.$emit('reload')
                  }
              }
          } else {
              for (let key in this.category_data) {
                  if (this.category_data[key]['name'] == data.label) {
                      this.category_num = key
                  }
              }
          }
      },
      show () {
          this.$refs.drawer.show()
      },
      close_drawer() {
          this.$refs.drawer.close()
      },

      remoteMethod(q) {
          if (q!== '') {
              this.loading = true;
              this.load_data(q)
          } else {
              this.options = []
          }
          this.value = q
        },

      load_data (q) {
            this.loading = false;

            good_ajax_search({q: q}).then(res=>{
                this.options = res.data.data
            })
        },

        debounce(q, fn, wait) {
            var timeout = null;
            return function() {
                 
                if(timeout !== null) {
                    clearTimeout(timeout);
                    
                }
                timeout = setTimeout(fn, wait);
                    
            }
        },

        checked_option (item) {
            // this.value = item
            // this.close_drawer()
            // console.log(item);
            
            // this.$router.push({
            //     path: '/good_list',
            //     query: {
            //         'category_id': '',
            //         'q': item
            //     }
            // })

            
        },

        search () {
            
            this.close_drawer()
            this.$router.push({
                path: '/good_list',
                query: {
                    'category_id': 0,
                    'q': this.value
                }
            })
            this.reload()
            this.$emit("reload")
        }
    },

    watch: {
        
    },
    created() {
        get_category({}).then(res => {
            this.data = [];
            let category = {};
            let children_list = [];
            let child = {};
            this.category_data = res.data;
            let category_data = this.category_data

            let sub_categories = {}

            for (let item in this.category_data) {
                category = {};
                sub_categories = JSON.parse(category_data[item]['sub_categories'].replace(/'/g, '"'))
                this.category_data[item]['sub_categories'] = sub_categories;
                children_list = [];

                category['label'] = category_data[item]['name'];
                for (let sub in sub_categories) {
                    child = {};
                    child['label'] = sub_categories[sub]['name'];
                    children_list.push(child);
                }
                category['children'] = children_list;
                this.data.push(category)
            }
        })
    }

}
</script>

<style>
    input:focus{
        outline: none;
    }
    .category_drawer .el-tree-node__expand-icon {
        color: #eee;
        font-size: 1rem;

    }

    .category_drawer .el-tree-node__content {
        border-bottom: solid 1px #eee;
        height: 2.5rem;
        font-size: 14px;
    }

    .category_drawer .is-expanded {
        color: #fe4070;
    }

    .category_drawer .is-expanded .el-tree-node__expand-icon{
        color: #fe4070;
    }

    .category_drawer .el-tree-node__children .el-tree-node__expand-icon{
        z-index: -100
    }

    .category_drawer .el-tree-node__children .el-tree-node__content {
        background-color: #F5F5F5;
        border-bottom: solid 1px #fff;
        color: #606266;
    }
    
    .category_drawer #category_drawer_header {
        padding-bottom: 0.5rem;
        padding-left: 10%;
        border-bottom: solid 1px #eee;
        margin-top: -10%;
    }

    .category_drawer #category_drawer_header img {
        margin-left: -1.5rem;
        margin-top: 0.15rem;
        height: 1rem;
        width: 1rem;
        position: absolute;
    }

   .category_drawer #category_drawer_header a {
        font-size: 14px;
        color: #606266
   }

   .el-input__inner {
        background-color: #F5F5F5!important;
        height: 1.5rem!important;
        border-radius: 15px!important;
        box-shadow: 0 0 0 #F5F5F5!important;
        border: 1px solid #f1f1f1!important;
        padding-left: 1rem!important;
        margin-left: -1rem!important;
        width: calc( 100vw * 0.75)!important;
   }


   .el-select-dropdown {
       width: calc( 100vw * 0.75)!important;
       margin-left: 5vw;
   }

   .el-tag--small.el-tag--light {
       display: none;
   }

   .category_drawer {
       outline: none!important;
       overflow: hidden;
   }
</style>