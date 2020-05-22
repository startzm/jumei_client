<template>
   <div class="goods" v-if="Object.keys(item).length != 0" :id="id">
       <div class="product_img" @click="toDetail">
           <img class="good_img" @load="img_load" v-lazy="img">
           <img :src="countries_icon" class="country_icon">
       </div>
       <div class="product_detail">
           <p>
               <span class="product_tip" v-if="tip_desc != ''" @click="toDetail">{{ tip_desc }}</span>
               <span class="product_title" @click="toDetail">{{ title }}</span>
           </p>
            <span class="jumei_price" @click="toDetail">
                ￥<span class="price_num">{{ jumei_price }}</span>
            </span>
            <span v-if="market_price" class="market_price" @click="toDetail">
                ￥{{ market_price }}
            </span><br>
            <span class="sales_num">已售出{{ fake_total_sales_number }}</span>
            <span class="add_cart" @click="add_cart" :class="{category: is_category}">
                <img src="@/assets/img/add_cart.png" alt="">
            </span>
       </div>
        <message ref="message"></message>
  </div>
</template>

<script>
    import store from '@/store/store'
    import Message from '@/common/message/Message'
    import {add_cart} from '@/network/user/cart'

    export default {
      name: 'GoodItem',
      store,
      components: {
          Message
      },
      props: {
          item: {}
      },
      data() {
          return {
               good_item: this.item,
               id: '',
               img: '',
               countries_icon: '',
               tip_desc: '',
               title: '',
               jumei_price: '',
               market_price: '',
               fake_total_sales_number: ''
          }
      },
      watch: {
          item: {
              immediate: true,
              handler (val) {
                  this.good_item = val
                  this.show_item(this.good_item)
              }
          }
      },
      created() {
          let item = this.good_item;
          this.show_item(this.good_item)
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
          show_item(item) {
            this.id = item['item_id'];
          
            if (typeof(item['image_url_set']) == 'string') {
                this.img = JSON.parse(item['image_url_set'].replace(/'/g, '"'))["single"]["800"];
                this.countries_icon = JSON.parse(item['countries_icon'].replace(/'/g, '"'))["800"];
                this.tip_desc = item['tip_desc'].replace(/'/g, '').replace('[', '').replace(']', ''); 
            } else {
                this.img = item['image_url_set']["single"]["800"];
                this.countries_icon = item['countries_icon']["800"];
                this.tip_desc = item['tip_desc'][0]; 
            }
            this.title = item['middle_name'];
            this.jumei_price = item['jumei_price'];
            this.market_price = item['market_price'];
            this.fake_total_sales_number = item['fake_total_sales_number'];
          },

          add_cart () {
              add_cart({'item_id': this.id}).then(res=> {
                if (res.data == 1) {
                    this.$refs.message.show('加入购物车成功', 'success', 
                    document.documentElement.clientHeight * 0.8)
                    this.$store.dispatch('add_cart_count', this.item)
                    this.cart_count = this.$store.getters.getCartCount
                } else {
                    this.$refs.message.show('加入购物车失败', 'error', 
                    document.documentElement.clientHeight * 0.8)
                }
            })
          }
           
      },
      computed: {
          is_category () {
              
              if (this.$route.name == 'Home') {
                  return false
              } else {
                  return true
              }
          }
      },

    }
</script>

<style scoped>
  .goods {
      height: calc(100vw * 0.3466);
      margin-top: 3%;
      width: 94%;
      margin-left: 3%;
  }

  .goods div {
      display: inline-block;
  }

  .product_img {
      width: 40%;
      height: 100%;
      position: relative;
  }
  .product_detail {
      width: 56%;
      float: right;
  }

  .good_img {
      height: 100%;
      margin-left: calc(100vw * 0.01);

  }

  .country_icon {
      height: 2rem;
      position: absolute;
      z-index: 1000;
      margin-left: calc(100vw * 0.05 * -1);
      margin-top: calc(100vw * 0.01 );
  }
  
  .product_detail p {
      margin-top: 0px;
  }

  .product_tip {
      background-color: #FE4070;
      color: white;
      border-radius: 4px;
      font-size: 0.7rem;
      padding: 3px;
  }

  .product_title {
      font-size: 0.8rem;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      overflow: hidden;
  }

  .jumei_price {
      font-size: 0.9rem;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-weight: bolder;
      color: #FE4070
  }

  .price_num {
      font-size: 1.4rem;
  }

  .market_price {
      font-size: 0.8rem;
      color: #a2a2a2;
      text-decoration-line: line-through
  }

  .sales_num {
      font-size: 0.7rem;
  }


  .add_cart {
      background-color: #FE4070;
      height: calc(100vw * 0.1);
      width: calc(100vw * 0.1);
      position: absolute;
      display: flex;
      border-radius: 50px;
      right: 7%;
      margin-top: -10%
  }

  .add_cart img {
      height: 60%;
      margin: auto
  }

  .category {
      background-color: #aaa!important;
  }
</style>
