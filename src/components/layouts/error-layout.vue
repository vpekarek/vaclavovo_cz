<template>
    <div class="error-layout">
        <slot />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

@Component
    export default class ErrorLayout extends Vue {}
</script>
