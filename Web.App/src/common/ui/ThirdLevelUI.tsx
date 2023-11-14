import { IComponentInForm, useFormContext, useHTMLControls } from 'common';
import React from 'react';
import { ThirdLevel } from 'web-api';
import { FourthLevelUI } from './FourthLevelUI';

interface IThirdLevelUIProps extends IComponentInForm { }

export const ThirdLevelUI: React.FC<IThirdLevelUIProps> = ({ propertyChainNames }) => {

    const { context } = useFormContext();
    const { labelFor, textAreaFor, selector } = useHTMLControls<ThirdLevel>(context, propertyChainNames);

    return <>
        <div className="row">
            <div className="col-12">
                {labelFor('thirdLevelText', 'Текст за трето ниво', true)}
                {textAreaFor('thirdLevelText')}
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <FourthLevelUI propertyChainNames={selector('fourthLevel')} />
            </div>
        </div>
    </>
}