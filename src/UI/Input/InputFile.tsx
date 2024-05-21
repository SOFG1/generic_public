import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import TextLayer from "../../components/common/Text/TextLayer";
import { Modal } from "../Modal";
import { FileDrop } from "react-file-drop";
import { InputFileProps } from "./types";
import "../../styles/fileUpload.scss";
import { desktopBp } from "../../styles/variables";

const InputFileStyled = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const StyledDrop = styled.div`
  cursor: grab;
`

const Label = styled.p`
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 0.94vw;
  line-height: 1.15vw;
  color: ${colors.graphite_5};
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 14px;
  }
`;

const TextLayerStyled = styled(TextLayer) <{ isLabel: boolean }>`
  padding: 0.26vw 0.52vw;
  border: 1px dashed ${colors.graphite_1};
  box-sizing: border-box;
  margin-left: ${({ isLabel }) => (isLabel ? "10px" : 0)};
  cursor: pointer;
  display: flex;
  align-content: center;
  align-items: center;
  text-align: center;
  justify-content: center;
  @media screen and (max-width: ${desktopBp}) {
    padding: 3px 6px;
  }
`;

const HiddenInput = styled.input`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  z-index: -100;
`;
const ErrorMessage = styled.div`
  margin-top: 4px;
  font-size: 10px;
  line-height: 1;
  text-align: left;
  color: ${colors.orange};
`;

const InputFile = React.memo(
  ({
    onChange,
    placeholder,
    value,
    label,
    content,
    errorMessage,
    formats,
    isMultiple,
    className,
    ...props
  }: InputFileProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const fileInputRef = useRef<null | HTMLInputElement>(null);


    const saveFile = useCallback(
      (file: File | FileList) => {
        onChange(file);
        setShowModal(false);
      },
      [onChange, isMultiple]
    );



    const onFileInputChange = (event: any) => {
      const { files } = event.target;
      if (files.length > 0) {
        saveFile(isMultiple ? files : files[0]);
      }
    };



    const onTargetClick = useCallback(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, [fileInputRef]);
    return (
      <>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <StyledDrop>
            <FileDrop
              onTargetClick={onTargetClick}
              onDrop={(files, e) => {
                e.preventDefault();
                if (files !== null && files.length > 0) {
                  saveFile(isMultiple ? files : files[0]);
                }
              }}
            >
              {content}
            </FileDrop>
          </StyledDrop>
        </Modal>
        <HiddenInput
          accept={formats}
          onChange={onFileInputChange}
          ref={fileInputRef}
          multiple={isMultiple}
          type="file"
        />
        <InputFileStyled {...props}>
          {label && <Label>{label}</Label>}
          <TextLayerStyled
            className={className}
            isLabel={label !== undefined}
            onClick={() => setShowModal(true)}
            bold
          >
            {placeholder}
          </TextLayerStyled>
        </InputFileStyled>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </>
    );
  }
);

export default InputFile;
