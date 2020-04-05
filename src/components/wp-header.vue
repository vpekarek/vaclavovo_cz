<template>
    <header class="page--header">
        <div class="container">
            <wp-logo />
            <wp-menu />
        </div>
    </header>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import WpMenu from '@/components/wp-menu.vue';
    import WpLogo from '@/components/wp-logo.vue';

    @Component({
        components: {
            WpMenu,
            WpLogo,
        },
    })
    export default class WpHeader extends Vue {}
</script>
