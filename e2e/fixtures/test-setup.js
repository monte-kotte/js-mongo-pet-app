import { test as base } from '@playwright/test'
import { RequestHandler } from '../utils/request-handler';
import { APILogger } from '../utils/logger'

export const test = base.extend({
    apiClient: async ({ request, baseURL, extraHTTPHeaders }, use) => {
        const logger = new APILogger();
        const requestHandler = new RequestHandler(request, baseURL, extraHTTPHeaders, logger);
        await use(requestHandler);
    },
});
