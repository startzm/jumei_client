<template>
   <div class="goods" v-if="Object.keys(item).length != 0" :id="id" ref="goods">
       <div class="product_img" @click="toDetail">
           <img v-lazy="img" class="good_img" @load="img_load" lazy>
       </div>
       <div class="product_detail">
           <p>
               <span class="product_tip" v-if="tag == 4">全球购</span>
               <span class="product_title" @click="toDetail">{{ title }}</span>
           </p>
            <span class="jumei_price" @click="toDetail">
                ￥<span class="price_num">{{ jumei_price }}</span>
            </span>
            <span v-if="market_price" class="market_price" @click="toDetail">
                ￥{{ market_price }}
            </span><br>
            <span class="sales_num" @click="toDetail">{{product_desc}}</span>
            <p class="tip_desc">
                <span v-if="this.tip_desc != ''">{{ tip_desc }}</span>
                <span v-if="this.time_desc != ''" class="time_desc">{{ time_desc }}</span>
            </p>
       </div>
        <span class="add_cart" @click="add_cart">
            <img src="@/assets/img/add_cart.png" alt="">
        </span>

        <message ref="message"></message>
  </div>
</template>

<script>

    import store from '@/store/store'
    import Message from '@/common/message/Message'
    import {add_cart} from '@/network/user/cart'

    export default {
      name: 'MenuItem',
      props: {
          item: {}
      },
      components: {
          Message
      },
      data() {
          return {
               good_item: this.item,
               id: '',
               img: '',
               countries_icon: '',
               tip_desc: '',
               title: '',
               tag: '',
               jumei_price: '',
               market_price: '',
               product_desc: '',
               time_desc: ''
          }
      },
      created() {
           this.show_item (this.good_item);
      },
      mounted() {
        
      },
      methods: {
          img_load () {
              this.$emit('img_load')
          },
          toDetail () {
              const id = this.id
              this.$router.push({
                  name: 'GoodDetail',
                  params: {
                      'id': id
                  }
              })
          },
          
          show_item (item) {
              this.id = item['item_id'];
              this.img = item['image_url_set']["single"]["800"];
              this.countries_icon = item['countries_icon']["800"];
              this.tag = item['tag_id'][0]
              this.tip_desc = item['tip_desc'][0]; 
              this.title = item['middle_name'];
              this.jumei_price = item['jumei_price'];
              this.market_price = item['market_price'];
              this.product_desc = item['product_desc'];
              this.time_desc = item['time_desc']
          },
           add_cart () {
              add_cart({'item_id': this.id}).then(res=> {
                if (res.data == 1) {
                    this.$refs.message.show('加入购物车成功', 'success', 
                    document.documentElement.clientHeight * 0.8)
                    this.$store.dispatch('add_cart_count', 1)
                    this.cart_count = this.$store.getters.getCartCount
                } else {
                    this.$refs.message.show('加入购物车失败', 'error', 
                    document.documentElement.clientHeight * 0.8)
                }
            })
          }
      },
      watch: {
          item: {
              immediate: true,
              handler (val) {
                  this.good_item = val;
                  this.show_item(this.good_item)
              }
          }
      },

    }
</script>

<style scoped>
  .goods {
      height: calc(100vw * 0.3466);
      position: relative;
      margin-top: 1%;
      width: 47vw;
      height: 85vw;
      margin-left: 2%;
      overflow: hidden;
      background-color: #fff;
      display: inline-block;
  }

  .good_img {
      width: 100%;
  }
  .product_detail {
      padding: 5px;
  }

  .product_detail p {
      margin-top: 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
  }

  .product_tip {
      background-color: #FE4070;
      color: white;
      border-radius: 4px;
      font-size: 0.7rem;
      padding: 1px 3px 1px 3px;
  }

  .product_title {
      font-size: 0.9rem;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .tip_desc span{
      font-size: 0.6rem;
      margin-top: -1rem;
      color: #a2a2a2
  }

  .jumei_price {
      font-size: 0.7rem;
      font-weight: bolder;
      color: #FE4070
  }

  .price_num {
      font-size: 1rem;
  }

  .market_price {
      font-size: 0.7rem;
      color: #a2a2a2;
      text-decoration-line: line-through
  }

  .sales_num {
      font-size: 0.7rem;
      color: #a2a2a2
  }
  
  .time_desc {
      border: 1px solid #fe4070;
      color: #fe4070 !important;
      border-radius: 5px;
      padding-left: 3px;
      padding-right: 3px;
  }
  
  .add_cart {
      background-color: #aaa!important;
      height: calc(100vw * 0.1);
      width: calc(100vw * 0.1);
      position: absolute;
      display: flex;
      border-radius: 50px;
      right: 2vw;
      bottom: 2vw;
  }

  .add_cart img {
      height: 60%;
      margin: auto
  }
</style>
