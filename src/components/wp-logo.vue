<template>
    <div class="logo">
        <router-link to="/">
            <img class="logo--img" :class="scrollClass" :src="this.logoCurrent" @mouseover="setHoverLogo" @mouseout="setNormalLogo" alt="Václav Pekárek personal logo" />
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
    export default class WpLogo extends Vue {
        private logoCurrent: string = require("@/assets/logo.png");
        private logo: string = require("@/assets/logo.png");
        private logoHover: string = require("@/assets/logo_hover.png");

        private setHoverLogo() {
            this.logoCurrent = this.logoHover;
        }

        private setNormalLogo() {
            this.logoCurrent = this.logo;
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/design/logo.scss';
</style>
