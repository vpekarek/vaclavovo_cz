<template>
    <div class="page--content">
        <div class="page--part posts">
            <div class="container columns right" v-if="post !== undefined">
                <wp-post :post="post" />
                <aside v-if="showContent">
                    <wp-post-content :post="post" />
                </aside>
            </div>
            <loader v-else />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop} from 'vue-property-decorator';
    import { postGetters, postDispatch } from '@/store';
    import WpPost from '@/components/wp-post.vue'
    import WpPostContent from '@/components/wp-post-content.vue'
    import Loader from '@/components/loader.vue';
    import { PostModel } from '@/model';

    @Component({
        components: {
            WpPost,
            WpPostContent,
            Loader
        }
    })
    export default class PostView extends Vue {
        private showContent = false;
        @Prop({ required: true}) readonly slug!: string;

        get post(): PostModel {
            return postGetters.getPostBySlug(this.slug);
        }

        async created() {
            if (this.post === undefined) {
                postDispatch.getPosts(undefined, undefined, this.slug);
            }

            setTimeout(() => {
                if (this.post === undefined || this.post === null) {
                    this.$router.push({ name: 'error' });
                }
            }, 3000);
        }
    }
</script>

<style lang="scss" scoped>
@import '@/design/page-part.scss';
</style>