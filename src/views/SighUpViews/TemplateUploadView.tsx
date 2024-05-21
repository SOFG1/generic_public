import React from "react";
import { Text } from "../../components/common/Text";
import styled from "styled-components";
import { Title } from "../../components/common/Title";
import TextLayer from "../../components/common/Text/TextLayer";
import { UploadIcon } from "../../UI/Svg";
import { InputFile } from "../../UI/Input";
import { PRIMARY_SERVER_URL } from "../../api";
import { useTranslation } from "react-i18next";
import { desktopBp } from "../../styles/variables";
// import template from '../../data/stoic_t_template.xlsx'

interface TemplateUploadViewProps {
  onChangeFile: (file: File) => void;
  fileName: string;
}

const TitleModal = styled(Title)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  min-width: 19.79vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
    min-width: 248px;
  }
`;
const TextLayerStyled = styled(TextLayer)`
  font-size: 1.25vw;
  margin-left: 4px;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
  }
`;
const TextModal = styled(Text)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  text-decoration: underline;
  cursor: pointer;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
  }
`;
const TextStyled = styled(Text)`
  margin-bottom: 1.04vw;
  width: 100%;
  font-size: 1.25vw;
  max-width: 24.58vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
    font-size: 16px;
    max-width: 308px;
  }
`;

const InputFileStyled = styled(InputFile)`
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
  }
`;

const TemplateUploadView = React.memo(
  ({ onChangeFile, fileName }: TemplateUploadViewProps) => {
    const { t } = useTranslation();

    const UploadText = () => (
      <>
        <UploadIcon /> {t("sign-up_upload-icon")}
      </>
    );

    const template = `${PRIMARY_SERVER_URL}/api/user/get_template/`;

    return (
      <>
        <TextStyled>
          {t("sign-up_template")}
          <TextLayerStyled as={"a"} href={template} download>
            {t("sign-up_template-link")}
          </TextLayerStyled>
        </TextStyled>
        <InputFileStyled
          formats="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          content={
            <>
              <TitleModal>{t("sign-up_template-title")}</TitleModal>
              <TextModal>{t("sign-up_template-upload")}</TextModal>
              <Text>{t("sign-up_template-format")}</Text>
            </>
          }
          placeholder={fileName || <UploadText />}
          onChange={(f) => onChangeFile(f as File)}
        />
      </>
    );
  }
);

export default TemplateUploadView;
