import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Title } from "../../components/common/Title";
import { Card } from "../../components/common/Card";
import { Text } from "../../components/common/Text";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { v4 as uuidv4 } from "uuid";
import FileUploader from "../../utils/file_uploader";
import { primaryApiUrl, handle } from "../../api";
import { useUserState } from "../../store/user";
import { InputFile } from "../../UI/Input";
import { UploadIcon } from "../../UI/Svg";
import { useAppActions } from "../../store/app";
import TextLayer from "../../components/common/Text/TextLayer";
import { MapTablePreviewView } from "./index";
import { Button, EButtonVariants } from "../../UI/Button";
import { SmStats } from "../../api/smStats";
import { Loader } from "../../UI/Spinners";
import { activityList } from "../../config/userActivityList";

const TextStyled = styled(Text)`
  margin-bottom: 20px;
  width: 100%;
  font-size: 24px;
  text-align: center;
  span {
    text-decoration: underline;
    color: ${colors.cyan_5};
    cursor: pointer;
  }
`;
const ButtonStyled = styled(Button)`
  margin-top: 20px;
`;
const TextLayerStyled = styled(TextLayer)`
  font-size: 24px;
  margin-left: 4px;
  cursor: pointer;
`;

const TitleModal = styled(Title)`
  margin-bottom: 10px;
  margin-top: 0;
  min-width: 300px;
`;

const InputFileStyled = styled(InputFile)`
  margin-bottom: 20px;
`;

const TextModal = styled(Text)`
  margin-bottom: 10px;
  margin-top: 0;
  text-decoration: underline;
  cursor: pointer;
`;

const StyledLoader = styled(Loader)`
  height: 150px;
  width: 150px;
`;


const ImportMapData = React.memo(({ onClose }: { onClose: () => void }) => {
  const { token } = useUserState();
  const { onShowAlert } = useAppActions();
  const [sheetName, setSheetName] = useState<string>("");
  const [tableRes, setTableRes] = useState<{
    headers: { name: string; required: boolean }[];
    data: { [key: string]: string | number | boolean }[];
  }>({ headers: [], data: [] });
  const [fileName, setFileName] = useState<string>("");
  const [matchColumns, setMatchColumns] = useState<{ [key: string]: string }>(
    {}
  );
  const [resultColumns, setResultColumns] = useState<string[]>([]);
  //We store this condition in ref in order to implement the exact
  //componentWillUnmount behaviour and prevent excess file abort calls
  const userIsWorkingWithFile = useRef(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [uploadId, setUploadId] = useState(uuidv4());

  const checkSuccessUpload = (res: any) => {
    setIsFetching(false);
    if (res) {
      const {
        detail: {
          data: { file_name, options },
        },
      } = res;
      const [sheetKey, columnKey] = Object.keys(options);
      const columns: { name: string; required: boolean }[] = options.columns;
      const table_template: { [key: string]: string | number | boolean }[] =
        options[sheetKey].data;
      setSheetName(sheetKey);
      setFileName(file_name);
      userIsWorkingWithFile.current = true;
      setTableRes({ headers: columns, data: table_template });
    }
  };

  const onDoneHandler = useCallback(async () => {
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
      setIsFetching(true);
      const [dataRes, dataErr]: any = await handle(
        SmStats.putUploadTable(
          {
            file_name: fileName,
            slectedSheet: sheetName,
            columns: match,
            results: resultColumns,
          },
          token
        )
      );
      setIsFetching(false);
      if (!dataErr) {
        userIsWorkingWithFile.current = false;
        onShowAlert(
          true,
          "Thank you! We are processing your data and will update you shortly"
        );
        onClose();
      }
      if (dataErr) {
        //cases when no message
        if (typeof dataErr === "string") onShowAlert(false, "Error occured !");
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token, fileName, matchColumns, sheetName, resultColumns]);

  const handleAbordTable = () => {
    console.log("delete");
    if (token && uploadId) {
      handle(SmStats.abordUploadedTable(token, uploadId));
    }
  };

  const onChangeFile = (file: File) => {
    if (file && token) {
      if (userIsWorkingWithFile.current) handleAbordTable();
      setIsFetching(true);
      const uniqueId = uuidv4();
      setUploadId(uniqueId);
      // @ts-ignore
      new FileUploader({
        uploadType: "media",
        files: [file],
        uploadId: uniqueId,
        csrfToken: token || "",
        portion: 1024 * 1024,
        uploadscript: primaryApiUrl + "sm_stats/upload_map/",
      });
    }
  };

  const handleDownloadTemplate = async () => {
    if (!token) return;
    const [res, err] = await SmStats.getTemplate(token);
    if (err) onShowAlert(false, err.error || "Unexpected error");
    if (!res) onShowAlert(false, err.error || "Unexpected error");
    const file = res;

    if (!(file instanceof Blob)) return;
    const ext = file.type.split("/")[1];
    if (!ext) return;

    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = `template.${ext}`;
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    window.addEventListener("success", checkSuccessUpload);
    return () => {
      window.removeEventListener("success", checkSuccessUpload);
    };
  }, [handleAbordTable]);

  useEffect(() => {
    return () => {
      if (userIsWorkingWithFile.current) {
        handleAbordTable();
      }
    };
  }, []);

  if (isFetching) return <StyledLoader />;

  return (
    <Card>
      <TextStyled color={colors.graphite_5}>
        Add Your map data
        <TextLayerStyled
          as={"a"}
          onClick={handleDownloadTemplate}
          data-action={activityList["map-template-download"]}
        >
          this template
        </TextLayerStyled>
      </TextStyled>
      <InputFileStyled
        data-action={activityList["map-data-upload"]}
        content={
          <>
            <TitleModal>Drop an template here</TitleModal>
            <TextModal>or click here to upload an template</TextModal>
            <Text>Excel only</Text>
          </>
        }
        placeholder={
          <>
            <UploadIcon /> Upload
          </>
        }
        onChange={(f) => onChangeFile(f as File)}
      />
      <TextStyled>Table sample rows</TextStyled>
      <MapTablePreviewView
        onChangeMatchColumns={(match) => setMatchColumns(match)}
        onChangeResultColumns={(resCol) => setResultColumns(resCol)}
        data={tableRes.data}
        columns={tableRes.headers}
      />
      <ButtonStyled
        data-action={activityList["map-data-submit"]}
        disabled={fileName === "" || isFetching}
        onClick={onDoneHandler}
        variants={EButtonVariants.Primary}
      >
        Done
      </ButtonStyled>
    </Card>
  );
});

export default ImportMapData;
