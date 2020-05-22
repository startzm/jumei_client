<template>
    <div id="property">
        <p v-for="(item, key) in properties" :key="key">
            <span class="property_name">{{ item.name }}</span>
            <span class="property_value">{{ item.value }}</span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'property',
    props: {
        'properties': {}
    },
    data () {
        return {
             
        }
    },

}
</script>

<style scoped>
   #property {
       padding: 3%;
       font-size: .8rem;
       color: #222222;
   }


   .property_name {
       display: inline-block;
       width: 20%;
       color: #999999;
   }

   .property_value {
        display: inline-block;
       width: 75%;
   }


</style>