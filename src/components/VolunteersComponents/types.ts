import { MultiValue } from "react-select";


export interface IMultiSelectProps {
    label: string
    placeholder: string
    value: MultiValue<any>
    onChange: (val: MultiValue<any>) => void
    onInputChange?: (val: string) => void
    options: {label: string, value: string}[]
    className?: string
}