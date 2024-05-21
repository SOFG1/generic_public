import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { Input } from "../../UI/Input";
import { NoIcon } from "../../UI/Svg";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.52vw;
  margin-bottom: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
    margin-bottom: 20px;
  }
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
  }
`;

const StyledInput = styled(Input)`
  padding-top: 2px;
`;

const AddButton = styled.button`
  background-color: #fff;
  width: 1.04vw;
  border: 1px solid #000;
  height: 1.04vw;
  border-radius: 50%;
  align-self: flex-end;
  position: relative;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
  &:focus {
    outline: none;
  }
  &:before,
  &:after {
    content: "";
    display: block;
    height: 2px;
    width: 10px;
    background-color: #000;
    position: absolute;
    top: 50%;
    left: 50%;
  }
  &:before {
    transform: translate(-50%, -50%) rotateZ(90deg);
  }
  &:after {
    transform: translate(-50%, -50%);
  }
  @media screen and (max-width: ${desktopBp}) {
    width: 13px;
    height: 13px;
  }
`;

const DeleteBtn = styled.button`
  border: 0;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
`;

interface IProps {
  values: string[];
  onChange: (v: string[]) => void;
  className?:string;
}

const StringListComponent = React.memo(({ values, onChange, className }: IProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChange = (val: string, index: number) => {
    const copy = [...values];
    copy[index] = val;
    onChange(copy);
  };

  const handleAdd = () => {
    onChange([...values, ""]);
  };

  const handleDelete = (index: number) => {
    const copy = [...values];
    copy.splice(index, 1);
    onChange(copy);
  };

  const handleEnterClick = (e: any) => {
    if (e?.composedPath().includes(wrapperRef.current) && e?.key === "Enter") {
      handleAdd();
      const lastInput = wrapperRef.current
        ?.querySelector(`.input${values.length}`)
        ?.querySelector("input");
      lastInput?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEnterClick);
    return () => document.removeEventListener("keydown", handleEnterClick);
  });

  return (
    <StyledWrapper className={className} ref={wrapperRef}>
      {values.map((v, i) => (
        <InputBox key={i}>
          <StyledInput
            className={`input input${i} styled_string-list_input`}
            name={String(i)}
            value={values[i]}
            onChange={(v) => handleChange(v, i)}
            type="text"
            label=""
          />
          <DeleteBtn className="styled_string-del_btn" onClick={() => handleDelete(i)}>
            <NoIcon />
          </DeleteBtn>
        </InputBox>
      ))}
      <AddButton className="styled_string-add_btn" onClick={handleAdd} />
    </StyledWrapper>
  );
});

export default StringListComponent;
