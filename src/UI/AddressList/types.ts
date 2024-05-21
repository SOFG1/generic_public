export interface CreatableEditableSelectOption {
  label: string;
  value: string;
  color?: string;
}

export type CreatableEditableSelectValue = CreatableEditableSelectOption;

export interface IProps {
  options: CreatableEditableSelectOption[];
  value: CreatableEditableSelectValue[];
  onChange: (value: CreatableEditableSelectValue[]) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  isDisabled?: boolean;
  onInputChange?: (val: string) => void;
  isValidNewOption?: (inputValue: string) => boolean;
}
