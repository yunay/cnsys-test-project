import { IComponentInForm, useFormContext, useHTMLControls } from 'common';
import React from 'react';
import { Person } from 'web-api';
import { useWatch } from 'react-hook-form';

interface IUserUIProps extends IComponentInForm { }

export const UserUI: React.FC<IUserUIProps> = ({ propertyChainNames }) => {

    const { context, mainModel } = useFormContext();
    const { labelFor, inputFor, textAreaFor } = useHTMLControls<Person>(context, propertyChainNames);
    // const model = useWatch<Person>();
    //console.log('UserUI', mainModel)

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
                {inputFor('birthDate')}
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