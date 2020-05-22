<template>
    <div id="all_comments_page">

        <comment-page
        :comments="comments" 
        v-if="Object.keys(comment_data).length!=0">
            <slot>
                <p class="comment_rate">
                    <span>{{ comment_data['rate_high'] }}</span> 好评
                </p>
                <div class="tag_list">
                    <span
                    v-for="(tag, index) in comment_data['tag']"
                    :tag="tag"
                    :key="index"
                    class="tag"
                    @click="SwitchTag(index)"
                    :class="{ active: isActive(index) }"
                    >{{ tag.tag_text }}</span>
                </div>
            </slot>
        </comment-page>
        
    </div>
</template>

<script>
import { get_good_comment } from '@/network/good/get_good_detail'

import CommentPage from './CommentPage'

export default {
    name: 'AllComments',
    components: {
        CommentPage
    },
    props: {
        product_id: ''
    },
    data () {
        return {
            comment_data: {},
            active_tag: 0,
            comments: {}
        }
    },
    created() {
        get_good_comment ({ 'product_id': this.product_id }).then ( res => {
            this.comment_data = res.data;
            this.comments = this.comment_data['filterList'];
        })
    },
    methods: {
        isActive (key) {
            if (this.active_tag == key) {
                return true;
            } else {
                return false;
            }
        },

        SwitchTag (key) {
            this.active_tag = key;
            let comment_list = this.comment_data['filterList'];
            if (key == 0) {
                this.comments = comment_list;
            } else {
                this.comments = []
                let tag_id = '#' + this.comment_data['tag'][key]['tag_id'] + '#';
                
                for (let i in comment_list) {
                    for (let t in comment_list[i]['tag']['begin']) {
                        
                        if (comment_list[i]['tag']['begin'][t]['name'] == tag_id) {
                            this.comments.push(comment_list[i]);
                        }
                    }
                }
            }
        }
    },
}
</script>

<style scoped>
    .comment_rate {
        padding-left: 5%;
        font-size: 0.9rem;
    }
    
    .comment_rate span {
        font-size: 1.1rem;
        font-weight: 600;
    }

    .tag_list {
        padding-left: 5%;
        padding-right: 5%;
        border-bottom: 1px solid #eee;
        padding-bottom: 5%;
    }

    .tag {
        display: inline-block;
        font-family: Arial,helvetica,"\5FAE\8F6F\96C5\9ED1",Microsoft Yahei,sans-serif;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        background: #f5f5f5;
        color: #666;
        font-size: 12px;
        margin-top: 12px;
        margin-right: 12px;
        border-radius: 25px;
    }

    .tag.active {
        background-color: rgba(254,64,112,0.1);
    }

</style>