<template>
   <div class="goods" v-if="Object.keys(item).length != 0" :id="id" @click="toDetail">
       <div class="product_img">
           <img v-lazy="img" class="good_img" @load="img_load">
       </div>
       <div class="product_detail">
           <p>
               <span class="product_title">{{ title }}</span>
           </p>
            <span class="jumei_price">
                ￥<span class="price_num">{{ jumei_price }}</span>
            </span>
            <span v-if="market_price != '' && market_price != 'None'" class="market_price">
                ￥{{ market_price }}
            </span><br>
            <span v-if="show_desc" 
            class="desc">{{item.product_desc}}</span>
       </div>
     
  </div>
</template>

<script>
    export default {
      name: 'RecommendItem',
      props: {
          item: {},
          show_desc: false
      },
      data() {
          return {
               id: '',
               img: '',
               title: '',
               jumei_price: '',
               market_price: '',
          }
      },
      created() {
          let item = this.item
          this.id = item['item_id'];
          if (typeof(item['image_url_set']) == 'string') {
                this.img = JSON.parse(item['image_url_set'].replace(/'/g, '"'))["single"]["800"];
           } else {
                this.img = item['image_url_set']["single"]["800"];
           }
          this.title = item['middle_name'];
          this.jumei_price = item['jumei_price'];
          this.market_price = item['market_price']
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
              });
            //   location.reload();
          }
      }

    }
</script>

<style scoped>
  .goods {
      height: calc(100vw * 0.3466);
      margin-top: 1%;
      width: 47vw;
      height: 76vw;
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

  .desc {
      display: block;
      font-size: 0.7rem;
      margin-bottom: -0.2rem;
      color: #a4a4a4
  }

  
</style>
