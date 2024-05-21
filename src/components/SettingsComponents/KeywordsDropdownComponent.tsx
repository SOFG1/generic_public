import React, { useMemo, useState } from "react"
import { InputValueType } from "../../types";
import { escapeRegExp } from "../../utils";
import { Dropdown } from "../../UI/Dropdown";
import styled from "styled-components";
import { Loader } from "../../UI/Spinners";
import { desktopBp } from "../../styles/variables";
import { Input } from "../../UI/Input";
import { useTranslation } from "react-i18next";
import { Button } from "../../UI/Button";
import {usePermissions} from "../../store/user";




const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.04vw;
    padding: 0.57vw 1.04vw;
    @media screen and (max-width: ${desktopBp}) {
        gap: 13px;
        padding: 7px 13px;
  }
`

const StyledLabel = styled.p`
    color: #AAA;
    font-size: 0.83vw;
    white-space: nowrap;
    font-weight: 500;
    margin: 0;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 10px;
    }
`

const StyledInput = styled(Input)`
  margin-bottom: -0.89vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: -11px;
  }
`
const StyledDropdown = styled(Dropdown)`
  margin-bottom: 0;

`
const StyledButton = styled(Button)`
    line-height: 1;
    font-style: normal;
    display: inline-block;
    font-weight: 500;
    border: 1px solid #000;
    text-align: center;
    background-color: transparent;
    width: 2.97vw;
    height: 1.20vw;
    padding: 0;
    font-size: 0.63vw;
    flex-shrink: 0;
    border-radius: 1.04vw;
    @media screen and (max-width: ${desktopBp}) {
        width: 37px;
        height: 15px;
        font-size: 8px;
        border-radius: 13px;
    }
`

const StyledLoader = styled(Loader)`
  height: 1.2vw;
  width: 1.2vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 15px;
    width: 15px;
  }
`;

interface IProps {
    value: InputValueType;
    onSelect: (val: any) => void;
    onAddOption: (val: string, parsing_style:string) => void;
    options: { item: string; value: string | number }[];
    isSmall?: boolean;
    isMultiSelect?: boolean;
    isDisabled?: boolean;
    isFetching?: boolean;
    onSearch?: (v: string) => void;
}

const KeywordsDropdownComponent = React.memo(({
    value,
    onSelect,
    onAddOption,
    isMultiSelect,
    isDisabled,
    options,
    isFetching,
    onSearch,
    ...props
}: IProps) => {
    const { t } = useTranslation()
    const [prefetch, setPrefetch] = useState<string>("");
    const [parsingStyle, setParsingStyle] = useState<string>("top");
    const permissions = usePermissions("Settings");
    console.log(permissions);
    const handleKeydown = (e: any) => {
        if (e.code === "Space") {
            e.preventDefault() // Prevent options closing on pressing "space"
            setPrefetch(p => `${p} `) //Change input value manually
        }
        if (e.code === "Enter") handleAddOption(prefetch);
    };

    const handleAddOption = (val: string) => {
        if (!isFetching) {
            onAddOption(val, parsingStyle);
            setPrefetch("");
        }
    };

    const filteredOptions = useMemo(() => {
        let pattern = prefetch.replaceAll("+", "")
        pattern = escapeRegExp(pattern)
        return options.filter((o) => o.item?.match(pattern));
    }, [options, prefetch]);

    const handleSearch = (val: string) => {
        setPrefetch(val);
        if (onSearch) onSearch(val);
    };




    return <Dropdown
        value={value}
        placeholder={t("settings_institutions-keyword")}
        onSelect={onSelect}
        isMultiSelect={isMultiSelect}
        isDisabled={isDisabled}
        options={filteredOptions}
        label={t("settings_institutions-keyword")}
        isFetching={isFetching}
        menuChild={
            <SearchWrapper onKeyDown={handleKeydown}>
                <StyledLabel>{t("settings_institutions-keyword-label")}</StyledLabel>
                <StyledInput
                    label={""}
                    placeholder={t("settings_institutions-keyword-enter")}
                    type="text"
                    onChange={(val) => handleSearch(val)}
                    value={prefetch}
                    name="Search"
                />
                {permissions.parsing_style
                    && <StyledDropdown value={parsingStyle} placeholder={t("settings_keywords_placeholder")}
                                       onSelect={(value)=>{setParsingStyle(value)}}
                                       options={[{item:"top", value:"top"}, {item:"recent", value:"recent"}]}
                                       label={""}
                />}

                {isFetching ? (
                    <StyledLoader />
                ) : (
                    <StyledButton onClick={() => handleAddOption(prefetch)}>
                        {t("settings_institutions-keyword-add")}
                    </StyledButton>
                )}
            </SearchWrapper>
        }
        {...props}
    />
})

export default KeywordsDropdownComponent
