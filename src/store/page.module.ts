import { logger, wp } from '@/shared';
import store from '.';

const PAGE_IS_SCROLLED = 'pageIsScrolled';
const PAGE_IS_NOT_SCROLLED = 'pageIsNotScrolled';
const PAGE_IS_LOADED = 'pageIsLoaded';

const state: PageState = {
    isScrolled: false,
    pageData: []
}
const mutations = {
    [PAGE_IS_SCROLLED](state: PageState) {
        state.isScrolled = true;
    },
    [PAGE_IS_NOT_SCROLLED](state: PageState) {
        state.isScrolled = false;
    },
    [PAGE_IS_LOADED](state: PageState, payload: { pageData: PageData[]}) {
        state.pageData = [...payload.pageData];
    }
}
const actions = {
    setPageScrollPosition({ commit }: any, isScrolled: boolean) {
        if (isScrolled) {
            commit(PAGE_IS_SCROLLED);
        } else {
            commit(PAGE_IS_NOT_SCROLLED);
        }        
    },
    getPages({commit, state: PageState}: any) {        
        let query = wp.pages();

        query.get().then((result: any[]) => {
            if (result === undefined) {
                return;
            }
            const pages: PageData[] = result.map(x => {
                let data: PageData = {
                    id: x.id,
                    title: x.title.rendered,
                    content: x.content.rendered,
                    slug: x.slug
                }

                return data;
            });

            commit(PAGE_IS_LOADED, { pageData: pages });
        }, error => {
            logger.info('Error when loading page data.', error);
        });
    }
}

const getters = {
    getPageData: (status: PageState, pageId?: number, pageSlug?: string) => (pageId?: number, pageSlug?: string) => {
        let index = -1;
        if (pageId) {
            index = status.pageData.findIndex(x => x.id === pageId);
        } else if (pageSlug) {
            index = status.pageData.findIndex(x => x.slug === pageSlug);
        }

        return index === -1 ? null : status.pageData[index];
    }
}

const pageDispatch = {
    setPageScrollPosition(isScrolled: boolean) {
        (<any>store.dispatch).page.setPageScrollPosition(isScrolled);
    },
    getPages() {
        (<any>store.dispatch).page.getPages();
    }
}

const pageGetters = {
    getPageById(pageId: number) {
        return (<any>store.getters).page.getPageData(pageId, undefined);
    },
    getPageBySlug(slug: string) {
        return (<any>store.getters).page.getPageData(undefined, slug);
    }
}

export default {
    namespaced: true as true,
    state: state,
    getters,
    actions,
    mutations
};

export interface PageState {
    isScrolled: boolean,
    pageData: PageData[]
}

export interface PageData {
    id: number,
    title?: string,
    content?: string,
    slug: string
}

export {
    pageDispatch,
    pageGetters
}