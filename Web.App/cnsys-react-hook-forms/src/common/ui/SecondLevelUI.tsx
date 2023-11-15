import { IComponentInForm, useFormContext, useHTMLControls } from 'common';
import React from 'react';
import { SecondLevel } from 'web-api';
import { ThirdLevelUI } from './ThirdLevelUI';

interface ISecondLevelUIProps extends IComponentInForm { }

export const SecondLevelUI: React.FC<ISecondLevelUIProps> = ({ propertyChainNames }) => {

    const { context } = useFormContext();
    const { labelFor, textAreaFor, selector } = useHTMLControls<SecondLevel>(context, propertyChainNames);

    return <>
        <div className="row">
            <div className="col-12">
                {labelFor('secondLevelText', 'Текст за второ ниво', true)}
                {textAreaFor('secondLevelText')}
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <ThirdLevelUI propertyChainNames={selector('thirdLevel')} />
            </div>
        </div>
    </>
}