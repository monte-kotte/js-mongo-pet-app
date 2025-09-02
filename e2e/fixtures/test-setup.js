import { test as base } from '@playwright/test'
import { RequestHandler } from '../utils/request-handler';

export const test = base.extend({
    apiClient: async ({ request, baseURL }, use) => {
        const requestHandler = new RequestHandler(request, baseURL);
        await use(requestHandler);
    },
});
