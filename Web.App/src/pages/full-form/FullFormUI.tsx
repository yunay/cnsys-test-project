import { FormContextProvider, useHTMLControls, UsersUI, UserUI } from 'common';
import React from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler, Path } from 'react-hook-form';
import { FullForm, Person } from 'web-api';

interface IFullFormUIProps { }

export const FullFormUI: React.FC<IFullFormUIProps> = () => {

    const defaultValues = new FullForm();
    const formContext = useForm<FullForm>({ defaultValues });
    const { selector, labelFor, inputFor } = useHTMLControls<FullForm>(formContext);

    //#region handlers

    const onSubmit: SubmitHandler<FullForm> = (data) => {
        console.log(JSON.stringify(data, null, 2))
    }

    const onError: SubmitErrorHandler<FullForm> = () => {

    }

    //#endregion

    //console.log('full-form-rerender')

    return <FormContextProvider context={formContext} mainModel={defaultValues}>
        <form onSubmit={formContext.handleSubmit(onSubmit, onError)}>
            <div className="card">
                <div className="card-body">
                    <h1 className="page-title">Подробна форма</h1>
                    <hr />
                    <div className="row">
                        <div className="col-12">
                            {labelFor('formName', 'Име на форма', true)}
                            {inputFor('formName')}
                        </div>
                    </div>
                    <fieldset>
                        <br />
                        <h4>Собственик</h4>
                        <UserUI propertyChainNames={selector('owner')} />
                    </fieldset>
                    <fieldset>
                        <br />
                        <h4>Потребители</h4>
                        <UsersUI propertyChainNames={selector('users')} />
                    </fieldset>
                </div>
                <div className="card-footer">
                    <div className="button-bar">
                        <div className="right-side">
                            <button type="submit" className="btn btn-primary"><i className="ui-icon ui-icon-search mr-1" aria-hidden="true"></i>Търси</button>
                        </div>
                        <div className="left-side">
                            <button type="button" className="btn btn-secondary">Изчисти</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </FormContextProvider>
}