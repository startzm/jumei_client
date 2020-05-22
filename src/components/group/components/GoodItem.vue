<template>
   <div class="goods" v-if="Object.keys(item).length != 0" :id="id" @click="toDetail">
       <div class="product_img">
           <span class="sales_num">已售出{{ fake_total_sales_number }}</span>
           <img :src="img" class="good_img" @load="img_load">
       </div>
       <div class="product_detail">
           <p>
               <span class="product_tip">[2人团]</span><span class="product_title">{{ title }}</span>
           </p>
            <span class="jumei_price">
                ￥<span class="price_num">{{ group_price }}</span>
            </span><br>
            <span v-if="market_price != '' && market_price != 'None'" class="market_price">
                单买价￥{{ market_price }}
            </span><br>
            <span class="add_cart">
                <img src="@/assets/img/add_cart.png" alt="">
            </span>

            <div class="go_group">
                去开团
            </div>
       </div>
     
  </div>
</template>

<script>
    export default {
      name: 'GoodItem',
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
                  name: 'GroupDetail',
                  query: {
                      'id': id,
                      group_price: this.group_price
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
            this.group_price = item['group_price'];
            this.market_price = item['market_price'];
            this.fake_total_sales_number = item['fake_total_sales_number'];
          }
      }

    }
</script>

<style scoped>
  .goods {
      height: calc(100vw * 0.7);
      margin-bottom: 3%;
      width: 100%;
      overflow: hidden;
      background-color: #fff;
  }

  .goods div {
      display: inline-block;
  }

  .product_img {
      width: 100%;
      height: calc(100vh * 0.18);
      position: relative;
      text-align: center
  }
  .product_detail {
      width: 92%;
      padding-left: 4%;
      position: relative;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
  }

   .sales_num {
      position: absolute;
      display: block;
      left: 0;
      top: 80%;
      font-size: 0.7rem;
      z-index: 1;
      padding: 2px 5px 2px 5px;
      border: .0625rem solid #eee;
      border-left: 0;
      border-top-right-radius: 1.5625rem;
      border-bottom-right-radius: 1.5625rem;
      color: #666;
      background: rgba(251,251,251,.8);
   }

  .good_img {
      height: 100%;
  }
  
  .product_detail p {
      margin-top: 0px;
      min-height: 2.5rem
  }

  .product_tip {
      color: #FE4070;
      border-radius: 4px;
      font-size: 0.9rem;
  }

  .product_title {
      font-size: 0.9rem;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .jumei_price {
      font-size: 1.1rem;
      color: #FE4070;
      font-weight: 500;
  }

  .price_num {
      font-size: 1.1rem;
  }

  .market_price {
      font-size: 0.7rem;
      color: #999999;
  }

  .go_group {
      position: absolute;
      top: 50%;
      right: 0;
      height: 28px;
      border-radius: 25px;
      line-height: 28px;
      font-size: 14px;
      width: 5.3rem;
      background: #fe4070;
      float: right;
      color: #fff;
      text-align: center;
      border-right: .0625rem solid #fe4070;
  }
 



</style>
