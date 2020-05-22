<template>
    <div class="all_activities">
       <div
       v-for="(item, key) in act"
       :item="item"
       :key="key"
       class="activity"
       >
            <div class="activity_header">
                <div class="tag">
                    {{ item['tag'] }}
                </div>
                <div class="title">
                    {{ item['title'] }}
                </div>
            </div>
            <img :src="item['img_url']" alt="" @click="to_act_detail(item['act_url'])">
       </div>
    </div>
</template>

<script>

export default {
    name: 'AllActivities',
    props: {
        act: {}
    },
    methods: {
        to_act_detail (act_url) {
            this.$router.push({
                name: 'Act',
                query: {
                    'id': act_url
                }
            })
        }   
    }
}
</script>

<style scoped>

    .activity {
        position: relative;
        padding-top: 2.4375rem;
        margin-top: 0.5rem;
        background-color: #fff;
    }

    .activity img {
        width: 100%;
    
    }

    .tag {
        color: #fff;
        background-color: #fe4070;
        font-size: 0.7rem;
        height: 1.25rem;
        line-height: 1.25rem;
        padding-left: 0.4375rem;
        padding-right: 1.7rem;
        border-bottom-right-radius: 15px;
        border-top-right-radius: 15px;
        position: absolute;
        left: 0;
        top: .5rem;
    }

    .title {
        width: 7.8125rem;
        line-height: .875rem;
        position: absolute;
        left: 5.5rem;
        top: .75rem;
        color: #333;
        overflow: hidden;
        font-size: 0.9rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
</style>