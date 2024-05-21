import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {Arrow, ChevronIcon} from "../Svg";
import styled from "styled-components";
import { InputValueType } from "../../types";
import _ from "lodash";
import { desktopBp } from "../../styles/variables";
import clsx from "clsx";

interface DropdownProps {
  value: InputValueType;
  placeholder: string;
  onSelect: (key: any) => void;
  options: Array<{
    item: string | JSX.Element;
    value: string | number;
    color?: string;
  }>;
  label: string;
  isCustomColor?: boolean;
  isSmall?: boolean;
  menuChild?: JSX.Element;
  disabledValues?: Array<number | string>;
  isMultiSelect?: boolean;
  isDisabled?: boolean;
  isReversed?: boolean;
  isFetching?: boolean;
  required?: boolean;
  deletableOptions?: {
    callback: (v: any) => void,
    action: string
  }
  className?:string,
}

const DropdownStyled = styled.div<{
  isFetching: boolean | undefined;
}>`
  position: relative;
  width: 100%;
  height: 1.3vw;
  min-width: 5.21vw;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 0.89vw;
  ${({ isFetching }) => isFetching && "* {cursor: wait;}"};
  @media screen and (max-width: ${desktopBp}) {
    height: 16px;
    min-width: 65px;
    margin-bottom: 11px;
  }
`;

const ValueWrapper = styled.div<{ isDisabled?: boolean }>`
  display: flex;
  gap: 0.26vw;
  position: relative;
  justify-content: space-between;
  align-content: center;
  box-sizing: border-box;
  align-items: center;
  height: 1.3vw;
  width: 100%;
  margin-bottom: 0;
  border-bottom: 1px solid #000;
  border-inline-end: 1px solid #000;
  padding-inline-end: 0.52vw;
  cursor: pointer;
  ${({ isDisabled }) => isDisabled && "cursor: not-allowed;"}
  @media screen and (max-width: ${desktopBp}) {
    gap: 3px;
    height: 16px;
    padding-inline-end: 7px;
  }
`;

const ValueStyled = styled.p`
  flex-grow: 1;
  max-width: 100%;
  color:${props => props.theme.color.red};
  text-align: start;
  display: inline-block;
  white-space: nowrap;
  width: 100px; // Keep this in order to prevent overflow
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: ${props => props.theme.fontSize.medium.vw};
  line-height: 0.89vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.medium.px};
    line-height: 11px;
  }
`;

const StyledOption = styled.div<{ isSelected: boolean; color?: string }>`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  border-bottom: 1px solid #aaa;
  transition: all 0.25s ease;
  font-size: ${props => props.theme.fontSize.medium.vw};

  word-break: break-word;
  white-space: pre-line;
  min-height: 1.3vw;
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#000")};
  padding: 0.36vw 0.67vw;
  border-bottom: 1px solid #aaa;
  cursor: pointer;
  ${({ isSelected }) => isSelected && "background-color: #90A4AF;"}
  ${({ color }) => color && `background-color: ${color};`}
  &:hover {
    ${({ isSelected, color }) =>
    !isSelected && !color && "background-color: #D0D9DE;"}
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.medium.px};
    line-height: 16px;
    min-height: 16px;
    padding: 5px 8px;
  }
`;

const IconStyled = styled.div<{open:boolean}>`
  display: flex;
  transition: transform 200ms linear;
  transform:${props => props.open && "rotate(90deg)"};
`;

const Menu = styled.div<{ showMenu: boolean; isReversed?: boolean }>`
  visibility: ${({ showMenu }) => (showMenu ? "visible" : "hidden")};
  background-color: #fff;
  position: absolute;
  ${({ isReversed }) => (isReversed ? "bottom: 20px;" : "top:100% ;")}
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #000;
  ${({ isReversed }) => !isReversed && "border-top: 0;"}
  transition: all 0.25s ease-out;
  opacity: ${({ showMenu }) => (showMenu ? 1 : 0)};
  z-index: 100;
  height: ${({ showMenu }) => (showMenu ? "fit-content" : 0)};
  max-height: 15.63vw;
  overflow-y: auto;
  @media screen and (max-width: ${desktopBp}) {
    max-height: 196px;
  }
`;
const LabelStyled = styled.label`
  text-align: start;
  bottom: 0;
  min-width: fit-content;
  font-size: ${props => props.theme.fontSize.medium.vw};
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.darkGrey};
  padding-left: 0.47vw;;
  pointer-events: none;
  transition: 200ms;
  z-index: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  

  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.medium.px};
    padding-left: 6px;
  }
`;

const StyledOptionItem = styled.div`
    width: 100%;
`

const StyledRequired = styled.span`
  position: absolute;
  top: -0.63vw;
  inset-inline-end: 2px;
  color: red;
  @media screen and (max-width: ${desktopBp}) {
    top: -8px;
  }
`;

const DeleteBtn = styled.button`
position: relative;
cursor: pointer;
margin-inline-start: auto;
margin-inline-end: 10px;
  height: 15px;
  width: 15px;
  border: 1px solid #000;
  border-radius: 50%;
  background-color: transparent;
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 1px;
    width: 7px;
    background-color: #000;
  }
`

const Dropdown = React.memo(
  ({
    value,
    placeholder,
    onSelect,
    label,
    options,
    isSmall,
    isCustomColor,
    disabledValues,
    isDisabled,
    menuChild,
    isMultiSelect,
    isReversed,
    isFetching,
    required,
    deletableOptions,
    ...props
  }: DropdownProps) => {
    const dropdown = useRef<HTMLDivElement>(null);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const selectItem = useMemo(() => {
      if (!isMultiSelect) {
        return options.filter((item) => item.value === value)[0] || null;
      }
      if (isMultiSelect) {
        const arr = String(value)?.split(", ") || []
        return (
          options.filter(
            (item) =>
              _.includes(arr, String(item.value)) ||
              _.includes(arr, String(item.item))
          ) || []
        );
      }
    }, [options, value, isMultiSelect]);

    const handleClickOutside = useCallback((e: any) => {
      if (!e.composedPath().includes(dropdown.current)) {
        setShowMenu(false);
      }
    }, []);

    useEffect(() => {
      document.addEventListener("click", handleClickOutside, false);
      return () => {
        document.removeEventListener("click", handleClickOutside, false);
      };
    }, [handleClickOutside]);

    const onSelectHandler = useCallback(
      (val: string | number) => {
        if (!isMultiSelect) {
          onSelect(val);
          setShowMenu(false);
          return;
        }
        let valuesArray: string[] = String(value).split(", ")?.filter(v => v) || [];
        const alreadySelected = valuesArray.includes(String(val))
        if (isMultiSelect && !alreadySelected) {
          valuesArray.unshift(val as string);
          onSelect(valuesArray.join(", "));
        }
        if (isMultiSelect && alreadySelected) {
          valuesArray = valuesArray.filter((v) => v !== String(val));
          onSelect(valuesArray.join(", "));
        }
      },
      [onSelect, value, isMultiSelect]
    );

    const [selectItemItem, selectItemValue] = useMemo(() => {
      if (selectItem) {
        if (Array.isArray(selectItem)) {
          if (selectItem.length > 0) {
            const item = selectItem.map((item) => item.item).join(", ");
            const value = selectItem.map((item) => item.value).join(", ");
            return [item, value];
          }
          return [placeholder, "-"];
        }
        return [selectItem.item, selectItem.value];
      }
      return [placeholder, "-"];
    }, [selectItem, isMultiSelect, placeholder]);


    const onToggleShow = useCallback(() => {
      if (!isDisabled) {
        setShowMenu(!showMenu);
      }
    }, [isDisabled, showMenu]);

    const handleDelete = useCallback((e: any, value: any) => {
      e.stopPropagation()
      if (deletableOptions) deletableOptions.callback(value)
    }, [deletableOptions])
    return (
      <DropdownStyled className="styled_dropdown_container" ref={dropdown} isFetching={isFetching} {...props}>
        {required && <StyledRequired>*</StyledRequired>}

        <ValueWrapper className = "styled_dropdown_value_wrapper" isDisabled={isDisabled} onClick={onToggleShow} dir="auto">
            <LabelStyled className="styled_dropdown_label">
                {label}
            </LabelStyled>
          <ValueStyled onClick={onToggleShow}>
            {selectItemItem === placeholder ? "" : selectItemItem}
          </ValueStyled>
          <IconStyled open={showMenu}>
            <Arrow />
          </IconStyled>
        </ValueWrapper>
        <Menu showMenu={showMenu} isReversed={isReversed}>
          {menuChild !== undefined && menuChild}
          {options.map((opt, index) => {
            const isSelected =
              (disabledValues !== undefined &&
                _.includes(disabledValues, opt.value)) ||
              (Array.isArray(selectItem)
                ? _.includes(
                  String(selectItemValue)?.split(", ") || [],
                  String(opt.value)
                )
                : selectItem?.value === opt.value);
            return (
              <StyledOption
                className={clsx("styled_dropdown_option", isSelected && "styled_dropdown_option-selected")}
                onClick={() => onSelectHandler(opt.value)}
                color={opt?.color}
                isSelected={isSelected}
                key={index}
              >
                <StyledOptionItem className={clsx("styled_dropdown_item", isSelected && "styled_dropdown_item-selected")}>{opt.item as string}</StyledOptionItem>
                {deletableOptions && <DeleteBtn onClick={(e) => handleDelete(e, opt.value)}></DeleteBtn>}
              </StyledOption>
            );
          })}
        </Menu>
      </DropdownStyled>
    );
  }
);

export default Dropdown;
