import { newGuid } from "./Helpers";

class AsyncFrameImpl {

    private _pendingRequestsKeys: Set<string>;

    private _globalLoaderId: string;

    private _globalLoaderDiv: HTMLElement;

    constructor() {
        this._globalLoaderId = newGuid();
        this._pendingRequestsKeys = new Set<string>();
    }

    public get globalLoaderId() {
        return this._globalLoaderId;
    }

    public get pendingRequestsKeys(): Set<string> {
        return this._pendingRequestsKeys;
    }

    public get globalLoaderDiv() {

        if (this._globalLoaderDiv) {
            return this._globalLoaderDiv;
        }

        this._globalLoaderDiv = document.getElementById(this.globalLoaderId);

        return this._globalLoaderDiv;
    }

    public createGlobalLoaderDiv(): void {
        let globelLoaderDiv = document.getElementById(this.globalLoaderId);

        if (!globelLoaderDiv) {
            globelLoaderDiv = document.createElement('div');
            globelLoaderDiv.setAttribute('id', this.globalLoaderId);
            globelLoaderDiv.setAttribute('class', 'loader-overlay load');

            var span = document.createElement('span');
            span.setAttribute('class', 'sr-only');
            span.textContent = 'Зареждане';

            globelLoaderDiv.appendChild(span);
            this._globalLoaderDiv = globelLoaderDiv;

            document.body.append(globelLoaderDiv);
        }
    }

    public removeGlobalLoaderDiv(): void {
        if (this._globalLoaderDiv) {
            document.body.removeChild(this._globalLoaderDiv);
            this._globalLoaderDiv = null;
        }
    }
}

export const AsyncFrame = new AsyncFrameImpl();