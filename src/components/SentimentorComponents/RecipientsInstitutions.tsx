import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import { desktopBp } from "../../styles/variables";
import { DropdownWithSearch } from "../../UI/Dropdown";

const StyledDropdown = styled(DropdownWithSearch)`
  max-width: 18.23vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 230px;
  }
`;

interface IProps {
  value: number;
  onChange: (id: number) => void;
}

const RecipientsInstitutions = React.memo(({ value, onChange }: IProps) => {
  const { institutions } = useSettingsState();
  const { onGetInstitutions } = useSettingsActions();

  const institutionsOptions = useMemo(() => {
    const opts = institutions.map((i) => {
      return {
        item: i.inst_name,
        value: i.inst_code,
      };
    })
    return [{item: " ", value: 0}, ...opts]
  }, [institutions]);

  useEffect(() => {
    onGetInstitutions();
  }, []);

  return (
    <StyledDropdown
      label="Recipients group"
      placeholder=""
      value={value || ""}
      onSelect={onChange}
      isReversed={true}
      options={institutionsOptions}
    />
  );
});

export default RecipientsInstitutions;
