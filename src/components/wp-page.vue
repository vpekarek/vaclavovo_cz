<template>
    <article class="content" v-if="page">
        <h2 class="content--header" v-if="title && page.title && page.title.length > 0" v-html="page.title" />
        <div class="content--text" v-html="page.content" />
    </article>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { pageGetters } from '@/store';    

    @Component
    export default class WpPage extends Vue {
        @Prop() readonly slug!: string;
        @Prop({ default: false }) readonly title!: boolean;
        get page() { return pageGetters.getPageBySlug(this.slug) }
    }
</script>