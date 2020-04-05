import { CACHE_ENABLED } from '.';

export const cache = {
    set<T = string>(key: string, data: T) {
        if (typeof data === "string") {
            localStorage.setItem(key, data);
        } else {
            localStorage.setItem(key, JSON.stringify(data));
        }
    },
    get<T = string>(key: string): string | T | null {

        if (!CACHE_ENABLED) {
            return null;
        }

        const fromCache = localStorage.getItem(key);

        if (fromCache === null) {
            return null;
        }

        try {
            const parsed = JSON.parse(fromCache);
            return parsed as T;
        } catch {
            return fromCache as string;
        }
    },
    remove(key: string) {
        localStorage.removeItem(key);
    },
    clear() {
        localStorage.clear();
    }
}