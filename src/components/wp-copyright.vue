<template>
    <div class="copyright">
        <div class="container">
            <p>Copyright &copy; 2020 <a href="https://www.vaclavovo.cz" target="_blank" rel="noreferrer noopener">Václav Pekárek</a> by <a href="https://www.evolutit.cz" target="_blank" rel="noreferrer noopener">EVOLUTIT s.r.o.</a></p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class WpCopyright extends Vue {}
</script>

<style lang="scss" scoped>
    @import '@/design/copyright.scss';
</style>