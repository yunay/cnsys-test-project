export const Constants = {
    SITE_TITLE: 'Система за одитиране киберсигурността на стратегическите обекти',
    PAGES_PATHS: {
        ROOT: '/',
        SITES: '/sites',
        SITES_ADD: '/sites/add',
        SITE: '/site/:siteId',
        SITE_PREVIEW: '/site/:siteId/preview',
        EVENTS: '/events',
        EVENTS_ADD: '/events/add',
        EVENT: '/event/:eventId',
        EVENTS_PREVIEW: '/event/:eventId/preview',
        AUDIT: '/audit',
        NOM_SECTORS: '/nomenclatures/sectors',
        NOM_ACTIVITIES: '/nomenclatures/activities',
        NOM_EVENT_TYPES: '/nomenclatures/event-types',
        ANALYSIS_CVE: '/analysis/cve',
        ANALYSIS_EVENTS: '/analysis/events',
    },
    DATE_FORMATS: {
        DATE_TIME: "dd.MM.yyyy HH:mm",
        DATE_TIME_HOUR: "dd.MM.yyyy HH",
        DATE_TIME_HMS: "dd.MM.yyyy HH:mm:ss",
        DATE_TIME_HMS_YEAR_ABBR: "dd.MM.yyyy HH:mm:ss",
        DATE_TIME_EXTENDED: "dd.MM.yyyy HH:mm:ss.SSS",
        DATE_8601: "Y-MM-dd",
        DATE_ABBR: "dd.MM.yyyy г.",
        DATE: "dd.MM.yyyy",
    },
    HTML_ATTRIBUTES: {
        ATTRIBUTES_CLASS_FORM_CONTROL: { className: 'form-control' },
        ATTRIBUTES_CLASS_FORM_CONTROL_SM: { className: 'form-control form-control-sm' },
        ATTRIBUTES_MR_2_COL_FORM_LABEL: { className: 'mr-2 col-form-label' },
        ATTRIBUTES_SELECT_CLASS_FORMCONTROL: { className: 'custom-react-select' },
        ATTRIBUTES_CLASS_FORM_CONTROL_LABEL: { className: 'form-control-label' },
        ATTRIBUTES_CLASS_FORM_CONTROL_LABEL_REQUIRED_FIELD: { className: 'form-control-label required-field' }
    },
    REQUEST: {
        MAX_AGE_REGEX: /max-age=(\d+)/,
        CACHE_CONTROL: "cache-control",
        X_TOTAL_COUNT: "x-total-count",
        CACHE_CONTROL_NO_CACHE: "public,max-age=60,no-cache",
        REVALIDATE: "revalidate"
    },
    VALUES: {
        INT_MAX_VALUE: 2147483647,
        FILE_MAX_SIZE: 10485760
    },
    NOTIFICATION_DURATION: 5,
    NOTIFICATION_MESSAGES: {
        SUCCESSFULLY_ADDED_DATA: 'Данните са добавени успешно.',
        SUCCESSFULLY_DELETED_DATA: 'Данните са изтрити успешно.',
        SUCCESSFULLY_EDITED_DATA: 'Данните са редактирани успешно.',
        SUCCESSFULLY_ANALYSIS_START: 'Процеса по анализ е стартиран успешно.',
        NO_DATA_CHANGES: 'Няма промяна по данните.',
        NO_EVENTS_FOUND: 'Не беше намерено събитие с този идентификатор!'
    },
    ERROR_MESSAGES: {
        UNAUTHORIZED: 'Нямате достъп до тази функционалност.',
        FORBIDDEN: 'Нямате достъп до системата.',
        UNPROCESSABLE_CONTENT: 'Невалидни данни.',
        TOO_MANY_REQUESTS: 'Надвишен брой заявки в системата.',
        INTERNAL_SERVER_ERROR: 'Системата е временно недостъпна, моля опитайте отново по-късно.',
        FIELD_MAX_LENGTH_EXCEEDED: 'Максималната дължина на текста в полето е {0} символа.',
        INCORRECT_VALUE: 'Невалидна стойност',
        REQUIRED_FIELD: 'Полето е задължително',
        INVALID_FROM_DATE_E: 'Началната дата не трябва да бъде по-голяма от крайната дата на периода.',
        ENTER_PERIOD_E: 'Въведете период.',
        DROP_ZONE_FILE_INVALID_TYPE: 'Невалиден тип на файл.',
        DROP_ZONE_FILE_TOO_LARGE: 'Файлът е по-голям от разрешеното',
        DROP_ZONE_FILE_TOO_SMALL: 'Файлът е по-малък от разрешеното',
        DROP_ZONE_TOO_MANY_FILES: 'Прикачени са повече файлове от разрешеното',
    },
    USER_CLAIMS: {
        USERNAME: 'preferred_username',
        FIRSTNAME: 'given_name',
        LASTNAME: 'family_name',
        FULLNAME: 'name',
        EMAIL: 'email',
        LOGOUT_URL: 'bff:logout_url',
        SESSION_EXPIRES_IN: 'bff:session_expires_in',
        ROLES: 'roles'
    }
}