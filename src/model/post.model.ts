export interface PostModel {
    id: number,
    title: string,
    excerpt: string,
    content: string,
    slug: string,
    featuredImageUrl?: string,
    categories: number[]
}
