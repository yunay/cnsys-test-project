import { IComponentInForm, useFormContext, useHTMLControls } from 'common';
import React from 'react';
import { FirstLevel } from 'web-api';
import { SecondLevelUI } from './SecondLevelUI';

interface IFirstLevelUIProps extends IComponentInForm { }

export const FirstLevelUI: React.FC<IFirstLevelUIProps> = ({ propertyChainNames }) => {

    const { context } = useFormContext();
    const { labelFor, textAreaFor, selector } = useHTMLControls<FirstLevel>(context, propertyChainNames);

    return <>
        <div className="row">
            <div className="col-12">
                {labelFor('firstLevelText', 'Текст за първо ниво', true)}
                {textAreaFor('firstLevelText')}
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <SecondLevelUI propertyChainNames={selector('secondLevel')} />
            </div>
        </div>
    </>
}