import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { InputValueType } from "../../types";
import { Loader } from "../Spinners";
import Dropdown from "./Dropdown";
import SearchItem from "./SearchItem";
import { escapeRegExp } from "../../utils";

const SearchItemWrapper = styled.div`
  padding: 1px 3px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 0.26vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 3px;
  }
`;

const StyledLoader = styled(Loader)`
  height: 1.2vw;
  width: 1.2vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 15px;
    width: 15px;
  }
`;

const SearchItemAddOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;
  border: 1px solid #000;
  height: 1.2vw;
  width: 1.2vw;
  text-align: center;
  font-weight: 900;
  font-size: 0.99vw;
  border-radius: 50%;
  color: #000;
  background-color: #fff;
  cursor: pointer;
  transition: opacity 200ms linear;
  &:hover {
    opacity: 0.75;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 15px;
    width: 15px;
    font-size: 12px;
  }
`;

interface DropdownManualProps {
  value: InputValueType;
  placeholder: string;
  onSelect: (val: any) => void;
  onAddOption: (val: string) => void;
  options: { item: string; value: string | number }[];
  label: string;
  isSmall?: boolean;
  isMultiSelect?: boolean;
  isDisabled?: boolean;
  isFetching?: boolean;
  onSearch?: (v: string) => void;
}

const DropdownManual = React.memo(
  ({
    value,
    label,
    placeholder,
    onSelect,
    onAddOption,
    isMultiSelect,
    isDisabled,
    options,
    isFetching,
    onSearch,
    ...props
  }: DropdownManualProps) => {
    const [prefetch, setPrefetch] = useState<string>("");

    const handleKeydown = (e: any) => {
      if (e.key === "Enter") handleAddOption(prefetch);
    };

    const handleAddOption = (val: string) => {
      if (!isFetching) {
        onAddOption(val);
        setPrefetch("");
      }
    };

    const filteredOptions = useMemo(() => {
      const regex = new RegExp(escapeRegExp(prefetch), "i")
      return options.filter((o) => o.item?.match(regex));
    }, [options, prefetch]);

    const handleSearch = (val: string) => {
      setPrefetch(val);
      if (onSearch) onSearch(val);
    };

    return (
      <Dropdown
        value={value}
        placeholder={placeholder}
        onSelect={onSelect}
        isMultiSelect={isMultiSelect}
        isDisabled={isDisabled}
        options={filteredOptions}
        label={label}
        isFetching={isFetching}
        menuChild={
          <SearchItemWrapper tabIndex={0} onKeyDown={handleKeydown}>
            <SearchItem
              onChange={(val) => handleSearch(val)}
              value={prefetch}
              name="Search"
            />
            {isFetching ? (
              <StyledLoader />
            ) : (
              <SearchItemAddOption onClick={() => handleAddOption(prefetch)}>
                +
              </SearchItemAddOption>
            )}
          </SearchItemWrapper>
        }
        {...props}
      />
    );
  }
);

export default DropdownManual;
