<template>
    <div class="view container columns right" v-if="post !== undefined">
        <wp-post :post="post" />
        <aside>
            <wp-post-content :post="post" />
        </aside>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop} from 'vue-property-decorator';
    import { postGetters, postDispatch } from '@/store';
    import WpPost from '@/components/wp-post.vue'
    import WpPostContent from '@/components/wp-post-content.vue'
    import { PostModel } from '@/model';

    @Component({
        components: {
            WpPost,
            WpPostContent
        }
    })
    export default class PostView extends Vue {
        @Prop({ required: true}) readonly slug!: string;

        get post(): PostModel {
            return postGetters.getPostBySlug(this.slug);
        }

        async created() {
            if (this.post === undefined) {
                postDispatch.getPosts(undefined, undefined, this.slug);
            }
        }
    }
</script>