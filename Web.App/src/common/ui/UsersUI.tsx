import { IComponentInForm, useFormContext, useHTMLControls, UserUI } from 'common';
import React from 'react';
import { Person } from 'web-api';
import { useFieldArray, } from 'react-hook-form';

interface IUsersUIProps extends IComponentInForm { }

export const UsersUI: React.FC<IUsersUIProps> = ({ propertyChainNames }) => {

    const { context, mainModel } = useFormContext();
    const { selector, labelFor, inputFor, textAreaFor } = useHTMLControls<Person[]>(context, propertyChainNames);
    const usersArray = useFieldArray({ control: context.control, name: "users" });

    //console.log('UsersUI', mainModel)

    return <>

        <button onClick={() => usersArray.prepend(new Person())} type="button" className="btn btn-primary">Добави потребител</button>
        <br />
        {
            usersArray.fields.map((field, index) => {
                return <div key={field.id}>
                    <div className="clearfix">
                        <button onClick={() => usersArray.remove(index)} type="button"  className="btn float-right">❌</button>
                    </div>
                    <UserUI propertyChainNames={selector(`${index}`)} />
                </div>
            })
        }

    </>
}