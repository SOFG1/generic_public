import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { Input } from "../Input";

const InputStyled = styled(Input)`
  max-width: 100%;
  width: 100%;
  padding-bottom: 0;
  input {
    max-width: 100%;
    padding-inline-end: 2.08vw;
  }
`;

const SearchItem = React.memo(
  ({
    onChange,
    value,
    name,
    ...props
  }: {
    onChange: (val: string) => void;
    value: string;
    name: string;
  }) => {
    const { t } = useTranslation();
    return (
      <InputStyled
        type={"text"}
        placeholder={t("dropdown_search")}
        label={""}
        onChange={onChange}
        value={String(value)}
        name={name}
        {...props}
      />
    );
  }
);

export default SearchItem;
