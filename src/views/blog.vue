<template>
    <div class="page--content">
        <div class="page--part main">
            <div class="container columns right">
                <section>
                    <div class="page" v-if="page !== undefined" v-html="page.content"></div>
                    <wp-posts />
                </section>
                <aside class="right">
                    <wp-widgets slug="index-widgets" />
                </aside>
            </div>
        </div>        
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { pageGetters } from '@/store';
    import WpPosts from '@/components/wp-posts.vue';
    import WpPage from '@/components/wp-page.vue'
    import WpWidgets from '@/components/wp-widgets.vue';

    @Component({
        metaInfo: {
            title: 'Single dev blog'
        },
        components: {
            WpPosts,
            WpPage,
            WpWidgets
        },
    })
    export default class Blog extends Vue {
        get page() { return pageGetters.getPageBySlug('blog'); }

    }
</script>

<style lang="scss" scoped>
@import '@/design/page-part.scss';
</style>