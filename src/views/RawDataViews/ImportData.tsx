import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Title } from "../../components/common/Title";
import { Card, card_size } from "../../components/common/Card";
import { Text } from "../../components/common/Text";
import { Button, EButtonVariants } from "../../UI/Button";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import table from "../../data/table.json";
import { v4 as uuidv4 } from "uuid";
import FileUploader from "../../utils/file_uploader";
import { primaryApiUrl, handle } from "../../api";
import { useUserState } from "../../store/user";
import { TablePreviewView } from "../SighUpViews";
import { InputFile } from "../../UI/Input";
import { UploadIcon } from "../../UI/Svg";
import { RawData } from "../../api/rawData";
import { saveAs } from "file-saver";
import { useTranslation } from "react-i18next";
import { Loader } from "../../UI/Spinners";
import { useAppActions } from "../../store/app";
import { desktopBp } from "../../styles/variables";
import { activityList } from "../../config/userActivityList";

const StyledCard = styled(Card)`
  min-width: 400px;
  @media screen and (max-width: 600px) {
    min-width: 270px;
  }
`;

const ButtonStyled = styled(Button)`
  margin-top: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin: 0 13px;
  }
`;

const TextStyled = styled(Text)`
  margin-bottom: 1.04vw;
  text-align: center;
  width: 100%;
  font-size: 1.25vw;
  span {
    text-decoration: underline;
    color: ${colors.cyan_5};
    cursor: pointer;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
    font-size: 16px;
  }
`;

const TitleModal = styled(Title)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  min-width: 15.63vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
    min-width: 196px;
  }
`;

const InputFileStyled = styled(InputFile)`
  margin-bottom: 1.04vw;
  .file-drop {
    min-width: 15.63vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
    .file-drop {
      min-width: 196px;
    }
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

const StyledLoader = styled(Loader)`
  height: 4.17vw;
  width: 4.17vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 52px;
    width: 52px;
  }
`;

interface IProps {
  onClose: () => void
}

const ImportData = React.memo(({onClose}: IProps) => {
  const { t } = useTranslation();
  const default_data: { [key: string]: string }[] = useMemo(() => {
    return table;
  }, []);
  const { token } = useUserState();
  const { onShowAlert } = useAppActions();
  const [fileName, setFileName] = useState<string>("");
  const [startFileName, setStartFileName] = useState<string>("");
  const [fileRes, setFileRes] = useState<string>("");
  const [sheetName, setSheetName] = useState<string>("");
  const [tableData, setTableData] = useState<{ [key: string]: string }[]>([]);
  const [tableRes, setTableRes] = useState<{
    headers: string[];
    data: { [key: string]: string | number | boolean }[];
  }>({ headers: [], data: [] });
  const [matchColumns, setMatchColumns] = useState<{ [key: string]: string }>(
    {}
  );
  const [isTableUploading, setTableUploading] = useState<boolean>(false);

  const [uploadId, setUploadId] = useState(uuidv4());

  const [userIsWorkingWithFile, setUserIsWorkingWithFile] =
    useState<boolean>(false);

  const onChangeFile = useCallback(
    (file: File) => {
      if (userIsWorkingWithFile) handleAbortFile();
      if (file) {
        setTableUploading(true);
        const uniqueId = uuidv4();
        setUploadId(uniqueId);
        // @ts-ignore
        const res = new FileUploader({
          uploadType: "media",
          files: [file],
          uploadId: uniqueId,
          csrfToken: token || "",
          portion: 1024 * 1024,
          uploadscript: primaryApiUrl + "raw_data/table_upload/",
        });
        setStartFileName(res.file.name);
      }
    },
    [token, userIsWorkingWithFile, uuidv4]
  );

  useEffect(() => {
    if (fileName !== "") {
      setTableData(default_data);
    }
  }, [fileName, default_data]);

  const checkSuccessUpload = (res: any) => {
    setTableUploading(false);
    setUserIsWorkingWithFile(true);
    if (res?.detail?.data) {
      console.log(res);
      const {
        detail: {
          data: { file_name, options },
        },
      } = res;
      const [sheetKey, columnKey] = Object.keys(options);
      const columns = options[columnKey];
      const table_template: { [key: string]: string | number | boolean }[] =
        options[sheetKey].data;
      setSheetName(sheetKey);
      setFileName(file_name);
      setFileRes("Table was successfully uploaded");
      setTableRes({ headers: columns, data: table_template });
    }
  };

  const handleUploadError = (e: any) => {
    onShowAlert(false, e.detail);
  };

  const handleAbortFile = useCallback(() => {
    if (token && userIsWorkingWithFile && uploadId) {
      RawData.abortTableFile(token, uploadId);
    }
  }, [token, userIsWorkingWithFile, uploadId]);

  useEffect(() => {
    window?.addEventListener("success", checkSuccessUpload);
    window?.addEventListener("upload_error", handleUploadError);
    return () => {
      window.removeEventListener("success", checkSuccessUpload);
      window.removeEventListener("upload_error", handleUploadError);
      handleAbortFile();
    };
  }, [handleAbortFile]);

  const onNextHandler = useCallback(async () => {
    if (
      token &&
      fileName &&
      Object.keys(matchColumns).length > 0 &&
      sheetName
    ) {
      const match: { [key: string]: string } = {};
      for (const key in matchColumns) {
        if (matchColumns[key] !== "" && matchColumns[key] !== "-") {
          match[key] = matchColumns[key];
        }
      }
      setTableUploading(true);
      const [dataRes, dataErr]: any = await handle(
        RawData.putUploadTable(
          {
            file_name: fileName,
            start_file_name: startFileName,
            slectedSheet: sheetName,
            columns: match,
          },
          token
        )
      );
      setTableUploading(false);
      if (dataRes !== undefined) {
        setUserIsWorkingWithFile(false);
        onClose()
        onShowAlert(true, "Your file uploaded successfully !");
      }
      if (dataErr) {
        console.log(dataErr);
        onShowAlert(false, dataErr.error);
      } 
    }
  }, [token, fileName, matchColumns]);

  const onDownloadCurrentTemplate = useCallback(async () => {
    if (token) {
      const [dataRes, dataErr]: any = await handle(
        RawData.getUploadTable(token)
      );
      if (dataRes !== undefined) {
        saveAs(dataRes, "CurrentTemplate.xlsx");
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
  }, [token]);

  //Listen for 400 error custom event and close the modal
  useEffect(() => {
    document.addEventListener("400error", onClose);
    return () => {
      document.removeEventListener("400error", onClose);
    };
  }, [onClose]);

  return (
    <StyledCard>
      {isTableUploading && <StyledLoader />}
      {!isTableUploading && (
        <>
          <TextStyled>
            <span
              onClick={onDownloadCurrentTemplate}
              data-action={activityList["rawdata-download-template"]}
            >
              {t("raw-data_template-link")}
            </span>
          </TextStyled>


          <InputFileStyled
            content={
              <>
                <TitleModal>{t("raw-data_template-drop")}</TitleModal>
                <TextModal>{t("raw-data_template-click")}</TextModal>
                <Text>{t("raw-data_template-format")}</Text>
              </>
            }
            placeholder={
              fileRes || (
                <>
                  <UploadIcon /> {t("raw-data_template-upload")}
                </>
              )
            }
            onChange={(f) => onChangeFile(f as File)}
          />
          <TextStyled
            color={
              tableData.length === 0 ? colors.graphite_1 : colors.graphite_5
            }
          >
            {t("raw-data_template-rows")}
          </TextStyled>
          <TablePreviewView
            onChangeMatchColumns={(match) => setMatchColumns(match)}
            data={tableRes.data}
            columns={tableRes.headers}
            registration={false}
          />
          <ButtonStyled
            data-action={activityList["rawdata-excel-submit"]}
            disabled={fileName === ""}
            onClick={onNextHandler}
            variants={EButtonVariants.Primary}
          >
            {t("raw-data_template-next")}
          </ButtonStyled>
        </>
      )}
    </StyledCard>
  );
});

export default ImportData;
