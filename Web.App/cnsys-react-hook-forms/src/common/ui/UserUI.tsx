import { IComponentInForm, useFormContext, useHTMLControls } from 'common';
import React from 'react';
import { Person } from 'web-api';

interface IUserUIProps extends IComponentInForm { }

export const UserUI: React.FC<IUserUIProps> = ({ propertyChainNames }) => {

    const { context } = useFormContext();
    const { labelFor, inputFor, textAreaFor, dateFor } = useHTMLControls<Person>(context, propertyChainNames);

    return <>
        <div className="row">
            <div className="col-4">
                {labelFor('firstName', 'Име', true)}
                {inputFor('firstName')}
            </div>
            <div className="col-4">
                {labelFor('familyName', 'Фамилия', true)}
                {inputFor('familyName')}
            </div>
            <div className="col-4">
                {labelFor('birthDate', 'Дата на раждане', true)}
                {dateFor('birthDate')}
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                {labelFor('address', 'Адрес', true)}
                {textAreaFor('address')}
            </div>
        </div>
    </>
}