import store, { pageDispatch } from '@/store'

export const pageEvents = {
    scrollHandler(event: Event) {
        if (window.pageYOffset == 0 && store.state.page.isScrolled) {
            pageDispatch.setPageScrollPosition(false);
        } else if (!store.state.page.isScrolled) {
            pageDispatch.setPageScrollPosition(true);
        }
    },
    anchorHashClick(event: Event) {
        const target: Element = (<any>event.target || event.currentTarget);

        if (target.nodeName !== "A") {
            return;
        }

        const href = target.getAttribute('href') || "";

        if (href.startsWith('#')) {
            const targetEl = document.getElementById(href.substring(1)) || null;

            if (targetEl != null) {
                event.preventDefault();
                const top = targetEl.offsetTop - document.getElementsByClassName('page--header')[0].clientHeight - 20;

                window.scrollTo({ top: top, behavior: 'smooth'});
            }           
        }
    }
}