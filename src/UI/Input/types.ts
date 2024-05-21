import React, {Component, FC, HTMLInputTypeAttribute, ReactElement, ReactNode} from "react";
import {InputValueType} from "../../types";

export enum InputVariants {
    Default = 'default',
    Small = 'small',
}
export type InputTypes = {
    variant?: InputVariants;
    isError?: boolean;
    withIcon?: boolean;
    isTextArea?: boolean
}

interface InputProps {
    type: HTMLInputTypeAttribute,
    placeholder?: string,
    label: string,
    id?: string,
    onChange: (value: any) => void,
    onBlur?: (event: any) => void,
    value: string | number,
    name: string,
    isTextarea?: boolean
    errorMessage?: string
    isRequired?: boolean
    isAutoFocus?: boolean
    disabled?: boolean
    variant?: InputVariants;
    Icon?: FC;
    className?:string,
}

interface InputDateProps {
    onChange: (value: any) => void,
    startDate: Date | null
    expirationDate: Date | null
    required?: boolean
    label: string,
    placeholder?: string,
    disabled?: boolean
}
interface InputSingleDateProps {
    label?: string
    onChange: (val: any) => void
    valueDate?: InputValueType
    required?: boolean
    defaultValueDate?: InputValueType
    startDate: Date | null,
    disabled?: boolean
    showTimeSelect?:boolean
}

interface InputFileProps {
    value?: File,
    onChange: (file: File | FileList) => void,
    placeholder: string | JSX.Element,
    label?: string | JSX.Element,
    content: JSX.Element,
    errorMessage?: string
    isMultiple?: boolean
    formats?: string
    className?: string
}

interface InputPasswordProps {
    placeholder?: string
    label: string
    id?: string
    onChange: (value: string)=> void
    onBlur?: (event: any) => void
    value: string
    name: string
    errorMessage?: string
    isRequired?: boolean
    isAutoFocus?: boolean
    disabled?: boolean
    className?:string
    useLegacyInput?:boolean
}

export type {InputProps, InputFileProps, InputDateProps, InputSingleDateProps, InputPasswordProps}
