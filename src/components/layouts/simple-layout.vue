<template>
    <section class="simple-layout">
        <wp-header />
        <slot />
        <wp-footer />
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import WpHeader from '@/components/wp-header.vue';
    import WpFooter from '@/components/wp-footer.vue';

    @Component({
        components: {
            WpHeader,
            WpFooter,
        }
    })
    export default class SimpleLayout extends Vue {}
</script>

<style lang="scss" scoped>
    @import '@/design/simple-layout.scss';
</style>