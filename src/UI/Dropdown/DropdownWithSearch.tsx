import React, {ReactElement, useMemo, useState} from "react";
import { Dropdown } from "./index";
import styled from "styled-components";
import { InputValueType } from "../../types";
import { desktopBp } from "../../styles/variables";
import { escapeRegExp } from "../../utils";

interface DropdownWithSearchProps {
  value: InputValueType;
  placeholder: string;
  onSelect: (value: any) => void;
  label: string;
  isSmall?: boolean;
  isMultiSelect?: boolean;
  isDisabled?: boolean;
  dependentOption?: string | number | null;
  options: { item: string; value: string | number }[];
  isReversed?: boolean
  required?: boolean,
  searchIcon?:ReactElement,
  deletableOptions?: {
    callback: (v: any) => void
    action: string
  }
}
const StyledSearchContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 5px;
  justify-content: space-between;
  align-items: center;
`
const SearchInput = styled.input`
border: 0;
width: 100%;
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
`

const DropdownWithSearch = React.memo(({
  value,
  options,
  placeholder,
  onSelect,
  label,
  isSmall,
  isMultiSelect,
  dependentOption,
  isDisabled,
  isReversed,
  required,
  deletableOptions,
    searchIcon,
  ...props
}: DropdownWithSearchProps) => {
  const [prefetch, setPrefetch] = useState<string>("");

  const items = useMemo(() => {
      if (prefetch.length > 0) {
        const regex = new RegExp(escapeRegExp(prefetch), "i")
        return options.filter((item) => {
         return String(item?.item).match(regex)
        });
      } else {
        return options;
      }
  }, [options, prefetch]);

  return (
    <Dropdown
    isReversed={isReversed}
      value={value}
      placeholder={placeholder}
      onSelect={onSelect}
      isMultiSelect={isMultiSelect}
      isDisabled={isDisabled}
      options={items}
      label={label}
      required={required}
      deletableOptions={deletableOptions}
      menuChild={
          <StyledSearchContainer className={"styled_search_input_container"}>
            <SearchInput className="styled_search_input" placeholder="Search" type="text" value={prefetch} onChange={(e) => setPrefetch(e.target.value)}/>
            {searchIcon}
          </StyledSearchContainer>
      }
      {...props}
    />
  );
})

export default DropdownWithSearch;
