import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { handle } from "../../api";
import { RawData } from "../../api/rawData";
import { useAppActions } from "../../store/app";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { InputFile } from "../../UI/Input";
import { Text } from "../common/Text";
import { Title } from "../common/Title";
import { saveAs } from "file-saver";
import { Loader } from "../../UI/Spinners";
import { useTranslation } from "react-i18next";
import { activityList } from "../../config/userActivityList";

const StyledInput = styled(InputFile)`
  margin-bottom: 20px;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
  min-height: 300px;
`;

const TitleStyled = styled(Title)`
  font-size: 1.25vw;
  line-height: 1.2;
  font-weight: 500;
  margin: 0;
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

const StyledFile = styled.p`
  text-decoration: underline;
  cursor: pointer;
`

const DownloadLink = styled.p`
  font-size: 30px;
  font-weight: 700;
  cursor: pointer;
  margin: 0;
`;

const DownloadIcon = styled.img`
  margin-inline-start: 10px;
`

const StyledLoader = styled(Loader)``;

const StyledNoFiles = styled.p`
  font-size: 20px;
  margin: 0;
`

interface IProps {
  rowId: string;
}

const RowFilesComponent = React.memo(({ rowId }: IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { onShowAlert } = useAppActions();
  const [filesList, setFilesList] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isDownloading ,setIsDownloading] = useState<null | string>(null)

  const getFiles = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        RawData.getRowFiles(token, rowId)
      );
      if (dataRes) {
        console.log(dataRes);
        setFilesList(dataRes);
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
      setIsFetching(false);
    }
  }, [token, rowId]);

  const handleUpload = useCallback(
    async (file: File) => {
      if (token) {
        setIsUploading(true);
        const [dataRes, dataErr] = await handle(
          RawData.rowFileUpload(token, rowId, file)
        );
        setIsUploading(false);
        if (!dataErr) {
          getFiles();
          onShowAlert(true, "Successfully uploaded");
        }
        if (dataErr) {
          onShowAlert(false, "File is too big, max size is 2mb.");
        }
      }
    },
    [token, rowId, getFiles]
  );

  const downloadFiles = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        RawData.downloadRowFiles(token, rowId)
      );
      setIsFetching(false);
      if (dataRes) {
        saveAs(dataRes, "");
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
  }, [token, rowId]);

  const handleDownloadFile = useCallback(async (link: string, name: string) => {
    const linkTrimmed = link.replace('/api/raw_data/row_file/', '')
    if (token) {
      setIsDownloading(link);
      const [dataRes, dataErr] = await handle(
        RawData.downloadRowFile(token, linkTrimmed)
      );
      setIsDownloading(null);
      if (dataRes) {
        saveAs(dataRes, name);
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
  }, [token])

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  return (
    <StyledWrapper>
      {isUploading ? (
        <StyledLoader />
      ) : (
        <StyledInput
          placeholder={t("raw-data_file-plhr")}
          content={
            <>
              <TitleStyled>{t("raw-data_file-drop")}</TitleStyled>
              <TextModal>{t("raw-data_file-click")}</TextModal>
            </>
          }
          onChange={(f) => handleUpload(f as File)}
        />
      )}
      {filesList.map(f => {
        if(isDownloading === f.link) {
          return <Loader />
        }
        return <StyledFile key={f.link}  data-action={activityList["download-row-file"]} onClick={() => handleDownloadFile(f.link, f.name)} >{f.name}</StyledFile>
      })}
      {isFetching && <StyledLoader />}
      {filesList.length === 0 && !isFetching &&  <StyledNoFiles>{t("raw-data_no-files")}</StyledNoFiles>}
      {!isFetching && filesList.length > 0 && (
        <DownloadLink onClick={downloadFiles} data-action={activityList["download-row-files"]}>
          {t("raw-data_file-download")}
          <DownloadIcon />
        </DownloadLink>
      )}
    </StyledWrapper>
  );
});

export default RowFilesComponent;
