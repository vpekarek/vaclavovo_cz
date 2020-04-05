<template>
    <div class="pager" v-if="pageCount > 1">
        <ul>
            <li v-for="pageNum in pages" :key="'pager_' + pageNum.toString()">
                <a @click="changePage(pageNum)" :class="pageLinkClass(pageNum)">{{pageNum}}</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Emit } from 'vue-property-decorator';
    import store from '@/store';

    @Component
    export default class WpPager extends Vue {
        private currentPage: number = 1;

        get pageCount(): number {
            return store.state.post.totalPages;
        }

        private pageLinkClass(page: number): string {
            return page === this.currentPage ? "active" : "";
        }

        get pages(): number[] {
            const pages: number[] = [];
            
            for (let i = 1; i <= this.pageCount; i++) {
                pages.push(i);
            }

            return pages;
        }

        @Emit()
        private changePage(pageNumber: number) {
            this.currentPage = pageNumber;
        }

    }
</script>
<style lang="scss" scoped>
    @import '@/design/pager.scss';
</style>
