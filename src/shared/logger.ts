import { format } from 'date-fns';

import { displayTimeFormat } from './constants';

export const logger = {
    info(message: string, data: any) {
        console.log(`Log ${format(Date.now(), displayTimeFormat)}: ${message}`);
        if (data) {
            console.log(JSON.stringify(data, null, 2));
        }
    },
};
