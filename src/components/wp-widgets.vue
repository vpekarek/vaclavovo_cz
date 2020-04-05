<template>
    <div class="widgets">
        <article v-for="widget in widgets" :key="widget.id" class="widget--item">
            <!-- <header v-html="widget.title" /> -->
            <div class="widget--item--text" v-html="widget.content" />
        </article>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import store, { widgetDispatch } from '@/store';

    @Component
    export default class WpWidgets extends Vue {
        @Prop() readonly slug!: string;

        get widgets() { return store.state.widget.widgets; };

        async created() {
            this.loadWidgets();
        }

        @Watch('$route')
        route(to: any, from: any) {
            this.loadWidgets();
        }        
        
        private loadWidgets() {
            widgetDispatch.getWidgets(this.slug);
        }
    }
</script>