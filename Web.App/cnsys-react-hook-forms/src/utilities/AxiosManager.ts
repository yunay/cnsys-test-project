import axios, { AxiosInstance } from 'axios';
import { AsyncFrame } from './AsyncFrame';
import { ErrorHandler } from './ErrorHandler';

class AxiosManagerImpl {

    private _instance: AxiosInstance;

    constructor() {
        this._instance = axios.create();
        this._instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        this._instance.defaults.headers.common['X-CSRF'] = '1';

        this.registerRequestInterceptors();
        this.registerResponseInterceptors();
    }

    public get instance() {
        return this._instance;
    }

    private registerRequestInterceptors() {
        this._instance.interceptors.request.use((config) => {
            // Do something before request is sent

            ErrorHandler.clearApiErrors();

            this.handleRequestForAsyncFrame(config.url);

            //console.log(config)

            return config;

        }, (error) => {
            // Do something with request error
            ErrorHandler.handleError(error);

            return console.error(error);
        })
    }

    private registerResponseInterceptors() {
        this._instance.interceptors.response.use((response) => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            this.handleResponseForAsyncFrame(response.config.url)

            //console.log(response)
            return response;

        }, (error) => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            //console.log(error)
            this.handleResponseForAsyncFrame(error.config.url)
            ErrorHandler.handleError(error);

            return console.error(error);
        })
    }

    private handleRequestForAsyncFrame(key: string) {
        if (!AsyncFrame.pendingRequestsKeys.has(key)) {
            AsyncFrame.pendingRequestsKeys.add(key);
        }

        new Promise(resolve => {
            setTimeout(async () => {

                if (AsyncFrame.pendingRequestsKeys.size > 0) {
                    AsyncFrame.createGlobalLoaderDiv();
                }

                return resolve;
            }, 200)
        })
    }

    private handleResponseForAsyncFrame(key: string) {
        AsyncFrame.pendingRequestsKeys.delete(key);

        if (AsyncFrame.pendingRequestsKeys.size < 1) {
            AsyncFrame.removeGlobalLoaderDiv();
        }
    }
}

export const AxiosManager = new AxiosManagerImpl();