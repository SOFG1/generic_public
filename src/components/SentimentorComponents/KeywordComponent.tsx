import React from 'react';
import styled from "styled-components";
import {colors} from "../../styles/colors";
import {Text} from "../common/Text";

const KeywordStyled = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 4px 5px 4px 7px;
  box-sizing: border-box;
  background: ${colors.bg_card};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  border-radius: 13px;
  margin: 0 10px 5px;
  svg {
    cursor: pointer;
  }
`

const DeleteIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px;
  width: 14px;
  height: 14px;
  background: ${colors.graphite_3};
  border-radius: 50%;
  position: relative;
  margin-left: 5px;
  box-sizing: border-box;
  &:before, &:after {
    content: "";
    display: block;
    height: 1px;
    width: 10px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
  }
  &:before {
    transform: translate(-50%, -50%) rotateZ(45deg);
  }
  &:after {
    transform: translate(-50%, -50%) rotateZ(135deg);
  }
`

const KeywordComponent = React.memo(({word, onRemoveWord}:{word: string, onRemoveWord: (word: string) => void}) => {
  return (
      <KeywordStyled>
          <Text fontSize={'14px'} color={colors.graphite_6}>{word}</Text>
          <DeleteIcon onClick={() => onRemoveWord(word)} />
      </KeywordStyled>
  );
})

export default KeywordComponent;