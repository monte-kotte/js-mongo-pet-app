import { test } from "@playwright/test";

export class RequestHandler {
    constructor(request, baseUrl) {
        this.request = request;
        this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

        this.apiPath = "";
        this.queryParams = {};
        this.apiHeaders = {};
        this.apiBody = {};
    }

    path(path) {
        this.apiPath = path.startsWith("/") ? path : `/${path}`;
        return this;
    }

    params(params) {
        this.queryParams = params;
        return this;
    }

    headers(headers) {
        this.apiHeaders = headers;
        return this;
    }

    body(body) {
        this.apiBody = body;
        return this;
    }

    async getRequest(statusCode) {
        return await this._sendRequest("GET", statusCode);
    }

    async postRequest(statusCode) {
        return await this._sendRequest("POST", statusCode);
    }

    async putRequest(statusCode) {
        return await this._sendRequest("PUT", statusCode);
    }

    async deleteRequest(statusCode) {
        return await this._sendRequest("DELETE", statusCode);
    }

    async _sendRequest(method, expectedStatus) {
        const url = this.getUrl();
        let responseJSON;

        await test.step(`${method} request to: ${url}`, async () => {
            const options = {
                headers: this.apiHeaders,
                data: ["POST", "PUT"].includes(method) ? this.apiBody : undefined,
            };

            const response = await this.request.fetch(url, { method, ...options });
            const actualStatus = response.status();
            responseJSON = await response.json().catch(() => ({}));

            this.statusCodeValidator(actualStatus, expectedStatus, this._sendRequest);

            this.cleanup();
        });

        return responseJSON;
    }

    getUrl() {
        const url = new URL(this.baseUrl + this.apiPath);
        for (const [key, value] of Object.entries(this.queryParams)) {
            url.searchParams.append(key, value);
        }
        return url.toString();
    }

    statusCodeValidator(actual, expected, caller) {
        if (actual !== expected) {
            const error = new Error(
                `Expected status ${expected}, got ${actual}`
            );
            Error.captureStackTrace(error, caller);
            throw error;
        }
    }

    cleanup() {
        this.apiPath = "";
        this.queryParams = {};
        this.apiHeaders = {};
        this.apiBody = {};
    }
}
