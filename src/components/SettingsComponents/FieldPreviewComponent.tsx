import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FieldInput } from "../common/FieldInput";

const StlyedWrapper = styled.div`
  flex-grow: 1;
  @media screen and (max-width: 700px) {
    order: -1;
  }
`;


const StyledBox = styled.div`
  max-width: 330px;
  height: 100px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

interface IProps {
  filter: {
    type: string;
    name: string;
    label: string;
    fetch?: boolean;
    required?: boolean;
    is_multiplier?: boolean;
    len_input_prefetch?: number;
    options?: { [key: string | number]: any };
    is_manual_input?: boolean;
  };
  onAddOption: (option: string) => void
}

const FieldPreviewComponent = React.memo(({ filter, onAddOption }: IProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<any>("");

  const inputType = useMemo(() => {
    if(filter.type === 'float') return 'int-single'
    if(filter.type === 'int') return 'int-single'
    if(filter.type === 'timestamp') return 'date-single'
    return filter.type
  }, [filter.type])

  useEffect(() => {
    filter.type === 'timestamp' ? setValue(null) : setValue('')
  }, [filter.type])


  return (
    <StlyedWrapper>
      <StyledBox>
        <FieldInput
        isForPreview={true}
          filter={{...filter, type: inputType}}
          value={value}
          onChange={(n, val) => setValue(val)}
          onAddOption={onAddOption}
        />
      </StyledBox>
    </StlyedWrapper>
  );
});

export default FieldPreviewComponent;
