import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    timeout: 30000,
    expect: {
        timeout: 5000,
    },
    use: {
        baseURL: 'http://localhost:3000/',
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
        },
    },
    projects: [
        {
            name: 'api',
            testMatch: /.*\.spec\.js/,
        },
    ],
    reporter: [['list'], ['html', { open: 'never' }]],
});
