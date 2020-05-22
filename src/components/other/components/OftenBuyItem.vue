<template>
    <div class="goods">
        <div class="product_img">
           <img v-lazy="item.image" class="good_img" @load="img_load">
       </div>
       <div class="product_detail">
           <p>
               <span class="product_title">{{ item.name }}</span>
           </p>
            <span class="jumei_price">
                ￥<span class="price_num">{{ item.discounted_price }}</span>
            </span>
            <span v-if="item.original_price != '' && item.original_price != 'None'" class="market_price">
                ￥{{ item.original_price }}
            </span><br>
            <span class="add_cart">
                <img src="@/assets/img/add_cart.png" alt="">
            </span>
            <span class="buytime">{{item.buy_time|dateFormat}} 购买过</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OftenBuyItem',
    props: {
        item: {}
    },
    methods: {
        img_load() {
            this.$emit('img_load')
        }
    },
    created() {
    },
}
</script>

<style scoped>
   .goods {
      height: calc(100vw * 0.3466);
      margin-top: 3%;
      width: 94%;
      margin-left: 3%;
      border-bottom: 1px solid #f5f5f5
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
      position: relative;
      padding-top: 1vw;
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
      margin-left: calc(100vw * 0.04 * -1);
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
     text-overflow: ellipsis;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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

  .buytime {
      color: #a7a7a7;
      font-size: 0.7rem;
      margin-top: 2vw;
  }
</style>