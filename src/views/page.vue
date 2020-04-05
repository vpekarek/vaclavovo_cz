<template>
    <div class="view application">
        <div class="container columns left right">
            <div style="border: 1px solid red;">A</div>
            <div style="border: 1px solid red;">B</div>
            <div style="border: 1px solid red;">C</div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue} from 'vue-property-decorator';

    @Component
    export default class About extends Vue {        
    }
</script>