<template>
    <nav class="main-menu" :class="scrollClass">
        <ul>
            <!-- <li><router-link to="/">Home</router-link></li> -->
            <li><router-link to="/blog">Blog</router-link></li>
            <li><router-link to="/about">About me</router-link></li>            
        </ul>
    </nav>
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
    export default class WpMenu extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/design/menu.scss';
</style>