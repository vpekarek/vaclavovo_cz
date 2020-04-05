<template>
    <div class="post-item">
        <div class="post-item--content">
            <h2 class="post-item--content__link">
                <router-link :to="{ path: '/' + post.slug }" v-html="post.title"></router-link>
            </h2>
            <div class="post-item--content__excerpt" v-html="post.excerpt"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { PostModel } from '@/model';
    import { postGetters } from '@/store';

    @Component
    export default class WpPostLi extends Vue {
        @Prop({ required: true }) readonly postId!: number;

        get post(): PostModel {
            return postGetters.getPostById(this.postId);
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/design/post-list.scss';
</style>