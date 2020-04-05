<template>
    <div class="page--content">
        <div class="view main">
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
            title: 'Blog'
        },
        components: {
            WpPosts,
            WpPage,
            WpWidgets
        },
    })
    export default class Index extends Vue {
        get page() { return pageGetters.getPageBySlug('index'); }

    }
</script>