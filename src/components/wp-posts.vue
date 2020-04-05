<template>
    <div class="posts" v-if="postIsLoaded">
        <article v-for="post in posts" :key="post.id" class="post-item">
            <wp-post-li :postId="post.id" />
        </article>
        <wp-pager @change-page="changePage" />
    </div>
    <loader v-else />
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import store, { postDispatch } from '@/store';    
    import WpPostLi from '@/components/wp-post-li.vue';
    import WpPager from '@/components/wp-pager.vue';
    import Loader from '@/components/loader.vue';
    import { PostModel } from '@/model';

    @Component({
        components: {
            WpPostLi,
            WpPager,
            Loader
        }
    })
    export default class WpPosts extends Vue {
        get posts() { return store.state.post.posts; };
        get postIsLoaded() { return store.state.post.dataLoaded; }

        async created() {
            this.loadPosts(1);
        }

        @Watch('$route')
        route(to: any, from: any) {
            this.loadPosts(1);
        }
        
        private changePage(pageNumber: number) {
            this.loadPosts(pageNumber);
        }
        
        private loadPosts(page: number) {
            let path = this.$router.currentRoute.path === "/" ?
                "index" : 
                this.$router.currentRoute.path.startsWith('/blog') ? 
                    undefined : 
                    this.$router.currentRoute.path.substring(1);

            if (typeof path === "string" && path.endsWith('/')) {
                path = path.substring(0, path.length);
            }
            postDispatch.getPosts(path, page);
        }
    }
</script>