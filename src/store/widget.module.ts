import { WPRequest } from 'wpapi'
import { WidgetModel  } from '@/model';
import { categoryList, logger, wp } from '@/shared';
import store from '.';

const WIDGETS_IS_LOADING = 'widgetsIsLoading';
const WIDGETS_IS_LOADED = 'widgetsIsLoaded';
const WIDGETS_IS_NOT_LOADED = 'widgetsIsNotLoaded';
const WIDGETS_CLEARED = 'widgetsCleared';
const WIDGET_IS_LOADED = 'widgetIsLoaded';
const WIDGET_CONTENT_IS_CHANGED = 'widgetContentIsChanged';

const state: WidgetState = {
    widgets: [],
    dataLoaded: false
}
const mutations = {
    [WIDGETS_IS_LOADING](state: WidgetState) {
        state.dataLoaded = false;
    },
    [WIDGETS_IS_LOADED](state: WidgetState, payload: { widgets: WidgetModel[] }) {
        state.widgets = [...payload.widgets];
        state.dataLoaded = true;
    },
    [WIDGETS_IS_NOT_LOADED](state: WidgetState) {
        state.widgets = [];
        state.dataLoaded = false;
    },
    [WIDGETS_CLEARED](state: WidgetState) {
        state.widgets = [];
        state.dataLoaded = false;
    },
    [WIDGET_IS_LOADED](state: WidgetState, widget: WidgetModel) {
        const index = state.widgets.findIndex(x => x.id === widget.id);
        state.widgets.splice(index, 1, widget);
        state.widgets = [...state.widgets];
    },
    [WIDGET_CONTENT_IS_CHANGED](state: WidgetState, payload: { widgetId: number, content: string}) {
        const index = state.widgets.findIndex(x => x.id === payload.widgetId);
        const widget = state.widgets[index];
        widget.content = payload.content;
        state.widgets.splice(index, 1, widget);
        state.widgets = [...state.widgets];
    }
}
const actions = {
    getWidgets({ commit }: any, payload: {categorySlug?: string, slug?: string }) {
        commit(WIDGETS_IS_LOADING);

        let query = wp.posts().orderby('title').order('asc');
        let call: Promise<any>;
        
        if (payload.categorySlug) {
            call = helpers.getWidgetByCategorySlug(payload.categorySlug, query)
        } else if (payload.slug) {
            call = query.slug(payload.slug).get();
        } else {
            call = query.get();
        }

        call.then(wpWidgets => {
            if (wpWidgets) {
                const widgets = wpWidgets.map((x: any) => {
                    return helpers.getWidgetFromWpWidget(commit, x);
                });
                
                const payload = { widgets };
                commit(WIDGETS_IS_LOADED, payload);
            } else {
                commit(WIDGETS_IS_NOT_LOADED);
            }
        }, error => {
            commit(WIDGETS_IS_NOT_LOADED);
            logger.info('Nepodařilo se načíst widgety.', error);
        });
    },

    replaceWidgetContent({ commit }: any, payload: { widgetId: number, content: string }) {
        commit(WIDGET_CONTENT_IS_CHANGED, payload);
    },

    clear({commit}: any) {
        commit(WIDGETS_CLEARED);
    }
}

const getters = {
    getWidgetBySlug: (state: WidgetState, slug: string) => (slug: string): WidgetModel => {
        const index = state.widgets.findIndex(x => x.slug == slug);
        return state.widgets[index];
    },
    getWidgetById: (state: WidgetState, id: number) => (id: number): WidgetModel => {
        const index = state.widgets.findIndex(x => x.id === id);
        return state.widgets[index];
    },
}

const widgetDispatch = {
    getWidgets(categorySlug?: string, slug?: string) {        
        (<any>store.dispatch).widget.getWidgets({ categorySlug, slug });
    },
    replaceWidgetContent(widgetId: number, content: string) {
        (<any>store.dispatch).widget.replaceWidgetContent({ widgetId, content });
    },
    clearWidgets() {
        (<any>store.dispatch).widget.clear();
    }
}

const widgetGetters = {
    getWidgetBySlug(slug: string): WidgetModel {
        return (<any>store.getters).widget.getWidgetBySlug(slug);
    },
    getWidgetById(id: number): WidgetModel {
        return (<any>store.getters).widget.getWidgetById(id);
    }
};

const helpers = {
    getWidgetFromWpWidget(commit: any, wpWidget: any): WidgetModel {
        const widget: WidgetModel = {
            id: wpWidget.id,
            title: decodeURI(wpWidget.title.rendered),
            content: wpWidget.content.rendered,
            slug: wpWidget.slug
        };

        return widget;
    },

    getWidgetByCategorySlug(slug: string, query: WPRequest): Promise<any> {
        const index = categoryList.findIndex(x => x.slug === slug);

        if (index > -1) {
            const id = categoryList[index].id;
            return query.categories(id);
        }

        return wp.categories().slug(slug).then((cats) => {
            var cat = cats[0];
            return query.categories( cat.id );
        }).then((widgets) => {
            return widgets;
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

export interface WidgetState {
    widgets: WidgetModel[],
    dataLoaded: boolean
}

export {
    widgetDispatch,
    widgetGetters
}