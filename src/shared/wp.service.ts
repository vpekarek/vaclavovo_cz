import WPAPI, { WPRequest } from 'wpapi'
import { cache, logger, API_URL } from '@/shared';
export const wp: WPAPI = new WPAPI({
    endpoint: API_URL,
    transport: {
        // Only override the transport for the GET method, in this example
        // Transport methods should take a wpreq object and a callback:
        get: function (wpreq, cb) {
            var result = cache.get<object>(wpreq.toString());
            // If a cache hit is found, return it via the same callback/promise
            // signature as the default transport method:
            if (result) {
                if (cb && typeof cb === 'function') {
                    // Invoke the callback function, if one was provided
                    let e: Error = {
                        name: "",
                        message: ""
                    };
                    cb(e, result);
                }
                // Return the data as a promise
                return Promise.resolve(result);
            }

            // Delegate to default transport if no cached data was found
            return (<any>WPAPI).transport.get(wpreq, cb).then((result: any) => {
                cache.set<object>(wpreq.toString(), result);
                return result;
            });
        }
    }
});
