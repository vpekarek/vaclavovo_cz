<template>
    <div class="page--content">
        <div class="page--part about">
            <div class="container">
                <section>
                    <wp-page slug="about" />                    
                </section>
            </div>
        </div>
        <div class="page--part skill">
            <div class="container columns right">
                <section>
                    <wp-page slug="skills" title="true" />
                </section>
                <aside class="right">
                    <wp-widgets slug="about-widgets" />
                </aside>
            </div>
        </div>
        <div class="page--part social-sites">
            <div class="container">
                <wp-page slug="social-sites" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { pageGetters } from '@/store';
    import WpWidgets from '@/components/wp-widgets.vue';
    import WpPage from '@/components/wp-page.vue'
    import WpPosts from '@/components/wp-posts.vue'

    @Component({
        metaInfo: {
            title: 'About me',
            meta: [
                { name: 'description', content: 'My name is Václav Pekárek and I am an software developer. Using mostly C Sharp and dotNET.' },                
            ]
        },
        components: {
            WpWidgets,
            WpPage,
            WpPosts
        },
    })
    export default class About extends Vue {}
</script>
<style lang="scss" scoped>
@import '@/design/page-part.scss';
</style>