<template>
    <div class="logo">
        <router-link to="/">
            <img class="logo--img" :class="scrollClass" src="@/assets/logo.png" alt="Václav Pekárek personal logo" />
        </router-link>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
import store from '@/store';

    @Component({
        computed: {
            scrollClass(): string {
                return store.state.page.isScrolled ? "scrolled" : "";
            }
        }
    })
    export default class WpLogo extends Vue {}
</script>
<style lang="scss" scoped>
    @import '@/design/logo.scss';
</style>
