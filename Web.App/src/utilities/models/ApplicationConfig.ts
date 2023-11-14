/**Базов интерфайс за конфигурационни на статични парамтри на приложението*/
export interface ApplicationConfig {
    clientLanguage: string;
    defaultPageSize: number;
    version: string;
    commonCookieDomain: string;
    acceptedFileExt: string;
    sseApiUrl: string;
    adminApiUrl: string;
    openCVEApiUrl: string;
    openCVECurrentCVEUrl: string;
    vulAnalyticsApiUrl: string;
    authUrl: string;
    operatorRoleName: string;
    securityAdminRoleName: string;
    userInactivityTimeout: number;
}

declare var applicationConfig: ApplicationConfig;

export const appConfig = applicationConfig;