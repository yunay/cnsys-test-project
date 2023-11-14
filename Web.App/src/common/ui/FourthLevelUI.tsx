import { IComponentInForm, useFormContext, useHTMLControls } from 'common';
import React from 'react';
import { FourthLevel } from 'web-api';
import { FifthLevelUI } from './FifthLevelUI';

interface IFourthLevelUIProps extends IComponentInForm { }

export const FourthLevelUI: React.FC<IFourthLevelUIProps> = ({ propertyChainNames }) => {

    const { context } = useFormContext();
    const { labelFor, textAreaFor, selector } = useHTMLControls<FourthLevel>(context, propertyChainNames);

    return <>
        <div className="row">
            <div className="col-12">
                {labelFor('fourthLevelText', 'Текст за четвърто ниво', true)}
                {textAreaFor('fourthLevelText')}
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <FifthLevelUI propertyChainNames={selector('fifthLevel')} />
            </div>
        </div>
    </>
}