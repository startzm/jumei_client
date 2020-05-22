<template>
   <div class="goods" v-if="Object.keys(item).length != 0" :id="id" @click="toDetail" ref="goods">
       <div class="product_img">
           <img v-lazy="img" class="good_img" @load="img_load" lazy>
       </div>
       <div class="product_detail">
           <p>
               <span class="product_title">{{ name }}</span>
           </p>
            <span class="jumei_price">
                ￥<span class="price_num">{{ discounted_price }}</span>
            </span>
            <span v-if="original_price != ''" class="market_price">
                ￥{{ original_price }}
            </span><br>
            <span class="sales_num">{{buyer_numer}}</span>

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
               name: '',
               discounted_price: '',
               original_price: '',
               buyer_numer: ''
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
            //   location.reload();
            
            
          },
          
          show_item (item) {
              this.id = item['item_id'];
              this.img = item['image'];
              this.name = item['name'];
              this.discounted_price = item['discounted_price'];
              this.original_price = item['original_price'];
              this.buyer_numer = item['buyer_numer']
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
      }
    }
</script>

<style scoped>
  .goods {
      height: calc(100vw * 0.3466);
      margin-top: 1%;
      width: 47vw;
      height: 77.5vw;
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
  

</style>
