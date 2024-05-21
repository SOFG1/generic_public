import React, { useMemo } from "react";
import { Checkbox, Input, InputDate, NumberRange } from "../../../UI/Input";
import {
  DropdownFetch,
  DropdownWithSearch,
} from "../../../UI/Dropdown";
import { InputValueType } from "../../../types";
import styled from "styled-components";
import { Button } from "../../../UI/Button";
import { desktopBp } from "../../../styles/variables";
import { useTranslation } from "react-i18next";

interface IWrapper{
    hasValue:boolean
}
const Wrapper = styled.div<IWrapper>`
  display: flex;
  background:${props => props.hasValue ?  "rgba(220, 220, 220, 1)" : "#fff"};
  transition: background .2s ease;
  border-radius: 5px;
  padding: 0.52vw 0.52vw 1.56vw 0.52vw;
  align-items: flex-end;
  gap: 0.78vw;
  > div {
    flex-grow: 1;
  }
  @media screen and (max-width: ${desktopBp}) {
    gap: 10px;
    padding: 7px 7px 20px 7px;
  }
`;

const InputBox = styled.div``;

const NotNullButton = styled(Button)<{ isActive: boolean }>`
  padding: 3px 3px;
  border-radius: 0;
  font-size: 0.63vw;
  line-height: 0.78vw;
  width: auto;
  white-space: nowrap;
  letter-spacing: 0;
  background: transparent;
  ${({ isActive }) => isActive && "background-color: #000; color: #fff;"}
  margin-bottom: 0.89vw;
  border: 1px solid #000;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 8px;
    line-height: 10px;
    margin-bottom: 11px;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  margin-bottom: 0.89vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 11px;
  }
`;

interface IProps {
  filter: {
    id?: number;
    type: string;
    slug: string;
    name: string;
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
  realValue?:string,
  dependentOption?: string | number | null;
  onChange: (value: InputValueType) => void;
  className?: string;
  isNotNull: boolean;
  toggleNotNull: () => void;
  onClick?: () => void;
}

const FilterInput = React.memo(
  ({
    filter,
    value,
    realValue,
    errorMessage,
    dependentOption,
    isDisabled,
    onChange,
    className,
    isNotNull,
    toggleNotNull,
    onClick,
    ...props
  }: IProps) => {
    const {t} = useTranslation();
    const isReferalOrMobilizer = useMemo(() => {
      return filter.slug === "referal" || filter.slug === "mobilizer";
    }, [filter.slug]);

    const dropdownOptions = useMemo(() => {
      const options = Array.isArray(filter.options)
        ? filter.options?.map((o: [string, string]) => ({
            item: o[0],
            value: o[1],
          }))
        : [];
      return options;
    }, [filter.options]);

    return (
      <Wrapper hasValue={!!(value || realValue)} className={className}>
        <InputBox onClick={onClick}>
          {(() => {
            if (filter?.options?.length > 0 && filter.fetch) {
              return (
                <DropdownWithSearch
                  value={value}
                  placeholder={filter.name}
                  onSelect={onChange}
                  isMultiSelect={filter.is_multiplier}
                  isDisabled={isDisabled}
                  options={dropdownOptions}
                  label={filter.name}
                  required={filter.required}
                  {...props}
                />
              );
            }


            if (filter.fetch) {
              return (
                <DropdownFetch
                  isForPreview={false}
                  len_input_prefetch={filter.len_input_prefetch || 0}
                  isMultiSelect={filter.is_multiplier}
                  slug={filter.slug}
                  value={value}
                  realValue={realValue}
                  placeholder={filter.name}
                  dependentOption={dependentOption}
                  isDisabled={isDisabled}
                  onSelect={onChange}
                  required={filter.required}
                  label={filter.name}
                  initPrefetch={isReferalOrMobilizer ? value : ""}
                  {...props}
                />
              );
            }


            if (filter.type === "timestamp") {
              return (
                <InputDate
                  expirationDate={Array.isArray(value) ? value[1] : null}
                  startDate={Array.isArray(value) ? value[0] : null}
                  label={filter.name}
                  onChange={onChange}
                  disabled={isDisabled}
                  placeholder={filter.name}
                  required={filter.required}
                  {...props}
                />
              );
            }

            if (filter.type === "int") {
              return (
                <NumberRange
                  label={filter.name}
                  onChange={onChange}
                  value={value as [string | null, string | null]}
                  disabled={isDisabled}
                  isRequired={filter.required}
                />
              );
            }

            if (filter.type === "float") {
              return (
                <NumberRange
                  label={filter.name}
                  onChange={onChange}
                  value={value as [string | null, string | null]}
                  disabled={isDisabled}
                  isRequired={filter.required}
                />
              );
            }

            if (filter.type === "bool") {
              return (
                <StyledCheckbox
                  label={filter.name}
                  isActive={Boolean(value)}
                  onChange={onChange}
                  required={filter.required}
                />
              );
            }
            if (filter.type === "textarea") {
              return (
                <Input
                  type={"text"}
                  isTextarea={true}
                  label={filter.name}
                  onChange={onChange}
                  disabled={isDisabled}
                  value={String(value)}
                  errorMessage={errorMessage}
                  name={filter.slug}
                  isRequired={filter.required}
                  placeholder={filter.name}
                  {...props}
                />
              );
            }

            return (
              <Input
                type={filter.type}
                label={filter.name}
                onChange={onChange}
                value={String(value)}
                errorMessage={errorMessage}
                disabled={isDisabled}
                name={filter.slug}
                isRequired={filter.required}
                placeholder={filter.name}
                {...props}
              />
            );
          })()}
        </InputBox>
        <NotNullButton isActive={isNotNull} onClick={toggleNotNull}>
          {t("raw-data_not-null")}
        </NotNullButton>
      </Wrapper>
    );
  }
);

export default FilterInput;
