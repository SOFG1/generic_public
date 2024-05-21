import React, { useCallback, useMemo } from "react";
import {
  Checkbox,
  Input,
  InputDate,
  SingleInputNumber,
  SingleInputDate,
  NumberRange,
} from "../../../UI/Input";
import {
  DropdownFetch,
  DropdownManual,
  DropdownManualFetch,
  DropdownWithSearch,
} from "../../../UI/Dropdown";
import { InputValueType } from "../../../types";
import styled from "styled-components";
import { desktopBp } from "../../../styles/variables";

interface HocInputProps {
  filter: {
    id?: number;
    type: string;
    name: string;
    label: string;
    variants?: string[];
    fetch?: boolean;
    required?: boolean;
    is_multiplier?: boolean;
    len_input_prefetch?: number;
    options?: { [key: string | number]: any };
    parent?: string | null;
    is_manual_input?: boolean;
  };
  errorMessage?: string;
  isDisabled?: boolean;
  showTimeSelect?: boolean;
  isReversed?: boolean;
  value: any;
  dependentOption?: string | number | null;
  onChange: (key: string, value: InputValueType) => void;
  onAddOption?: (opt: string) => void;
  isForPreview: boolean
  className?: string;
}

const StyledCheckbox = styled(Checkbox)`
  margin-bottom: 0.89vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 11px;
  }
`;

const FieldInput = React.memo(
  ({
    filter,
    value,
    errorMessage,
    dependentOption,
    isDisabled,
    isForPreview,
    onChange,
    onAddOption,
    ...props
  }: HocInputProps) => {
    const isReferalOrMobilizer = useMemo(() => {
      return filter.name === "referal" || filter.name === "mobilizer";
    }, [filter.name]);

    const onChangeInputHandler = useCallback(
      (val: InputValueType) => {
        onChange(filter.name, val);
      },
      [filter, onChange]
    );

    //Append NOT NULL option for some cases
    const dropdownOptions = useMemo(() => {
      const options = Array.isArray(filter.options)
        ? filter.options?.map((o: [string, string]) => ({
            item: o[0],
            value: o[1],
          }))
        : [];
      return options;
    }, [filter.options]);

    const handleAddOption = useCallback(
      (opt: string) => {
        if (onAddOption) onAddOption(opt);
      },
      [onAddOption]
    );



    if (filter.is_manual_input && !filter.id) {
      return (
        <DropdownManual
          onAddOption={handleAddOption}
          onSelect={onChangeInputHandler}
          options={dropdownOptions}
          label={filter.label}
          placeholder={filter.label}
          value={value}
        />
      );
    }

    if (filter?.options && filter?.options.length > 0 && filter.fetch) {
      return (
        <DropdownWithSearch
          value={value}
          placeholder={filter.label}
          onSelect={onChangeInputHandler}
          isMultiSelect={filter.is_multiplier}
          isDisabled={isDisabled}
          options={dropdownOptions}
          label={filter.label}
          required={filter.required}
          {...props}
        />
      );
    }

    if (filter.is_manual_input && filter.id) {
      return (
        <DropdownManualFetch
          id={filter.id}
          len_input_prefetch={filter.len_input_prefetch || 0}
          isMultiSelect={filter.is_multiplier}
          slug={filter.name}
          value={value}
          placeholder={filter.label}
          dependentOption={dependentOption}
          isDisabled={isDisabled}
          onSelect={onChangeInputHandler}
          label={filter.label}
          required={filter.required}
          initPrefetch={isReferalOrMobilizer ? value : ""}
          {...props}
        />
      );
    }

    if (filter.fetch) {

      return (
        <DropdownFetch
          len_input_prefetch={filter.len_input_prefetch || 0}
          isMultiSelect={filter.is_multiplier}
          slug={filter.name}
          value={value}
          placeholder={filter.label}
          dependentOption={dependentOption}
          isDisabled={isDisabled}
          onSelect={onChangeInputHandler}
          required={filter.required}
          label={filter.label}
          isForPreview={isForPreview}
          initPrefetch={isReferalOrMobilizer ? value : ""}
          {...props}
        />
      );
    }

    if (filter.type === "timestamp" && Array.isArray(value)) {
      return (
        <InputDate
          expirationDate={value[1]}
          startDate={value[0]}
          label={filter.label}
          onChange={onChangeInputHandler}
          disabled={isDisabled}
          placeholder={filter.label}
          required={filter.required}
          {...props}
        />
      );
    }
    if (
      filter.type === "date-single") {
      const valueFormated = (value === null || typeof value.getMonth === "function") ? value : null
      return (
        <SingleInputDate
          label={filter.label}
          onChange={onChangeInputHandler}
          valueDate={""}
          startDate={valueFormated}
          disabled={isDisabled}
          required={filter.required}
          {...props}
        />
      );
    }

    if (filter.type === "int") {
      return (
        <NumberRange
          label={filter.label}
          onChange={onChangeInputHandler}
          value={value as [string | null, string | null]}
          disabled={isDisabled}
          isRequired={filter.required}
        />
      );
    }
    if (filter.type === "int-single") {
      return (
        <SingleInputNumber
          type={"text"}
          label={filter.label}
          onChange={onChangeInputHandler}
          value={String(value)}
          disabled={isDisabled}
          name={filter.label}
          isRequired={filter.required}
          placeholder={filter.label}
          {...props}
        />
      );
    }
    if (filter.type === "bool") {
      return (
        <StyledCheckbox
          className={props.className}
          label={filter.label.endsWith(":") ? filter.label.substring(0,  filter.label.length - 1) : filter.label}
          isActive={Boolean(value)}
          onChange={onChangeInputHandler}
          required={filter.required}
        />
      );
    }
    if (filter.type === "textarea") {
      return (
        <Input
          type={"text"}
          isTextarea={true}
          label={filter.label}
          onChange={onChangeInputHandler}
          disabled={isDisabled}
          value={String(value)}
          errorMessage={errorMessage}
          name={filter.name}
          isRequired={filter.required}
          placeholder={filter.label}
          {...props}
        />
      );
    }

    return (
      <Input
        type={filter.type}
        label={filter.label}
        onChange={onChangeInputHandler}
        value={String(value)}
        errorMessage={errorMessage}
        disabled={isDisabled}
        name={filter.name}
        isRequired={filter.required}
        placeholder={filter.label}
        {...props}
      />
    );
  }
);

export default FieldInput;
