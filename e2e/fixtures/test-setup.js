import { test as base } from '@playwright/test';
import { APILogger } from '../utils/logger';
import { RequestHandler } from '../utils/request-handler';

export const test = base.extend({
    apiClient: async ({ request, baseURL, extraHTTPHeaders }, use) => {
        const logger = new APILogger();
        const requestHandler = new RequestHandler(request, baseURL, extraHTTPHeaders, logger);
        await use(requestHandler);
    },
});
