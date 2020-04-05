<template>
    <div id="app">
        <component :is="layout" v-if="isDataLoaded">
            <router-view></router-view>           
        </component>
        <div v-else>
            Loading
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import FullLayout from '@/components/layouts/full-layout.vue';
    import SimpleLayout from '@/components/layouts/simple-layout.vue';
    import ErrorLayout from '@/components/layouts/error-layout.vue';
    import store, { postDispatch, pageDispatch, widgetDispatch } from '@/store';
    import { pageEvents, cache } from '@/shared'

    const app_layout = 'full-layout';

    @Component({
        metaInfo: {
            title: 'Blog',
            titleTemplate: '%s | Václavovo.cz'            
        },
        components: {
            'full-layout': FullLayout,
            'simple-layout': SimpleLayout,
            'error-layout': ErrorLayout,
        },
        computed: {
            layout() {
                return this.$route.meta.layout || app_layout;
            },        
            isDataLoaded(): boolean {
                return true;
            },
            
        },
        watch: {
            $route(to, from) {                
                if (to.path !== from.path) {
                    if (this.$route.meta.isPost) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        postDispatch.clearPosts();
                        widgetDispatch.clearWidgets();                        
                    }
                }
            }
        },
        async created() {
            cache.clear();
            pageDispatch.getPages();
            window.addEventListener('scroll', pageEvents.scrollHandler);
            window.addEventListener('click', pageEvents.anchorHashClick);
        },
        destroyed () {
            window.removeEventListener('scroll', pageEvents.scrollHandler);
            window.removeEventListener('click', pageEvents.anchorHashClick);            
        },        
    })
    export default class App extends Vue {}
</script>

<style lang="scss">
@import '@/design/index.scss';
</style>
