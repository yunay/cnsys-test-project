import { formatISO } from "date-fns";
import { AsyncFrame } from "./AsyncFrame";
import { Constants } from "./Constants";
import { ApiError, ClientError } from "./models/Error";

export const isNullOrUndefined = (value: any): boolean => {
    return value === undefined || value === null;
};

export const isNullOrUndefinedOrEmpty = (value: any): boolean => {
    return isNullOrUndefined(value) || value.toString() === "" || value.toString().trim() === '';
};

export const newGuid = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const downloadFile = (downloadUrl: string, useTargetBlank: boolean = false) => {

    const pom = document.createElement('a');
    pom.setAttribute('href', downloadUrl);

    if (useTargetBlank) {
        pom.setAttribute('target', '_blank');
    }

    document.body.appendChild(pom);

    pom.click();

    document.body.removeChild(pom);
}

export const openInNewTab = (url: string) => {
    var win = undefined;

    try {
        win = window.open(url, '_blank');
    } catch (e) {
        //Когато браузърът ползва външен add-on за pop-up blocker window.open хвърля грешка.
        console.log(e);
        return;
    }

    //Когато браузърът ползва неговия build-in pop-up blocker window.open връща null.
    if (win) {
        win.focus();
    }
}

export const getCookie = (cname: string) => {

    const name = cname + "=";
    const ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) === 0)
            return c.substring(name.length, c.length);
    }

    return "";
}

export const setCookie = (cname: string, cvalue: any, exdays: number, domain: string) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = exdays ? "expires=" + d.toUTCString() : exdays;
    document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=" + domain + ";path=/" + ";secure";
}

export const swrFetcherToKey = (clientKey: string, obj: {}) => {

    if (isNullOrUndefinedOrEmpty(clientKey) || isNullOrUndefinedOrEmpty(obj)) {
        return clientKey
    }

    const objValues = [];

    Object.keys(obj).forEach(objKey => {
        if (obj[objKey]) {
            objValues.push(objKey)
            objValues.push(obj[objKey])
        }
    });

    if (objValues.length === 0) {
        return clientKey;
    }

    return `${clientKey}/${objValues.join('/')}`;
}

export const throwException = (message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any => {
    if (result !== null && result !== undefined) {
        throw new ClientError(result.message | result);
    } else {
        throw handleResponseError(status)
    }
}

export const handleResponseError = (status: number): ApiError => {

    switch (status) {
        case 401:

            AsyncFrame.createGlobalLoaderDiv();

            setTimeout(() => {

                AsyncFrame.removeGlobalLoaderDiv();

                //Clearing left session
                const logoutUrl = sessionStorage.getItem('logoutUrl');

                if (logoutUrl) {
                    const pom = document.createElement('a');
                    pom.setAttribute('href', logoutUrl);
                    document.body.appendChild(pom);
                    pom.click();
                    document.body.removeChild(pom);
                    window.localStorage.setItem("active-user", "off")
                }

            },1000)

            return null;
        case 403: return new ApiError(Constants.ERROR_MESSAGES.FORBIDDEN, 403);
        case 404: return null
        case 422: return new ApiError(Constants.ERROR_MESSAGES.UNPROCESSABLE_CONTENT, 422);
        case 429: return new ApiError(Constants.ERROR_MESSAGES.TOO_MANY_REQUESTS, 429);
    }

    return new ApiError(Constants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
}

export const removeAtIndex = (items: any[], index) => {
    items.splice(index, 1);

    return items;
}

export const changeAtIndex = (items: any[], index, newItem) => {
    items[index] = newItem;

    return items;
}

//Премахва излишните наклонени черти в адреса
export const urlSanitizeSlashes = (url: string): string => {
    return url.replace(/([^:])(\/\/+)/g, '$1/');
}

export const getUrlParameter = (sParam: string): string | undefined => {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            const searchParams = new URLSearchParams(sURLVariables[i]);
            return searchParams.get(sParam);
        }
    }

    return undefined;
};

export const debounce = (func, timeout = 175) => {
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export const showFloatingNotification = (messages: string[], type: 'danger' | 'success' | 'info' | 'warning', closeAfterXSeconds?: number) => {

    const floatingNotificationsContainerElement = document.getElementById('floating-notifications-container')
    const messageContainerId = newGuid();

    const messageContainerDiv = document.createElement('div');
    messageContainerDiv.setAttribute('id', messageContainerId);
    messageContainerDiv.setAttribute('class', `alert alert-${type} alert-dismissible fade show`);
    messageContainerDiv.setAttribute('role', 'alert');

    if (closeAfterXSeconds) {
        messageContainerDiv.setAttribute('style', `--notification-expiration: ${closeAfterXSeconds}s`);
    }

    messageContainerDiv.innerHTML = `<button type="button" class="close" data-dismiss="alert" onclick="document.getElementById('${messageContainerId}')?.remove()"><span aria-hidden="true">×</span></button>${messages.map(errMsg => `<p>${errMsg}</p>`).join('')}`

    if (closeAfterXSeconds) {
        const closingScript = document.createElement('script');
        closingScript.innerHTML = `setTimeout(()=>{document.getElementById('${messageContainerId}')?.remove()},${closeAfterXSeconds * 1000})`;
        messageContainerDiv.prepend(closingScript)
    }

    floatingNotificationsContainerElement.prepend(messageContainerDiv);
}

export const formatNumberWithDigitsAfterDecimalPoint = (value: any, digitsAfterDecimalPoint: number) => {

    if (!isNullOrUndefinedOrEmpty(value)) {
        value = value.toString();
        value.replace(',', '.');
        const hasDecimalPoint = value.indexOf('.') > -1;

        if (hasDecimalPoint) {
            const valueParts = value.split('.');
            const intNumber = valueParts[0];
            const currentDigitsAfterDecimalPoint = valueParts[1]

            if (currentDigitsAfterDecimalPoint.length >= digitsAfterDecimalPoint) {
                return `${intNumber}.${currentDigitsAfterDecimalPoint.substring(0, 6)}`
            }

            return `${intNumber}.${currentDigitsAfterDecimalPoint}${'0'.repeat(digitsAfterDecimalPoint - currentDigitsAfterDecimalPoint.length)}`
        }

        return `${value}.${'0'.repeat(digitsAfterDecimalPoint)}`
    }

    return '';
}

export const displayItemsWithSeparator = (items: any[], separator: string): string => {

    if (items?.length > 0) {

        const filteredItems = items.filter(x => !isNullOrUndefinedOrEmpty(x));

        if (filteredItems?.length > 0) {
            const result = filteredItems.join(separator);

            return result;
        }
    }

    return '';
}

export const isValidUICBulstat = (ident: string) => {

    function validateShortUIC(id: string, digits: Array<number>) {
        var checkSum = 0;

        for (var j = 0; j < id.length - 1; j++) {
            checkSum += digits[j] * (j + 1);
        }

        checkSum %= 11

        if (10 == checkSum) {
            checkSum = 0;

            for (var j = 0; j < (id.length - 1); j++) {
                checkSum += digits[j] * (j + 3);
            }

            checkSum %= 11;

            if (10 == checkSum)
                checkSum = 0;
        }

        if (digits[8] != checkSum) {
            return false;
        }

        return true;
    }

    function validateLongUIC(id: string, digits: Array<number>) {
        var checksum = 0;

        if (id.length === 13) {
            var shortID = id.substring(0, 9);
            var shortDigits: Array<number> = [];

            for (var index = 0; index < shortID.length; index++) {
                shortDigits.push(Number(shortID[index]))
            }

            if (!validateShortUIC(shortID, shortDigits)) {
                return false;
            }

            checksum = 2 * digits[8] + 7 * digits[9] + 3 * digits[10] + 5 * digits[11];
            checksum %= 11;

            if (10 == checksum) {
                checksum = 4 * digits[8] + 9 * digits[9] + 5 * digits[10] + 7 * digits[11];
                checksum %= 11;

                if (10 == checksum)
                    checksum = 0;
            }

            if (digits[12] != checksum) {
                return false;
            }

            return true;
        } else {
            return false;
        }
    }

    function validateUICBulstat(id: string, digits: Array<number>) {
        if (id.length === 9) {
            return validateShortUIC(id, digits);

        } else if (id.length === 13) {
            return validateLongUIC(id, digits);

        } else {
            return false;
        }
    }

    if (isNullOrUndefinedOrEmpty(ident)) {
        return false;
    }

    if (ident.length !== 9 && ident.length !== 13 && ident[0] != "2") {
        return false
    }

    if (/^\d{9}$/.test(ident) || /^\d{13}$/.test(ident)) {
        var digits: Array<number> = [];

        for (var index = 0; index < ident.length; index++) {
            var number = Number(ident[index]);

            if (!isNaN(number)) {
                digits.push(number)
            }
            else {
                return false
            }
        }

        return validateUICBulstat(ident, digits)

    } else {
        return false;
    }
}

export const isValidDomain = (domain: string) => {

    if (!isNullOrUndefinedOrEmpty(domain) && domain.length <= 253) {
        return true;
    }

    return false;
}

export const formatDateWithoutZone = (date: Date) => {
    if (date && date instanceof Date) {
        const formatedDate = formatISO(date);

        return formatedDate.substring(0, formatedDate.indexOf('+'));
    }

    return date;
}

export const jsonToString = (json: any, skipNullUndefinedAndEmptyValues: boolean = false) => {
    if (!isNullOrUndefinedOrEmpty(json)) {

        return skipNullUndefinedAndEmptyValues
            ? JSON.stringify(json, (k, v) => {
                if (!isNullOrUndefinedOrEmpty(v)) {
                    return v;
                }
            })
            : JSON.stringify(json)
    }

    return JSON.stringify({});
}

export const isValidCVE = (CVE) => {

    if (!/^CVE-\d{4}-\d{4,}$/.test(CVE))
        return false;

    return true;
}

export const hasUrlParams = (searchParams: URLSearchParams) => {
    return [...searchParams].length > 0;
}