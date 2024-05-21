import React, { useMemo, useState } from "react";
import { Dropdown } from "./index";
import { Input } from "../Input";
import styled from "styled-components";
import { InputValueType } from "../../types";
import { desktopBp } from "../../styles/variables";
import { escapeRegExp } from "../../utils";

interface DropdownSearchFetchProps {
  value: InputValueType;
  placeholder: string;
  onSelect: (key: any) => void;
  onSearch: (value: string) => void;
  validator?: (v: string) => boolean
  label: string;
  isSmall?: boolean;
  isMultiSelect?: boolean;
  isDisabled?: boolean;
  dependentOption?: string | number | null;
  options: { item: string; value: string | number }[];
  isReversed?: boolean
}

const SearchInput = styled.input`
  border: 0;
  outline: 0;
  font-size: 0.94vw;
  max-width: 100%;
  line-height: 1.04vw;
  background-color: #fff;
  padding: 0.31vw 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 13px;
    padding: 4px 0;
  }
`;

const DropdownSearchFetch = React.memo(
  ({
    value,
    options,
    placeholder,
    onSelect,
    onSearch,
    label,
    isSmall,
    isMultiSelect,
    dependentOption,
    isDisabled,
    isReversed,
    validator,
    ...props
  }: DropdownSearchFetchProps) => {
    const [prefetch, setPrefetch] = useState<string>("");


    const onChange = (val: string) => {
      if(validator && val && !validator(val)) return 
      setPrefetch(val);
      onSearch(val);
    };

    const items = useMemo(() => {
      if (prefetch.length > 0) {
        const regex = new RegExp(escapeRegExp(prefetch), "i")
        return options.filter((item) => {
           return String(item?.item).match(regex)
        });
      }
      return options;
    }, [options, prefetch]);

    return (
      <Dropdown
        value={value}
        placeholder={label}
        onSelect={onSelect}
        isMultiSelect={isMultiSelect}
        isDisabled={isDisabled}
        options={items}
        label={label}
        isReversed={isReversed}
        menuChild={
          <SearchInput
            placeholder="Search"
            type="text"
            value={prefetch}
            onChange={(e) => onChange(e.target.value)}
          />
        }
        {...props}
      />
    );
  }
);

export default DropdownSearchFetch;
