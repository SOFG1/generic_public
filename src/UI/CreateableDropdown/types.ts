export interface CreatableEditableSelectOption {
  label: string;
  value: string;
  color?: string
}

export type CreatableEditableSelectValue = CreatableEditableSelectOption;

export interface ICreatableProps {
  options: CreatableEditableSelectOption[];
  value: CreatableEditableSelectValue[];
  onChange: (value: CreatableEditableSelectValue[]) => void;
  className?: string
  placeholder?:string
  label?: string
  isDisabled?: boolean
  onInputChange?: (val: string) => void
}

export interface ICreatableFetchProps {
  value: CreatableEditableSelectValue[];
  onChange: (value: CreatableEditableSelectValue[]) => void;
  className?: string
  placeholder?:string
  label?: string
  slug: string
}
