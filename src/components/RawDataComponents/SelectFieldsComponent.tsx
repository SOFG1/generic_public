import React, { useCallback } from "react";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { activityList } from "../../config/userActivityList";
import { IColumns } from "../../store/settings";

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1px;
  margin-bottom: 2.08vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 26px;
  }
  @media screen and (max-width: 1020px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const StyledItem = styled.button<{ selected: boolean }>`
  cursor: pointer;
  background-color: transparent;
  outline: 1px solid #000;
  border: 0;
  border-radius: 0;
  padding: 10px 3px;
  box-sizing: border-box;
  min-width: 5.99vw;
  overflow: hidden;
  &:hover {
    background-color: #000;
    color: #fff;
  }
  ${({ selected }) => selected && "background-color: #000; color: #fff;"}
  @media screen and (max-width: ${desktopBp}) {
    min-width: 75px;
  }
`;

interface IProps {
  fields: IColumns[];
  selected: string[];
  onChange: (v: string[]) => void;
  className?: string
}

const SelectFieldsComponent = React.memo(
  ({ fields, selected, onChange, className }: IProps) => {
    const handleSelect = useCallback(
      (slug: string) => {
        const isSelected = selected.includes(slug);
        if (isSelected) {
          onChange(selected.filter((i) => i !== slug));
        }
        if (!isSelected) {
          onChange([...selected, slug]);
        }
      },
      [selected]
    );

    return (
      <StyledWrapper className={className}>
        {fields.map((f) => (
          <StyledItem
            data-action={activityList["rawdata-select-field"]}
            key={f.id}
            selected={selected.includes(f.slug)}
            onClick={() => handleSelect(f.slug)}
          >
            {f.name}
          </StyledItem>
        ))}
      </StyledWrapper>
    );
  }
);

export default SelectFieldsComponent;
