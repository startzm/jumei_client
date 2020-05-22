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

       </div>
    </div>
</template>

<script>
export default {
    name: 'HistoryGood',
    components: {
    },
    props: {
        item: {}
    },
    data() {
        return {
        }
    },
    created() {
        
    },
    methods: {
        img_load () {
            this.$emit('img_load')
        }
    },
}
</script>


<style scoped>
  .goods {
      display: block;
      height: calc(100vw * 0.3466);
      background-color: #fff;
      width: 100%;
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
      padding-top: 3%;
      width: 59%;
      float: right;
      overflow: hidden;
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
      padding-right: 3vw;
      height: 12vw;
      line-height: 6vw;
      text-overflow: ellipsis;
      overflow: hidden;
  }
  .product_title {
      font-size: 0.8rem;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
  }

  .jumei_price {
      font-size: 0.9rem;
      font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
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
</style>