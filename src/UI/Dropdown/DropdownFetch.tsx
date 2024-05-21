import React, { useEffect, useMemo, useState } from "react";
import { Dropdown } from "./index";
import { useDropdownFetch } from "../../hooks/useDropdownFetch";
import styled from "styled-components";
import { InputValueType } from "../../types";
import { desktopBp } from "../../styles/variables";
import { escapeRegExp } from "../../utils";

interface DropdownFetchProps {
  value: InputValueType;
  realValue?:InputValueType | undefined,
  placeholder: string;
  onSelect: (key: any) => void;
  label: string;
  isSmall?: boolean;
  isMultiSelect?: boolean;
  isForPreview: boolean
  len_input_prefetch: number;
  slug: string;
  isDisabled?: boolean;
  dependentOption?: string | number | null;
  initPrefetch?: string;
  required?: boolean;
}

const SearchInput = styled.input`
  border: 0;
  outline: 0;
  font-size: ${props => props.theme.fontSize.primary.vw};
  max-width: 100%;
  line-height: 1.04vw;
  background-color: #fff;
  padding: 0.31vw 0.67vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.primary.px};
    line-height: 13px;
    padding: 4px 8px;
  }
`;

const DropdownFetch = React.memo(
  ({
    value,
    realValue,
    slug,
    placeholder,
    onSelect,
    required,
    label,
    isSmall,
    isMultiSelect,
    len_input_prefetch,
    dependentOption,
    isForPreview,
    isDisabled,
    initPrefetch = "",
    ...props
  }: DropdownFetchProps) => {
    const [prefetch, setPrefetch] = useState<string>("");
    const [cityAutoSelected, setCityAutoSelected] = useState<boolean>(false)

    useEffect(() => {
      setPrefetch(initPrefetch);
    }, [initPrefetch]);

    const dropdownFetch = useDropdownFetch(
      slug,
      prefetch,
      len_input_prefetch,
      isForPreview,
      isDisabled,
      dependentOption,
    );

    const items = useMemo(() => {
      let options = dropdownFetch;
      if (prefetch?.length > 0) {
        const regex = new RegExp(escapeRegExp(prefetch), "i")
        options = dropdownFetch.filter((item) => {
          return item.item?.match(regex)
        });
      }
      if (value && options.length === 0 && !isMultiSelect)
        options = [{ item: String(value), value: String(value) }];
      if (
        value &&
        options.length === 0 &&
        isMultiSelect &&
        typeof value === "string"
      ) {
        options = value.split(", ").map((o) => ({ item: o, value: o }));
      }

      return options;
    }, [dropdownFetch, prefetch, initPrefetch, value]);



    //Autoselect city if there is only one option
    useEffect(() => {
      if (slug === "city" && dropdownFetch.length === 1 && (realValue === undefined || realValue === null) && !cityAutoSelected) {
        onSelect(dropdownFetch[0].value)
        setCityAutoSelected(true)
      }
    }, [slug, dropdownFetch.length, realValue, cityAutoSelected]);

    const checkedValue = useMemo(() => {
      if ((slug === "street" || slug === "city") && typeof value === "string") {
        //@ts-ignore
        let intVal = items.find((i) => {
          return i.item == value;
        })?.value;
        return intVal ? intVal : value;
      }
      return value;
    }, [slug, value, items]);

    return (
      <Dropdown
        value={checkedValue}
        placeholder={label}
        required={required}
        onSelect={onSelect}
        isMultiSelect={isMultiSelect}
        isDisabled={isDisabled}
        options={items}
        label={label}
        menuChild={
          <SearchInput
            placeholder="Search"
            type="text"
            value={prefetch}
            onChange={(e) => setPrefetch(e.target.value)}
          />
        }
        {...props}
      />
    );
  }
);

export default DropdownFetch;
