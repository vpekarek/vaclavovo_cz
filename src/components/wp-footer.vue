<template>
    <footer class="page--footer">        
        <wp-copyright />
    </footer>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import WpCopyright from '@/components/wp-copyright.vue';
    import store from '@/store';

    @Component({
        components: {
            WpCopyright
        }
    })
    export default class WpFooter extends Vue {}
</script>

<style lang="scss" scoped>
a {
    text-decoration: underline;

    &:hover {
        text-decoration: none;
    }
}

</style>