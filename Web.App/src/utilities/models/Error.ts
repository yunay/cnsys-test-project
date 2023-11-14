export class ApiError implements Error {

    public name: string = "ApiError";

    public message: string = null;

    public httpStatusCode: number = 0;

    public code: string = null;

    public stackTrace: string = null;

    public innerErrors: ApiError[] = null;

    public treatAsWarning: boolean = null;

    constructor(message: string);
    constructor(message: string, httpStatusCode: number);
    constructor(message: string, httpStatusCode: number, code: string);
    constructor(message: string, httpStatusCode: number, code: string, stackTrace: string);
    constructor(obj: any);
    constructor(arg1?: any, arg2?: any, arg3?: any, arg4?: any) {

        this.message = arg1;
        this.httpStatusCode = arg2;
        this.code = arg3;
        this.stackTrace = arg4;
        this.name = "ApiError";
    }
}

export class ClientError implements Error {
    public name: string = "ClientError";

    public message: string = null;

    public stackTrace: string = null;

    constructor(message: string);
    constructor(message: string, stackTrace: string);
    constructor(obj: any);
    constructor(arg1?: any, arg2?: any) {

        this.message = arg1;
        this.stackTrace = arg2;
        this.name = "ClientError";
    }
}