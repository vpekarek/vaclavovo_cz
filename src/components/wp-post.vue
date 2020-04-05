<template>
    <div class="post">
        <h1 v-html="post.title"></h1>
        <div class="post-content" v-html="post.content"></div>
        <router-link :to="{ path: '/' }">Zpět</router-link>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { PostModel } from '@/model';

    @Component
    export default class WpPost extends Vue {
        @Prop({ required: true }) readonly post!: PostModel;
    }
</script>