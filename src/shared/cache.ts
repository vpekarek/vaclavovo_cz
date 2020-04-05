import { CACHE_ENABLED } from '.';

console.log(CACHE_ENABLED);

export const cache = {
    set<T = string>(key: string, data: T) {
        const dataCache: CacheItem<T> = {
            date: new Date(),
            data: data
        }
        localStorage.setItem(key, JSON.stringify(dataCache));
    },
    get<T = string>(key: string): T | null {

        if (!CACHE_ENABLED) {
            return null;
        }

        const fromCache = localStorage.getItem(key);

        if (fromCache === null) {
            return null;
        }

        const parsed = JSON.parse(fromCache) as CacheItem<T>;

        return parsed.data;

    },
    remove(key: string) {
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    }
}

interface CacheItem<T> {
    date: Date,
    data: T
}