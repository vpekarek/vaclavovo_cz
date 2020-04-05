import { WPRequest } from 'wpapi'
import { PostModel  } from '@/model/post.model';
import { categoryList, logger, wp } from '@/shared';
import store from '.';

const POSTS_IS_LOADING = 'postsIsLoading';
const POSTS_IS_LOADED = 'postsIsLoaded';
const POSTS_IS_NOT_LOADED = 'postsIsNotLoaded';
const POSTS_CLEARED = 'postsCleared';
const POST_IS_LOADED = 'postIsLoaded';
const POST_CONTENT_IS_CHANGED = 'postContentIsChanged';

const state: PostState = {
    posts: [],
    total: 0,
    totalPages: 1,
    currentPage: 1,
    dataLoaded: false
}
const mutations = {
    [POSTS_IS_LOADING](state: PostState, payload: { currentPage: number }) {
        state.dataLoaded = false;
        state.currentPage = payload.currentPage;
    },
    [POSTS_IS_LOADED](state: PostState, payload: { posts: PostModel[], total: number, totalPages: number }) {
        state.posts = [...payload.posts];
        state.dataLoaded = true;
        state.total = payload.total;
        state.totalPages = payload.totalPages;
    },
    [POSTS_IS_NOT_LOADED](state: PostState) {
        state.posts = [];
        state.dataLoaded = false;
        state.total = 0;
        state.totalPages = 1;
    },
    [POSTS_CLEARED](state: PostState) {
        state.posts = [];
        state.dataLoaded = false;
        state.total = 0;
        state.totalPages = 1;
    },
    [POST_IS_LOADED](state: PostState, post: PostModel) {
        const index = state.posts.findIndex(x => x.id === post.id);
        state.posts.splice(index, 1, post);
        state.posts = [...state.posts];
    },
    [POST_CONTENT_IS_CHANGED](state: PostState, payload: { postId: number, content: string}) {
        const index = state.posts.findIndex(x => x.id === payload.postId);
        const post = state.posts[index];
        post.content = payload.content;
        state.posts.splice(index, 1, post);
        state.posts = [...state.posts];
    }
}
const actions = {
    getPosts({ commit }: any, payload: {categorySlug?: string, page?: number, slug?: string }) {
        if (!payload.page) {
            payload.page = 1;
        }
        commit(POSTS_IS_LOADING, { currentPage: payload.page });

        let query = wp.posts().perPage(10).page(payload.page).param('categories_exclude', [4, 5]);
        let call: Promise<any>;
        
        if (payload.categorySlug) {
            call = helpers.getPostByCategorySlug(payload.categorySlug, query, categoryList);
        } else if (payload.slug) {
            call = query.slug(payload.slug).get();
        } else {
            call = query.get();
        }

        call.then(wpPosts => {
            if (wpPosts) {
                const posts = wpPosts.map((x: any) => {
                    return helpers.getPostFromWpPost(commit, x);
                });

                const total: number = wpPosts && wpPosts._paging && wpPosts._paging.total ? wpPosts._paging.total : wpPosts.length;
                const totalPages: number = wpPosts && wpPosts._paging && wpPosts._paging.totalPages ? wpPosts._paging.totalPages : 1;
                const payload = { posts, total, totalPages };
                commit(POSTS_IS_LOADED, payload);
            } else {
                commit(POSTS_IS_NOT_LOADED);
            }
        }, error => {
            commit(POSTS_IS_NOT_LOADED);
            logger.info('Nepodařilo se načíst příspěvky.', error);
        });
    },

    replacePostContent({ commit }: any, payload: { postId: number, content: string }) {
        commit(POST_CONTENT_IS_CHANGED, payload);
    },

    clear({commit}: any) {
        commit(POSTS_CLEARED);
    }
}
const getters = {
    getPostBySlug: (state: PostState, slug: string) => (slug: string): PostModel => {
        const index = state.posts.findIndex(x => x.slug == slug);
        return state.posts[index];
    },
    getPostById: (state: PostState, id: number) => (id: number): PostModel => {
        const index = state.posts.findIndex(x => x.id === id);
        return state.posts[index];
    },
}

const postDispatch = {
    getPosts(categorySlug?: string, page?: number, slug?: string) {
        (<any>store.dispatch).post.getPosts({ categorySlug, page, slug });
    },
    replacePostContent(postId: number, content: string) {
        (<any>store.dispatch).post.replacePostContent({ postId, content });
    },
    clearPosts() {
        (<any>store.dispatch).post.clear();
    }
}

const postGetters = {
    getPostBySlug(slug: string): PostModel {
        return (<any>store.getters).post.getPostBySlug(slug);
    },
    getPostById(id: number): PostModel {
        return (<any>store.getters).post.getPostById(id);
    }
}

const helpers = {
    getPostFromWpPost(commit: any, wpPost: any): PostModel {
        const post: PostModel = {
            id: wpPost.id,
            title: decodeURI(wpPost.title.rendered),
            excerpt: wpPost.excerpt.rendered,
            content: wpPost.content.rendered,
            slug: wpPost.slug,
            categories: wpPost.categories
        };
        
        if (wpPost.featured_media > 0) {
            wp.media().id(wpPost.featured_media).get().then((image: any) => {
                post.featuredImageUrl = image.link;
                commit(POST_IS_LOADED, post);
            });
        }

        return post;
    },
    getPostByCategorySlug(slug: string, query: WPRequest, cl: any[]): Promise<any> {

        const index = cl.findIndex(x => x.slug === slug);

        if (index > -1) {
            const id = cl[index].id;
            return query.categories(id);
        }

        return wp.categories().slug(slug).then((cats) => {
            var cat = cats[0];
            return query.categories( cat.id );
        }).then((posts) => {
            return posts;
        });
    }
}


export default {
    namespaced: true as true,
    state: state,
    getters,
    actions,
    mutations
};

export interface PostState {
    posts: PostModel[],
    total: number,
    totalPages: number,
    currentPage: number,
    dataLoaded: boolean
}

export {
    postDispatch,
    postGetters
}