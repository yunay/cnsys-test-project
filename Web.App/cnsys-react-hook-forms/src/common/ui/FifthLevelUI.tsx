import { IComponentInForm, useFormContext, useHTMLControls } from 'common';
import React from 'react';
import { FifthLevel } from 'web-api';

interface IFifthLevelUIProps extends IComponentInForm { }

export const FifthLevelUI: React.FC<IFifthLevelUIProps> = ({ propertyChainNames }) => {

    const { context } = useFormContext();
    const { labelFor, textAreaFor } = useHTMLControls<FifthLevel>(context, propertyChainNames);

    return <div className="row">
        <div className="col-12">
            {labelFor('fifthLevelText', 'Текст за пето ниво', true)}
            {textAreaFor('fifthLevelText')}
        </div>
    </div>
}