import { fullFormClient } from "common";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUrlParameter, hasUrlParams, isNullOrUndefinedOrEmpty } from "utilities";
import { FullForm, FullFormSearchCriteria } from "web-api";

interface IFullFormSearchContextProvider {
    currentSearchCriteria: FullFormSearchCriteria;
    defaultSearchCriteria: FullFormSearchCriteria;
    currentResults: FullForm[];
    onSearch: (values: FullFormSearchCriteria) => void;
    onDelete: (id: number) => void;
}

export const FullFormSearchContextProvider = createContext<IFullFormSearchContextProvider>(null);

export const FullFormSearchContextProviderProvider = ({ children }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoadedParams, setIsLoadedParams] = useState<boolean>();
    const [currentSearchCriteria, setCurrentSearchCriteria] = useState<FullFormSearchCriteria>();
    const [currentResults, setCurrentResults] = useState<FullForm[]>();
    const [defaultSearchCriteria, setDefaultSearchCriteria] = useState<FullFormSearchCriteria>();

    //#region urlToParams, paramsToUrl funcs

    const searchCriteriaToUrlParams = (currentSearchCriteria: FullFormSearchCriteria) => {

        const urlParams: any = {};

        if (!isNullOrUndefinedOrEmpty(currentSearchCriteria.formName))
            urlParams['keywords'] = currentSearchCriteria.formName;

        return urlParams;
    }

    const urlParamsToSearchCriteria = useCallback(() => {

        const eventSearchCriteria = new FullFormSearchCriteria();

        if (!hasUrlParams(searchParams)) {
            //Дефолтни критерии, когато нямаме параметри в URL
      
        } else {

            const formName = getUrlParameter('formName');
            eventSearchCriteria.formName = !isNullOrUndefinedOrEmpty(formName) ? formName : null;
        }

        return eventSearchCriteria;
    }, [])

    //#endregion


    //#region CRUD


    const onSearch = async (values: FullFormSearchCriteria) => {
        const newSearchCriteria = new FullFormSearchCriteria();

        newSearchCriteria.formName = values.formName ? values.formName : undefined;

        setSearchParams(searchCriteriaToUrlParams(newSearchCriteria))

        const { result, headers } = await fullFormClient.fullFormAll(newSearchCriteria.formName)

        setCurrentSearchCriteria(newSearchCriteria);
        setCurrentResults(result);
    }

    const onDelete = async (id: number) => {
        //await eventsClient.eventDelete(id);

        //setCurrentResults(results => [...removeAtIndex(results, results.findIndex(x => x.eventId === id))])
        //showFloatingNotification([Constants.NOTIFICATION_MESSAGES.SUCCESSFULLY_DELETED_DATA], 'success', Constants.NOTIFICATION_DURATION)
        //setCurrentSearchCriteria(oldCriteria => ({ ...oldCriteria, count: oldCriteria.count - 1 }))
    }

    //#endregion

    useEffect(() => {
        init();
    }, [])

    const init = async () => {

        const newSearchCriteria = urlParamsToSearchCriteria();

        const { result, headers } = await fullFormClient.fullFormAll(newSearchCriteria.formName)

        setCurrentResults(result);
        setDefaultSearchCriteria(newSearchCriteria)
        setCurrentSearchCriteria(newSearchCriteria)
        setIsLoadedParams(true)
    }

    if (!isLoadedParams) {
        return null;
    }

    return <FullFormSearchContextProvider.Provider value={{ currentSearchCriteria, defaultSearchCriteria, currentResults, onSearch, onDelete }}>
        {children}
    </FullFormSearchContextProvider.Provider>
}