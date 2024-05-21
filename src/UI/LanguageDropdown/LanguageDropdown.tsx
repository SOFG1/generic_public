import i18next from "i18next";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { langOptions } from "../../config/langOptions";
import { desktopBp } from "../../styles/variables";
import { IProps } from "./types";
import { activityList } from "../../config/userActivityList";
import { primaryInstance, secondaryInstance } from "../../api";

const StyledDropdown = styled.div`
  position: relative;
  display: flex;
  gap: 1.04vw;
  align-items: center;
  z-index: 10;
  &:hover {
    z-index: 25;
  }
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
  }
`;

const Label = styled.p`
  margin: 0;
  white-space: nowrap;
  font-size: 0.73vw;
  line-height: 0.93vw;
  color: #000;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 9px;
    line-height: 12px;
  }
  @media screen and (max-width: 1050px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  position: relative;
  &:hover .options {
    display: block;
  }
`;

const StyledValue = styled.p`
  padding: 0.2vw 0;
  margin: 0;
  font-size: 1.9vw;
  line-height: 2.44vw;
  font-weight: 700;
  color: #000;
  @media screen and (max-width: ${desktopBp}) {
    padding: 3px 0;
    font-size: 23px;
    line-height: 31px;
  }
`;

const StyledOptionsBlock = styled.div`
  top: 0;
  display: none;
  position: absolute;
  padding: 4px 6px;
  background-color: #ffffff;
  box-shadow: 0px 67px 27px rgba(0, 0, 0, 0.01),
    0px 37px 22px rgba(0, 0, 0, 0.05), 0px 17px 17px rgba(0, 0, 0, 0.09),
    0px 4px 9px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  @media screen and (max-width: ${desktopBp}) {
    padding: 3px 4px;
  }
`;

const StyledOption = styled.p`
  font-weight: 700;
  font-size: 1.9vw;
  margin: 0;
  cursor: pointer;
  padding: 3px 0;
  border-bottom: 1px solid #d9d9d9;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }
  @media screen and (max-width: ${desktopBp}) {
    padding: 3px 4px;
    font-size: 23px;
  }
`;

const LanguageDropdown = React.memo(({ className }: IProps) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18next.dir()
  let lang = localStorage.getItem("i18nextLng");
  if (lang !== "en" && lang !== "he") {
    lang = "en";
  }

  const selectedLang = useMemo(() => {
    return langOptions.find((o) => o.value === lang);
  }, [langOptions, lang]);

  //Replace selected to the first order in dropdown
  const sortedOptions = useMemo(() => {
    if (selectedLang) {
      const withoutSelected = langOptions.filter(
        (o) => o.value !== selectedLang?.value
      );
      return [
        { item: selectedLang.item, value: selectedLang.value },
        ...withoutSelected,
      ];
    }
    return langOptions;
  }, [langOptions, selectedLang]);

  const handleSelect = (val: string) => {
    if (val !== lang) i18next.changeLanguage(val);
  };

  useEffect(() => {
    primaryInstance.defaults.headers.common["Accept-Language"] = i18n.language
    secondaryInstance.defaults.headers.common["Accept-Language"] = i18n.language
  }, [i18n.language])

  return (
    <StyledDropdown className={className}>
      {/* Remove label */}
      {/* <Label>{t("language")}</Label> */}
      <Wrapper>
        <StyledValue>{selectedLang?.item}</StyledValue>
        <StyledOptionsBlock className="options">
          {sortedOptions.map((o) => (
            <StyledOption key={o.value} onClick={() => handleSelect(o.value)} data-action={activityList["change-lang"]}>
              {o.item}
            </StyledOption>
          ))}
        </StyledOptionsBlock>
      </Wrapper>
    </StyledDropdown>
  );
});

export default LanguageDropdown;
