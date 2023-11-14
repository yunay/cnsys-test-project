import React, { createContext, useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';

export interface IComponentInForm {
    propertyChainNames: string;
}

interface IFormContext {
    context: UseFormReturn<any>
    mainModel: any;
}

interface IFormContextProviderProps<TModel> {
    children: JSX.Element;
    context: UseFormReturn<TModel>
    mainModel: TModel;
}

export const FormContext = createContext<IFormContext>(null);

export const FormContextProvider: React.FC<IFormContextProviderProps<any>> = ({ children, context, mainModel }) => {

    return <FormContext.Provider value={{ context, mainModel }}>
        {children}
    </FormContext.Provider>
}

export const useFormContext = (): IFormContext => {

    const formContext = useContext(FormContext);

    if (!formContext) {
        throw Error('FormContext is not provided.');
    }

    return { ...formContext }
}