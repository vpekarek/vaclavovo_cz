<template>
    <div class="simple-layout" :class="scrollClass">
        <wp-header />
        <slot />
        <wp-footer />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import WpHeader from '@/components/wp-header.vue';
    import WpFooter from '@/components/wp-footer.vue';
    import store from '@/store';

    @Component({
        components: {
            WpHeader,
            WpFooter,
        },
        computed: {
            scrollClass(): string {
                return store.state.page.isScrolled ? "scrolled" : "";
            }
        }
    })
    export default class SimpleLayout extends Vue {}
</script>

<style lang="scss" scoped>
    @import '@/design/simple-layout.scss';
</style>