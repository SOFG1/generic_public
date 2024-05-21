import React, { useCallback, useMemo, useState } from "react";

import CreatableSelect from "react-select/creatable";
import { CreatableEditableSelectValue, ICreatableFetchProps } from "./types";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import DelIco from "../../assets/images/createable-del.svg";
import { useDropdownFetch } from "../../hooks/useDropdownFetch";
import { desktopBp } from "../../styles/variables";
import { escapeRegExp } from "../../utils";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.26vw;
  .createable {
    &__control {
      border: 1px solid #d0d9de !important;
      box-shadow: inset 0px 4px 15px rgba(0, 0, 0, 0.05) !important;
      border-radius: 1.04vw !important;
      padding: 0.47vw 0.89vw !important;
      min-height: 4.69vw;
      align-items: flex-start !important;
    }
    &__control--is-focused {
      border: #000 solid 2px !important;
    }

    &__multi-value {
      padding: 0.26vw !important;
      border-radius: 0.68vw !important;
      background: #ffffff !important;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15) !important;
      align-items: center;
    }
    &__multi-value button {
      padding: 0;
      border: 0;
      border-radius: 0;
      background-color: transparent;
    }
    &__multi-value input {
      width: 4.17vw;
    }
    &__multi-value__remove {
      height: 0.73vw;
      width: 0.73vw;
      background-image: url(${DelIco});
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
  @media screen and (max-width: ${desktopBp}) {
    gap: 3px;
    .createable {
      &__control {
        border-radius: 13px !important;
        padding: 6px 11px !important;
        min-height: 59px;
      }
      &__multi-value {
        padding: 3px !important;
        border-radius: 8px !important;
      }
      &__multi-value input {
        width: 52px;
      }
      &__multi-value__remove {
        height: 9px;
        width: 9px;
      }
    }
  }
`;

const LabelStyled = styled.label`
  margin-inline-start: 1.04vw;
  font-style: normal;
  font-weight: normal;
  font-size: 0.73vw;
  line-height: 0.89vw;
  color: ${colors.graphite_5};
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 13px;
    font-size: 9px;
    line-height: 11px;
  }
`;

const CreateableFetch: React.FC<ICreatableFetchProps> = React.memo(
  ({ value: propValue, onChange, className, placeholder, label, slug }) => {
    const [editingValue, setEditingValue] = useState<string>("");

    const dropdownFetch = useDropdownFetch(
      slug,
      editingValue,
      editingValue.length,
      false
    );

    const options = useMemo(() => {
      if (editingValue.length > 0) {
        const pattern = escapeRegExp(editingValue)
        return dropdownFetch
          .filter((item) => {
            return item.item?.match(pattern)
          })
          .map((o) => ({ label: o.item, value: String(o.value) }));
      }
      return dropdownFetch.map((o) => ({
        label: o.item,
        value: String(o.value),
      }));
    }, [editingValue, dropdownFetch]);

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
          isMulti
          placeholder={placeholder}
          className="createable"
          classNamePrefix="createable"
          isClearable={false}
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

export default CreateableFetch;
