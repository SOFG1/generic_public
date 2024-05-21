import React, {useMemo, useState} from "react";
import {InputValueType} from "../../types";
import {escapeRegExp} from "../../utils";
import {Dropdown} from "../../UI/Dropdown";
import {desktopBp} from "../../styles/variables";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {SearchIcon} from "../../UI/Svg";

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
    required?: boolean
    menuChild?: JSX.Element;
    deletableOptions?: {
        callback: (v: any) => void
        action: string
    }
}

const SearchInput = styled.input`
    border: 0;
    width: 100%;
    outline: 0;
    font-size: 0.94vw;
    max-width: 100%;
    line-height: 1.04vw;
    background-color: #fff;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 12px;
        line-height: 13px;
    }
`

const StyledChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledChildrenItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  border-bottom: 1px solid #000;
  padding: 0.52vw 1.30vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 7px 16px;
  }
`

const StyledDropdown = styled(Dropdown)`
    margin-bottom: 2px;
  
    & .styled_dropdown_label{
      font-size: ${props => props.theme.fontSize.primary.vw};
      color:${props => props.theme.color.grey};
      font-weight: 400;
      font-family: "IBM Plex Mono", monospace;

      @media screen and (max-width: ${desktopBp}) {
        padding: 7px 0;
        font-size: ${props => props.theme.fontSize.primary.px};
      }
    }
    & .styled_dropdown_option{
      padding: 0.52vw 1.30vw;
      font-size: 0.63vw;
      @media screen and (max-width: ${desktopBp}) {
        padding: 7px 16px;
        font-size: 8px;
      }
    }
  & .styled_dropdown_value_wrapper{
    border-bottom: 1.5px solid #838080;
    border-inline-end: none;
    background: rgba(243, 243, 243, 1);
    height: 1.93vw;
    @media screen and (max-width: ${desktopBp}) {
        height: 24px;
    }
  }
  height: initial;
  @media screen and (max-width: ${desktopBp}) {
    height: initial;
  }
`

const AudienceDropdownComponent = React.memo(({
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
                                         menuChild,
                                         ...props
                                     }: DropdownWithSearchProps)=>{

    const [prefetch, setPrefetch] = useState<string>("");
    const {t} = useTranslation();
    const items = useMemo(() => {
        if (prefetch.length > 0) {
            const regex = new RegExp(escapeRegExp(prefetch), "i")
            return options.filter((item) => {
                return item.item?.match(regex)
            });
        } else {
            return options;
        }
    }, [options, prefetch]);


    return (
        <StyledDropdown
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
                <StyledChildrenContainer>
                    <StyledChildrenItem>
                        <SearchInput placeholder={t("raw-data_audience_search_placeholder")} type="text" value={prefetch} onChange={(e) => setPrefetch(e.target.value)}/>
                    </StyledChildrenItem>
                    <StyledChildrenItem>
                        {menuChild}
                    </StyledChildrenItem>
                </StyledChildrenContainer>
            }
            {...props}
        />
    );
})

export default AudienceDropdownComponent;
