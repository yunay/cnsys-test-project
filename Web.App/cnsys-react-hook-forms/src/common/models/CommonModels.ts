import { UseFormReturn } from 'react-hook-form'

export type ContentViewType = 'search' | 'add' | 'edit' | 'preview'

export type AddEditDeleteType = 'add' | 'edit' | 'delete'

export type PreviewDataType = 'current' | 'historical';

export class BaseSearchCriteria {
    public page: number = 1;
    public count: number = null;
}

export interface IFormComponent<TModel> {
    propertyChainNames?: string;
    formContext?: UseFormReturn<TModel>;
}

export interface SelectListItem {
    selected?: boolean;
    text: string;
    value: string | number;
}

export interface IPreviewHistoryData {
    dateOfChange?: Date;
    previewType: PreviewDataType;
}