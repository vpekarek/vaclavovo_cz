import Vue from 'vue';
import VueMeta from 'vue-meta';
import router from './router';
import App from './App.vue';
import store from './store';

import FullLayout from './components/layouts/full-layout.vue';
import SimpleLayout from './components/layouts/simple-layout.vue';
import ErrorLayout from './components/layouts/error-layout.vue';

Vue.config.productionTip = true;

Vue.component('full-layout', FullLayout);
Vue.component('simple-layout', SimpleLayout);
Vue.component('error-layout', ErrorLayout);
Vue.use(VueMeta, { refreshOnceOnNavigation: true });

var VueApp: any = Vue;

// @ts-ignore <- ignore it
var MyApp = new VueApp({
    router,
    store: store.original, // Inject the classic Vuex store
    components: { App },
    render: (h: any) => h(App),
}).$mount('#app');
