import React, { useEffect, useMemo, useState } from "react";
import { Dropdown, SearchItem } from "./index";
import { useDropdownFetch } from "../../hooks/useDropdownFetch";
import styled from "styled-components";
import { InputValueType } from "../../types";
import { colors } from "../../styles/colors";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { escapeRegExp } from "../../utils";



const SearchItemWrapper = styled.div`
  position: relative;
`;

const SearchItemAddOption = styled.button<{ isRtl: boolean }>`
  position: absolute;
  ${({ isRtl }) => `${isRtl ? "left" : "right"}: 10px;`}
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  border: 0;
  height: 1.20vw;
  width: 1.20vw;
  text-align: center;
  font-weight: 900;
  font-size: 0.99vw;
  border-radius: 50%;
  background-color: ${colors.graphite_3};
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

interface DropdownManualFetchProps {
  id: number
  value: InputValueType;
  placeholder: string;
  onSelect: (key: any) => void;
  label: string;
  isSmall?: boolean;
  isMultiSelect?: boolean;
  len_input_prefetch: number;
  slug: string;
  required?: boolean
  isDisabled?: boolean;
  dependentOption?: string | number | null;
  initPrefetch?: string;
}



const DropdownManualFetch = React.memo(({
  id,
  value,
  slug,
  placeholder,
  onSelect,
  label,
  isSmall,
  isMultiSelect,
  len_input_prefetch,
  dependentOption,
  isDisabled,
  required,
  initPrefetch = "",
  ...props
}: DropdownManualFetchProps) => {
  const {token} = useUserState()
  const [prefetch, setPrefetch] = useState<string>("");


  useEffect(() => {
    setPrefetch(initPrefetch);
  }, [initPrefetch]);
  

  const dropdownFetch = useDropdownFetch(
    slug,
    prefetch,
    len_input_prefetch,
    false,
    isDisabled,
    dependentOption
  );

  const items = useMemo(() => {
    if (len_input_prefetch > 0) {
      return dropdownFetch;
    }
    if (prefetch.length > 0) {
      const regex = new RegExp(escapeRegExp(prefetch), "i")
      return dropdownFetch.filter((item) => {
        return regex.test(item.item);
      });
    }
    return dropdownFetch;
  }, [dropdownFetch, prefetch, initPrefetch, dropdownFetch]);



  if ((slug === "street" || slug === "city") && typeof value === "string") {
    //@ts-ignore
    let intVal = items.find((i) => {
      return i.item == value;
    })?.value;
    value = intVal ? intVal : value;
  }

  const handleKeydown = (e: any) => {
    if (e.key === "Enter") handleAddOption(prefetch);
  };

  const handleAddOption = async (text: string) => {
    //Add option for that field in database
    if(token) {
      const [dataRes, dataErr] = await handle(Settings.postOption(token, id, text))
      setPrefetch("")
    }
  };


  return (
    <Dropdown
      value={value}
      placeholder={label}
      onSelect={onSelect}
      isMultiSelect={isMultiSelect}
      isDisabled={isDisabled}
      options={items}
      required={required}
      label={label}
      menuChild={
        <SearchItemWrapper tabIndex={0} onKeyDown={handleKeydown}>
          <SearchItem
            onChange={(val: string) => setPrefetch(val)}
            value={prefetch}
            name={slug}
          />

          <SearchItemAddOption
            isRtl={document.body.dir === "rtl"}
            onClick={() => handleAddOption(prefetch)}
          >
            +
          </SearchItemAddOption>
        </SearchItemWrapper>
      }
      {...props}
    />
  );
})

export default DropdownManualFetch;
