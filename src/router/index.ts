import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/views/page-not-found.vue';
import WPAPI from 'wpapi'
import { API_URL } from '@/shared';

const wp = new WPAPI({ endpoint: API_URL });

Vue.use(Router);

const parseSlug = (r: { params: { slug: string } }) => ({ slug: r.params.slug });

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/blog'
            // component: () =>
            //     // eslint-disable-next-line
            //     import(/* webpackChunkName: "bundle.index" */ '@/views/index.vue'),
            // meta: {
            //     layout: 'full-layout',
            // },
        },
        {
            path: '/blog',
            component: () =>
                // eslint-disable-next-line
                import(/* webpackChunkName: "bundle.blog" */ '@/views/blog.vue'),
            meta: {
                layout: 'full-layout',
            },
        },
        {
            path: '/about',
            component: () =>
                // eslint-disable-next-line
                import(/* webpackChunkName: "bundle.about" */ '@/views/about.vue'),
            meta: {
                layout: 'full-layout',
            },
        },
        {
            name: 'post',
            path: '/blog/:slug',
            props: parseSlug,
            component: () =>
                // eslint-disable-next-line
                import(/* webpackChunkName: "bundle.post" */ '@/views/post-view.vue'),
            meta: {
                layout: 'simple-layout',
                isPost: true
            },
        },
        {
            name: 'error',
            path: '/404',
            component: PageNotFound,
            meta: {
                layout: 'error-layout',
            },
        },
        {
            path: '*',
            redirect: '/404'
        },        
    ],
});


export default router;
