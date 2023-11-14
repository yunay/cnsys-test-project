import { isAxiosError } from "axios";
import { Constants } from "./Constants";
import { handleResponseError, isNullOrUndefinedOrEmpty, showFloatingNotification } from "./Helpers";
import { ApiError } from "./models/Error";

class ErrorHandlerImpl {

    public errorContainerId: string;

    public handleError(error:any) {
        if (isAxiosError(error) && error.response) {

            if (!isNullOrUndefinedOrEmpty(error.response.data.title) || error.response.data?.inner_problems?.length > 0) {

                const apiError = new ApiError('', error.response.status);

                if (!isNullOrUndefinedOrEmpty(error.response.data.title)) {
                    apiError.message = error.response.data.title;
                }

                if (error.response.data.inner_problems && error.response.data.inner_problems.length > 0) {
                    apiError.innerErrors = [];

                    for (let i: number = 0; i < error.response.data.inner_problems.length; i++) {
                        apiError.innerErrors.push(new ApiError(error.response.data.inner_problems[i].title, error.response.status));
                    }
                }

                this.showApiError(apiError)

                throw apiError;

            } else {
                var apiError = handleResponseError(error.response.status);

                if (apiError) {
                    this.showApiError(apiError)

                    throw apiError;
                }
            }

        } else {
            const serverError = new ApiError(Constants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
            this.showApiError(serverError)

            throw serverError;
        }
    }

    public showApiError(apiError: ApiError, getInnerErrors?: boolean) {

        if (apiError == null) {
            return null;
        }

        const errorMessages = !isNullOrUndefinedOrEmpty(apiError.message) ? [apiError.message] : [];

        if (getInnerErrors) {

            if (apiError?.innerErrors?.length > 0) {
                apiError?.innerErrors.forEach(err => {
                    if (!isNullOrUndefinedOrEmpty(err.message)) {
                        errorMessages.push(err.message)
                    }
                })
            }
        }

        showFloatingNotification(errorMessages, 'danger', Constants.NOTIFICATION_DURATION)
    }

    public clearApiErrors() {

        if (!isNullOrUndefinedOrEmpty(this.errorContainerId)) {
            var errContainerElement = document.getElementById(this.errorContainerId);

            if (errContainerElement) {
                errContainerElement.remove();
            }
        }
    }
}

export const ErrorHandler = new ErrorHandlerImpl();