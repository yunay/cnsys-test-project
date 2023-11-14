import { IComponentInForm, useFormContext, useHTMLControls } from 'common';
import React from 'react';
import { MultiLevelModel } from 'web-api';
import { FirstLevelUI } from './FirstLevelUI';

interface IMultiLevelModelUIProps extends IComponentInForm { }

export const MultiLevelModelUI: React.FC<IMultiLevelModelUIProps> = ({ propertyChainNames }) => {

    const { context } = useFormContext();
    const { selector } = useHTMLControls<MultiLevelModel>(context, propertyChainNames);

    return <div className="row">
        <div className="col-12">
            <FirstLevelUI propertyChainNames={selector('firstLevel')} />
        </div>
    </div>
}