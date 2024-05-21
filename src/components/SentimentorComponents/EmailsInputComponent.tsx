import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { desktopBp } from "../../styles/variables";
import KeywordComponent from "../SentimentorComponents/KeywordComponent";

const StyledInput = styled.input`
  border: 0;
  border-bottom: 1px solid #000;
  outline: none;
  background-color: transparent;
  font-style: normal;
  font-weight: normal;
  font-size: 0.94vw;
  line-height: 1.15vw;
  color: ${colors.graphite_5};
  margin-bottom: 5px;
  transition: all 0.25s ease;
  text-align: center;
  width: 100%;

  &:focus {
    border-color: ${colors.graphite_5};
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 14px;
  }
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
`;

const WrapInput = styled.div`
  display: flex;
`;

const StyledLabel = styled.p`
  font-size: 0.83vw;
  line-height: 0.94vw;
  margin: 0 0 5px;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    line-height: 12px;
  }
`;

const AddButton = styled.button`
  background-color: #fff;
  width: 1.04vw;
  border: 1px solid #000;
  height: 1.04vw;
  border-radius: 50%;
  position: relative;
  margin-left: 0.26vw;
  margin-bottom: 0.26vw;
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
    width: 0.52vw;
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
    margin-left: 3px;
    margin-bottom: 3px;
    &:before,
    &:after {
      content: "";
      width: 7px;
    }
  }
`;

interface IProps {
  emails: string[];
  onAddEmail: (word: string) => void;
  onDeleteEmail: (word: string) => void;
  label?: string;
  className?: string;
}

const EmailsInputComponent = React.memo(
  ({ emails, onAddEmail, onDeleteEmail, className, label }: IProps) => {
    const [keywordValue, setKeywordValue] = useState<string>("");

    const handleAddEmail = () => {
      onAddEmail(keywordValue);
      setKeywordValue("");
    };

    const onKeyPress = useCallback(
      (e: any) => {
        if (e?.key === "Enter") handleAddEmail();
      },
      [onAddEmail, keywordValue]
    );

    return (
      <div className={className}>
        {label && <StyledLabel>{label}</StyledLabel>}
        <WrapInput>
          <StyledInput
            type="text"
            onKeyPress={(e) => onKeyPress(e)}
            value={keywordValue}
            onChange={(event) => setKeywordValue(event.target.value)}
          />
          <AddButton onClick={handleAddEmail} />
        </WrapInput>
        <List>
          {emails.map((email, i) => {
            return (
              <KeywordComponent
                onRemoveWord={() => onDeleteEmail(email)}
                word={email}
                key={i}
              />
            );
          })}
        </List>
      </div>
    );
  }
);

export default EmailsInputComponent;
