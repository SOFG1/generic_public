import React, { useCallback, useEffect, useState } from "react";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { activityList } from "../../config/userActivityList";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.89vw;
  margin-bottom: 2.24vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 11px;
    margin-bottom: 28px;
  }
`;

const StyledItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.57vw;
  padding: 0.42vw 0.78vw;
  border-radius: 2.6vw;
  ${({ selected }) => selected && "border: 1px solid #000;"}
  cursor: pointer;
  font-size: 0.94vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
    padding: 5px 10px;
    border-radius: 33px;
    font-size: 12px;
  }
`;

const StyledColor = styled.div<{ color: string }>`
  height: 21px;
  width: 21px;
  background-color: ${({ color }) => color};
`;

interface IProps {
  slug: string
  selected: string[];
  onChange: (v: string[]) => void;
  options: string[]
}

const SelectValuesComponent = React.memo(
  ({ slug, selected, onChange, options }: IProps) => {
    const { all_statuses } = useSettingsState();

    const handleSelect = useCallback(
      (status: string) => {
        const isSelected = selected.includes(status);
        if (!isSelected) {
          onChange([...selected, status]);
        }
        if (isSelected) {
          onChange(selected.filter((i) => i !== status));
        }
      },
      [selected]
    );


    return (
      <StyledWrapper>
        {options?.map((o) => {
          const isSelected = selected.includes(o);
          const color = slug === "status" && all_statuses.find(s => s.status === o)?.color
          return (
            <StyledItem
              key={o}
              selected={isSelected}
              onClick={() => handleSelect(o)}
            >
              {!!color && <StyledColor color={color} />}
              {o}
            </StyledItem>
          );
        })}
      </StyledWrapper>
    );
  }
);

export default SelectValuesComponent;
