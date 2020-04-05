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
            component: () =>
                // eslint-disable-next-line
                import(/* webpackChunkName: "bundle.main" */ '@/views/index.vue'),
            meta: {
                layout: 'full-layout',
            },
        },
        {
            path: '/about',
            component: () =>
                // eslint-disable-next-line
                import(/* webpackChunkName: "bundle.main" */ '@/views/about.vue'),
            meta: {
                layout: 'full-layout',
            },
        },
        {
            name: 'post',
            path: '/:slug',
            props: parseSlug,
            component: () =>
                // eslint-disable-next-line
                import(/* webpackChunkName: "bundle.main" */ '@/views/post-view.vue'),
            meta: {
                layout: 'simple-layout',
                isPost: true
            },
        },
        {
            name: 'error',
            path: '*',
            component: PageNotFound,
            meta: {
                layout: 'error-layout',
            },
        },
    ],
});


export default router;
