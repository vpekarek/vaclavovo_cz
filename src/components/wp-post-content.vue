<template>
    <section class="content-list" v-if="post && titles.length > 0">
        <h3>Obsah článku:</h3>
        <ul>
            <li v-for="title in titles" :key="title.id">
                <a :href="'#' + title.id">{{title.text}}</a>
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { PostModel } from '@/model';
    import { postDispatch } from '@/store';

    @Component
    export default class WpPostContent extends Vue {
        @Prop({ required: true }) readonly post!: PostModel;

        get titles(): IHeadlines[] {
            const titles: IHeadlines[] = [];
            const el = document.createElement("div");
            el.innerHTML = this.post.content;
            el.querySelectorAll("h2").forEach(e => {
                const text = e.innerText;
                const id = text.toLowerCase().split(' ').join('_').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                e.setAttribute('id', id);

                titles.push({ text: text, id: id });
            });
            
            postDispatch.replacePostContent(this.post.id, el.innerHTML);

            return titles;
        }
    }

    interface IHeadlines {
        text: string,
        id: string
    }
</script>

<style lang="scss" scoped>
@import '@/design/post-content.scss';
</style>