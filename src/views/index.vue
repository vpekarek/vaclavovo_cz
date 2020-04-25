<template>
    <div class="page--content">
        <div class="page--part main">
            <div class="container columns right">
                <section>
                    <div class="page" v-if="page !== undefined" v-html="page.content"></div>
                    <article class="content">                        
                        <div class="content--text">
                            <p>Hello on my try of the developer blog.</p>
                            <p>Are you looking for some information about C# [c sharp], dotnet, etc…? Continue to my <router-link :to="{ path: '/blog' }">Blog section</router-link>. There you can find articles about something I find useful, or something I was working on lately and want to share with the world.</p>
                            <p>All blog posts are written in my (not very good) english. I am sorry for that.</p>
                            <p>Do you find anything wrong? <router-link :to="{ path: '/about' }">Contact me</router-link>.</p>
                        </div>
                    </article>
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
    export default class Index extends Vue {
        get page() { return pageGetters.getPageBySlug('index'); }
    }
</script>

<style lang="scss" scoped>
@import '@/design/page-part.scss';
</style>