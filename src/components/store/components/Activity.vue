<template>
    <div>
        <activity-image
        v-for="(item, key) in img_map"
        :item="item"
        :key="key"
        ></activity-image>
    </div>
</template>

<script>
import ActivityImage from './ActivityImage'

export default {
    name: 'Activity',
    props: {
        home_act: {}
    },
    components: {
        ActivityImage
    },
    data () {
        return {
            img_map: {},
            section: {}
        }
    },
    created() {
        this.img_map = this.home_act['img_map'];
        this.section = this.home_act['section'];
        
    },
}
</script>

<style scoped>

</style>