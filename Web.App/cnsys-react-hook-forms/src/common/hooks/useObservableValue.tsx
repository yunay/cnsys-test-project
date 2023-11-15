import { endOfDay, setHours, setMinutes } from 'date-fns';
import React, { SelectHTMLAttributes, useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { useWatch } from "react-hook-form";
import WindowedSelect from 'react-windowed-select';
import { useUpdateEffect } from 'usehooks-ts';
import { Constants, isNullOrUndefinedOrEmpty } from "utilities";
import { SelectListItem } from "../models/CommonModels";


export const useObservableValue = () => {

    var observableValue =  useWatch({ name: "example" })

    return observableValue;
}