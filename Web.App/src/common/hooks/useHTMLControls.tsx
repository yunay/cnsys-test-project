import { endOfDay, setHours, setMinutes } from 'date-fns';
import React, { SelectHTMLAttributes, useCallback, useMemo, useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { Controller, ControllerFieldState, FieldValues, Path, RegisterOptions, UseFormReturn } from "react-hook-form";
import WindowedSelect from 'react-windowed-select';
import { useUpdateEffect } from 'usehooks-ts';
import { Constants, isNullOrUndefinedOrEmpty } from "utilities";
import { SelectListItem } from "../models/CommonModels";

const drawFieldErrors = (hasErrors: boolean, errorMessage: string, id: string) => {
    return hasErrors && errorMessage !== "*" && errorMessage.length > 0 ? (
        <ul className="invalid-feedback" id={`${id}_ERRORS`}>
            <li>{errorMessage}</li>
        </ul>
    ) : null;
};

//#region DatePicker

interface IDatePickerUIProps {
    field: any;
    fieldState: ControllerFieldState;
    id: string;
    type: "date" | "date-time";
    format?: string;
    toEndOfDay?: boolean;
    reactDatePickerProps?: Partial<ReactDatePickerProps>;
    inputSize?: string;
}

const DatePickerUI: React.FC<IDatePickerUIProps> = ({ field, fieldState, type, format, id, toEndOfDay, inputSize, reactDatePickerProps }) => {
    const onCalendarClick = () => document.getElementById(id).focus();

    const [date, setDate] = useState(toEndOfDay && field.value ? endOfDay(field.value) : field.value)

    useUpdateEffect(() => {
        setDate(toEndOfDay && field.value ? endOfDay(field.value) : field.value);

    }, [field.value])

    const onChange = (date: any) => {
        field.onChange(toEndOfDay && date ? endOfDay(date) : date);
        setDate(toEndOfDay && date ? endOfDay(date) : date);
    };

    return (
        <div className={`input-group ${type === 'date-time' ? 'form-control-datetime' : 'form-control-date'}`}>
            <div className={'custom-datepicker'}>
                <DatePicker
                    {...reactDatePickerProps}
                    autoComplete='off'
                    id={id}
                    locale={"bg"}
                    dateFormat={type === "date"
                        ? format ? format : Constants.DATE_FORMATS.DATE
                        : format ? format : Constants.DATE_FORMATS.DATE_TIME}
                    shouldCloseOnSelect
                    onChange={onChange}
                    fixedHeight
                    onBlur={field.onBlur}
                    strictParsing
                    ariaInvalid={fieldState.invalid ? "true" : "false"}
                    aria-describedby={`${id}_${fieldState.invalid ? "ERRORS" : "HELP"}`}
                    showTimeSelect={type === "date-time"}
                    timeCaption="Време"
                    className={`${inputSize ? `form-control form-control-${inputSize}` : 'form-control'} input-datetime${fieldState.invalid ? " input-error" : ""}`}
                    selected={date}
                    injectTimes={[
                        setHours(setMinutes(date ? date : new Date(), 59), 23),
                    ]}

                />
            </div>

            <div className="input-group-append" onClick={onCalendarClick}>
                <button className={`${inputSize ? `btn btn-${inputSize}` : 'btn'} btn-light`} type="button">
                    <i className="ui-icon ui-icon-calendar" aria-hidden={true}></i>
                </button>
            </div>

            {drawFieldErrors(fieldState.invalid, fieldState?.error?.message, id)}
        </div>
    );
};

//#endregion

//#region AutoComplete

export interface IAutoCompleteOption {
    value: string | number;
    label: string;
    searchField?: string;
}

interface IAutoCompleteUIProps {
    options: IAutoCompleteOption[];
    field: any;
    fieldState: ControllerFieldState;
    id: string;
    isMulti: boolean;
    minCharactersToShowOptions?: number;
}

const AutoCompleteUI: React.FC<IAutoCompleteUIProps> = ({ field, fieldState, id, isMulti, options, minCharactersToShowOptions }) => {

    const [showOptions, setShowOptions] = useState<boolean>(isNullOrUndefinedOrEmpty(minCharactersToShowOptions) ? true : false);
    const [selectedValue, setSelectedValue] = useState(field.value);

    useUpdateEffect(() => {
        setSelectedValue(field.value);

    }, [field.value])

    const onChange = (options: IAutoCompleteOption | IAutoCompleteOption[]) => {

        if (isMulti) {
            const values = (options as IAutoCompleteOption[]).map(option => option.value)
            field.onChange(values);
            setSelectedValue(values);
        } else {
            const value = ((options as IAutoCompleteOption)?.value)
            field.onChange(value)
            setSelectedValue(value);
        }
    };

    const handleInputChange = (text): void => {
        setShowOptions(!isNullOrUndefinedOrEmpty(text) && text.length >= minCharactersToShowOptions)
    }

    const getSelectedOptions = () => {
        if (isMulti) {
            if (selectedValue?.length > 0) {

                const currentSelectedValues = options.filter(x => selectedValue.includes(x.value));

                return currentSelectedValues.map(currentValue => {

                    return { ...currentValue, label: currentValue.searchField }
                })
            }
        } else {

            if (selectedValue) {
                const currentValue = options.find(x => x.value == selectedValue)

                if (currentValue) {
                    return { ...currentValue, label: currentValue.searchField }
                }
            }
        }

        return null;
    }

    const filterOption = (option, searchText) => {

        if (!isNullOrUndefinedOrEmpty(option.data.searchField)) {
            if (option.data.searchField.toLowerCase().includes(searchText.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        }
    };

    return <>
        <WindowedSelect
            inputId={id}
            options={showOptions ? options : []}
            backspaceRemovesValue={true}
            isClearable={true}
            isMulti={isMulti}
            value={getSelectedOptions()}
            filterOption={filterOption}
            closeMenuOnSelect={true}
            windowThreshold={0}
            isLoading={false}
            noOptionsMessage={() => null}
            classNamePrefix="select"
            className={`custom-react-select${(fieldState.invalid ? ' input-error' : '')}`}
            aria-invalid={fieldState.invalid ? "true" : "false"}
            aria-describedby={`${id}_${fieldState.invalid ? "ERRORS" : "HELP"}`}
            placeholder='Избери...'
            onChange={onChange}
            onInputChange={isNullOrUndefinedOrEmpty(minCharactersToShowOptions) ? null : handleInputChange}
            onBlur={field.onBlur}
        />
        {drawFieldErrors(fieldState.invalid, fieldState?.error?.message, id)}
    </>
}

//#endregion

export const useHTMLControls = <TModel extends FieldValues = FieldValues>(formContext: UseFormReturn<TModel>, propertyChainNames = '') => {

    //#region private functions

    const getPropertyFullName = (propertyName: string): any => !isNullOrUndefinedOrEmpty(propertyChainNames) ? `${propertyChainNames}.${propertyName}` : propertyName;

    const getFieldId = (propFullName: string) => propFullName.replace(".", "_").replace("[", "_").replace("]", "_");

    const fieldRegister = (propertyName: Path<TModel>, options?: RegisterOptions) => {
        const propertyNameResult = getPropertyFullName(propertyName);

        return { ...formContext.register(propertyNameResult, options) };
    };

    const getFieldProperties = (propertyName: Path<TModel>) => {
        const propertyFullName = getPropertyFullName(propertyName);
        const id = getFieldId(propertyFullName);
        const name = propertyFullName;
        const fieldState = formContext.getFieldState(propertyFullName);

        return { id, name, errorMessage: fieldState?.error?.message, hasError: fieldState.invalid };
    };

    //#endregion

    //#region public funcitons

    const selector = (propertyName: Path<TModel>): any => {
        return getPropertyFullName(propertyName);
    }

    const labelFor = (propertyName: Path<TModel>, text: string, isRequired?: boolean, attr?: any) => {
        attr = attr
            ? attr
            : isRequired
                ? Constants.HTML_ATTRIBUTES.ATTRIBUTES_CLASS_FORM_CONTROL_LABEL_REQUIRED_FIELD
                : Constants.HTML_ATTRIBUTES.ATTRIBUTES_CLASS_FORM_CONTROL_LABEL;

        return (
            <label htmlFor={getFieldId(propertyName)} {...attr}>
                {text}
            </label>
        );
    };

    const inputFor = (propertyName: Path<TModel>, type: "text" | "number" = "text", isRequired?: boolean, attributes?: any) => {
        const { id, errorMessage, hasError } = getFieldProperties(propertyName);
        const inputClass = !isNullOrUndefinedOrEmpty(attributes?.className) ? `${attributes.className}${hasError ? " input-error" : ""}` : `form-control${hasError ? " input-error" : ""}`;

        return (
            <>
                <input {...attributes} className={inputClass} id={id} type={type} aria-required={!!isRequired} aria-invalid={hasError} aria-describedby={`${id}_${hasError ? "ERRORS" : "HELP"}`} {...fieldRegister(propertyName)} />
                {drawFieldErrors(hasError, errorMessage, id)}
            </>
        );
    };

    const checkBoxFor = (propertyName: Path<TModel>, isRequired?: boolean, attributes?: any) => {
        const { id, errorMessage, hasError } = getFieldProperties(propertyName);
        const inputClass = !isNullOrUndefinedOrEmpty(attributes?.className) ? `${attributes.className}${hasError ? " input-error" : ""}` : `custom-control-input ${hasError ? "input-error" : ""}`;

        return (
            <>
                <input {...attributes} id={id} type="checkbox" className={inputClass} aria-required={!!isRequired} aria-invalid={hasError} aria-describedby={`${id}_${hasError ? "ERRORS" : "HELP"}`} {...fieldRegister(propertyName)} />
                {drawFieldErrors(hasError, errorMessage, id)}
            </>
        );
    };

    const selectFor = (propertyName: Path<TModel>, options: SelectListItem[], isRequired?: boolean, isMulti?: boolean, emptyValueText?: string, attributes?: SelectHTMLAttributes<any>) => {
        const { id, errorMessage, hasError } = getFieldProperties(propertyName);
        const inputClass = !isNullOrUndefinedOrEmpty(attributes?.className) ? `${attributes.className}${hasError ? " input-error" : ""}` : `form-control${hasError ? " input-error" : ""}`;

        return (
            <>
                <select {...attributes} className={inputClass} id={id} multiple={isMulti} aria-required={!!isRequired} aria-invalid={hasError} aria-describedby={`${id}_${hasError ? "ERRORS" : "HELP"}`} {...fieldRegister(propertyName)}>
                    <option value="" key={"empty-value"}>
                        {emptyValueText ? emptyValueText : 'Избери'}
                    </option>
                    {options && options.length > 0
                        ? options.map((item: SelectListItem, idx: number) => {
                            return (
                                <option value={item.value} key={propertyName + idx}>
                                    {item.text}
                                </option>
                            );
                        })
                        : null}
                </select>
                {drawFieldErrors(hasError, errorMessage, id)}
            </>
        );
    };

    const radioButtonListFor = (propertyName: Path<TModel>, options: SelectListItem[], attributes?: SelectHTMLAttributes<any>) => {
        const { id, errorMessage, hasError } = getFieldProperties(propertyName);
        const inputClass = !isNullOrUndefinedOrEmpty(attributes?.className)
            ? `${attributes.className}${hasError ? " input-error" : ""}`
            : `custom-control custom-radio${hasError ? " input-error" : ""}`;

        if (options && options.length > 0) {
            return (
                <>
                    <div {...attributes} className={inputClass} aria-invalid={hasError} aria-describedby={`${id}_${hasError ? "ERRORS" : "HELP"}`}>
                        {options.map((item: SelectListItem, idx: number) => {
                            const itemId = `${item.value}_${idx}`;

                            return (
                                <div className="custom-control-inline custom-control custom-radio" key={itemId}>
                                    <input id={itemId} type="radio" className="custom-control-input" name={itemId} defaultValue={item.value} {...fieldRegister(propertyName)} />
                                    <label className="custom-control-label" htmlFor={itemId}>
                                        &nbsp;{item.text}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    {drawFieldErrors(hasError, errorMessage, id)}
                </>
            );
        }

        return null;
    };

    const checkBoxListFor = (propertyName: Path<TModel>, options: SelectListItem[], attributes?: any, isCheckboxesVertical?: any) => {
        const { id, errorMessage, hasError } = getFieldProperties(propertyName);
        const inputClass = !isNullOrUndefinedOrEmpty(attributes?.className) ? `${attributes.className}${hasError ? " input-error" : ""}` : `${isCheckboxesVertical ? "" : "form-inline"}${hasError ? " input-error" : ""}`;
        const inlineClass = isNullOrUndefinedOrEmpty(isCheckboxesVertical) || !isCheckboxesVertical ? "custom-control-inline" : '';

        if (options && options.length > 0) {
            return (
                <>
                    <div {...attributes} className={inputClass} aria-invalid={hasError} aria-describedby={`${id}_${hasError ? "ERRORS" : "HELP"}`}>
                        {options.map((item: SelectListItem, idx: number) => {
                            const itemId = `${item.value}_${idx}`;

                            return (
                                <div className={`${inlineClass} custom-control custom-checkbox`} key={itemId}>
                                    <input id={itemId} name={propertyName} value={item.value} type="checkbox" className="custom-control-input" {...fieldRegister(propertyName)} />
                                    <label htmlFor={itemId} className="custom-control-label">
                                        {item.text}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    {drawFieldErrors(hasError, errorMessage, id)}
                </>
            );
        }

        return null;
    };

    const textAreaFor = (propertyName: Path<TModel>, rows?: number, cols?: number, isRequired?: boolean, attributes?: any) => {
        const { id, errorMessage, hasError } = getFieldProperties(propertyName);
        const inputClass = !isNullOrUndefinedOrEmpty(attributes?.className) ? `${attributes.className}${hasError ? " input-error" : ""}` : `form-control${hasError ? " input-error" : ""}`;

        return (
            <>
                <textarea {...attributes} className={inputClass} id={id} rows={rows} cols={cols} aria-required={!!isRequired} aria-invalid={hasError} aria-describedby={`${id}_${hasError ? "ERRORS" : "HELP"}`} {...fieldRegister(propertyName)} />
                {drawFieldErrors(hasError, errorMessage, id)}
            </>
        );
    };

    const dateFor = (propertyName: Path<TModel>, toEndOfDay?: boolean, format?: string, reactDatePickerProps?: Partial<ReactDatePickerProps>, inputSize?: string) => {
        const { id } = getFieldProperties(propertyName);

        return <Controller control={formContext.control} name={propertyName} render={({ field, fieldState }) => <DatePickerUI id={id} field={field} type={"date"} fieldState={fieldState} toEndOfDay={toEndOfDay} format={format} inputSize={inputSize} reactDatePickerProps={reactDatePickerProps} />} />;
    };

    const dateTimeFor = (propertyName: Path<TModel>, format?: string, reactDatePickerProps?: Partial<ReactDatePickerProps>, inputSize?: string) => {
        const { id } = getFieldProperties(propertyName);

        return <Controller control={formContext.control} name={propertyName} render={({ field, fieldState }) => <DatePickerUI id={id} field={field} type={"date-time"} fieldState={fieldState} format={format} inputSize={inputSize} reactDatePickerProps={reactDatePickerProps} />} />;
    };

    const autoCompleteFor = (propertyName: Path<TModel>, options: IAutoCompleteOption[], isMulti?: boolean, minCharactersToShowOptions?: number) => {
        const { id } = getFieldProperties(propertyName);

        return <Controller
            control={formContext.control}
            name={propertyName}
            render={
                ({ field, fieldState }) => <AutoCompleteUI id={id} field={field} fieldState={fieldState} options={options} isMulti={isMulti} minCharactersToShowOptions={minCharactersToShowOptions} />
            }
        />;
    };

    //#endregion

    return {
        selector,
        labelFor,
        inputFor,
        checkBoxFor,
        selectFor,
        radioButtonListFor,
        checkBoxListFor,
        textAreaFor,
        dateFor,
        dateTimeFor,
        autoCompleteFor
    };
};