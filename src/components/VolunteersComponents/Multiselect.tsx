import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import Select from "react-select";
import { IMultiSelectProps } from "./types";
import { desktopBp } from "../../styles/variables";

const StyledDropdown = styled.div`
  flex-grow: 1;
`;

const StyledLabel = styled.p`
  font-size: 0.83vw;
  line-height: 0.89vw;
  margin-top: 0;
  margin-inline-start: 1.04vw;
  margin-bottom: 5px;
  color: ${colors.graphite_5};
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    line-height: 11px;
    margin-top: 0;
    margin-inline-start: 13px;
  }
`;


const mediaqueryString = `@media only screen and (max-width: ${desktopBp})`


const Multiselect = React.memo(
  ({
    label,
    placeholder,
    value,
    onChange,
    onInputChange,
    options,
    className,
  }: IMultiSelectProps) => {


    return (
      <StyledDropdown className={className}>
        <StyledLabel>{label}</StyledLabel>
        <Select
          styles={{
            control: (styles) => {
              return {
                ...styles,
                cursor: "pointer",
                boxShadow: "inset 0 4px 15px rgba(0, 0, 0, 5%)",
                borderRadius: "1.30vw",
                transition: "all 0.25s ease",
                borderColor: "#cccccc",
                ":hover": {
                  borderColor: "#cccccc",
                  backgroundColor: colors.graphite_1,
                },
                [mediaqueryString]: {
                  borderRadius: "16px",
              },
              };
            },
            indicatorSeparator: () => {
              return { display: "none" };
            },
            placeholder: (styles) => {
              return {
                ...styles,
                fontSize: "0.94vw",
                lineHeight: "1.15vw",
                color: colors.graphite_5,
                [mediaqueryString]: {
                  fontSize: "12px",
                  lineHeight: "14px"
              },
              };
            },
          }}
          isClearable={false}
          placeholder={placeholder}
          isMulti={true}
          value={value}
          onChange={onChange}
          onInputChange={(val) => {
            if (onInputChange) onInputChange(val);
          }}
          options={options}
        />
      </StyledDropdown>
    );
  }
);

export default Multiselect;
