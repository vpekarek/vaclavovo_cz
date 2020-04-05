import Vue from 'vue';
import Vuex from 'vuex';
import { createDirectStore } from "direct-vuex"
import post, { postDispatch, postGetters } from './post.module';
import widget, { widgetDispatch, widgetGetters } from './widget.module';
import page, { pageDispatch, pageGetters } from './page.module';

Vue.use(Vuex);

const { store, rootActionContext, moduleActionContext, rootGetterContext, moduleGetterContext } = createDirectStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    post,
    page,
    widget
  }
});

// Export the direct-store instead of the classic Vuex store.
export default store;

// The following exports will be used to enable types in the
// implementation of actions.
export { 
    rootActionContext, 
    moduleActionContext, 
    rootGetterContext, 
    moduleGetterContext,
    postDispatch,
    postGetters,
    pageDispatch,
    pageGetters,
    widgetDispatch,
    widgetGetters
};

// The following lines enable types in the injected store '$store'.
// @ts-ignore <- ignore it
export type AppStore = typeof store
declare module "vuex" {
  interface Store<S> {
    direct: AppStore
  }
}