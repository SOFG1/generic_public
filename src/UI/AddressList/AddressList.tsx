import React, { useCallback, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { CreatableEditableSelectValue, IProps } from "./types";
import styled from "styled-components";
import DeleteIcon from "../../assets/images/close-png.png";
import { desktopBp } from "../../styles/variables";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.26vw;
  .createable {
    &__control {
      align-items: flex-start;
      border: 1px solid #000;
      border-radius: 5px;
      padding: 0.89vw;
      padding-inline-end: 5px;
      height: 11.88vw;
      cursor: pointer;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #aaaaaa;
        border-radius: 3px;
        width: 10px;
      }
      @media screen and (max-width: ${desktopBp}) {
        padding: 11px;
        height: 149px;
        border-radius: 3px;
      }
    }
    &__control--is-focused {
      border: #000 solid 1px !important;
      box-shadow: none;
    }
    &__value-container {
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
    }
    &__control--is-focused {
      border: #000 solid 2px !important;
    }

    &__multi-value {
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      line-height: 18px;
      padding: 11px 0;
      border-top: 1px solid #000;
      margin: 0;
      background-color: transparent;
      &:first-child {
        border-top: 0;
      }
    }
    &__multi-value button {
      padding: 0;
      border: 0;
      border-radius: 0;
      background-color: transparent;
    }
    &__multi-value input {
      width: 4.17vw;
      width: 100%;
    }
    &__multi-value__remove {
      height: 18px;
      width: 18px;
      background-image: url(${DeleteIcon});
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      margin-inline-start: 3px;
      cursor: pointer;
      transition: opacity 250ms linear;
    }
    &__multi-value__remove:hover {
      opacity: 0.6;
      background-color: transparent !important;
    }
    &__multi-value__remove svg {
      display: none;
    }

    &__indicators {
      display: none !important;
    }
  }
`;

const LabelStyled = styled.label`
  font-size: 0.94vw;
  line-height: 1.2vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
  }
`;

const AddressList = React.memo(
  ({
    options,
    value: propValue,
    onChange,
    className,
    placeholder,
    label,
    onInputChange,
    isValidNewOption,
  }: IProps) => {
    const [editingValue, setEditingValue] = useState<string>("");

    const handleChange = useCallback(
      (newValue: CreatableEditableSelectValue[]) => {
        onChange(newValue);
      },
      [onChange]
    );

    const handleEditChange = useCallback(
      (inputValue: string, data: CreatableEditableSelectValue) => {
        const idx = propValue.findIndex((v) => v.value === data.value);
        const newValue = [...propValue];

        if (inputValue.length === 0) {
          newValue.splice(idx, 1);
        } else {
          newValue[idx] = {
            label: inputValue,
            value: inputValue,
          };
        }

        onChange(newValue);

        setEditingValue("");
      },
      [propValue, onChange]
    );

    const MultiValueLabel = useCallback(
      ({ data }: { data: CreatableEditableSelectValue }) => {
        if (editingValue === data.value) {
          return (
            <input
              type="text"
              defaultValue={data.value}
              onKeyDown={(ev) => {
                ev.stopPropagation();
                if (ev.key === "Enter") {
                  handleEditChange(ev.currentTarget.value, data);
                }
              }}
              onBlur={(ev) => {
                handleEditChange(ev.currentTarget.value, data);
              }}
              autoFocus
            />
          );
        }
        return (
          <button
            onClick={() => {
              setEditingValue(data.value);
            }}
          >
            {data.value}
          </button>
        );
      },
      [handleEditChange, editingValue]
    );

    //Check styles in assets/styles/_createabledropdown.scss
    return (
      <Wrapper className={className}>
        {label && <LabelStyled>{label}</LabelStyled>}
        <CreatableSelect
          autoFocus={false}
          isMulti
          isValidNewOption={isValidNewOption}
          placeholder={placeholder}
          className="createable"
          classNamePrefix="createable"
          isClearable={false}
          onInputChange={(val: string) => {
            if (onInputChange) onInputChange(val);
          }}
          value={propValue}
          //@ts-ignore
          onChange={handleChange}
          options={options}
          components={{
            MultiValueLabel,
          }}
        />
      </Wrapper>
    );
  }
);

export default AddressList;
