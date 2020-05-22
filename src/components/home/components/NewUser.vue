<template>
    <div id="new-user" v-if="Object.keys(items).length != 0" @click="to_act">
        <img :src="items['0']['img']['1080']" alt="">
    </div>
</template>

<script>
export default {
    name: 'NewUser',
    props: {
        items: {}
    },
    methods: {
        to_act() {
            this.$router.push({
                    name: 'Act',
                    query: {
                        id: 'xinren'
                    }
                })
        }
    },
}
</script>

<style>
   #new-user {
       margin-top: 2%;
   }

   #new-user img {
       width: 100%;
   }
</style>