import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Title } from "../../components/common/Title";
import { Card, card_size } from "../../components/common/Card";
import { Text } from "../../components/common/Text";
import { Button, EButtonVariants } from "../../UI/Button";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { TablePreviewView, TemplateUploadView } from "./index";
import table from "../../data/table.json";
import { v4 as uuidv4 } from "uuid";
import FileUploader from "../../utils/file_uploader";
import { primaryApiUrl, handle } from "../../api";
import { useUserState } from "../../store/user";
import { User } from "../../api/user";
import { useUserActions } from "../../store/user/hooks";
import { ERegistrationSteps } from "../../types";
import { useTranslation } from "react-i18next";
import { Loader } from "../../UI/Spinners";
import { Dropdown } from "../../UI/Dropdown";
import { CitiesDropdownComponent, DigitalSignature } from "../../components/SignUpComponents";
import { Link } from "react-router-dom";
import TextLayer from "../../components/common/Text/TextLayer";
import { useAppActions } from "../../store/app";
import { desktopBp } from "../../styles/variables";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";
const { useScreenshot, createFileName } = require("use-react-screenshot");

const Wrapper = styled.div<{ isLoading: boolean }>`
  ${({ isLoading }) => isLoading && "& * {cursor: wait;}"}
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonStyled = styled(Button)`
  margin: 1.04vw 0;
  @media screen and (max-width: ${desktopBp}) {
    margin: 13px 0;
  }
`;

const DownloadBtn = styled(Button)`
  font-size: 0.83vw;
  width: auto;
  padding: 0.36vw 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    padding: 5px 13px;
  }
`;

const TextStyled = styled(Text)`
  margin-bottom: 1.04vw;
  width: 100%;
  min-width: 39.06vw;
  font-size: 1.25vw;
  white-space: pre-line;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
    min-width: 490px;
    font-size: 16px;
  }
  @media screen and (max-width: 550px) {
    font-size: 20px;
    line-height: 22px;
  }
`;
const ErrorMessage = styled.div`
  font-size: 0.83vw;
  line-height: 1;
  text-align: center;
  color: ${colors.orange};
  width: 100%;
  margin-bottom: 0.52vw;
  margin-top: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    margin-bottom: 7px;
    margin-top: 7px;
  }
`;

const StyledLoader = styled(Loader)`
  height: 5.21vw;
  width: 5.21vw;
  margin-bottom: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 65px;
    width: 65px;
    margin-bottom: 20px;
  }
`;

const CountryDropdown = styled(Dropdown)`
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
  }
`;

const IsraelCountryNumber = 328;

const StepTwoView = React.memo(() => {
  const { t } = useTranslation();
  const default_data: { [key: string]: string }[] = useMemo(() => {
    return table;
  }, []);
  const { userInfo, countries } = useUserState();
  const { onSetRegistrationStep, onLogout } = useUserActions();
  const { token } = useUserState();
  const { onGetCountries } = useUserActions()
  const { onShowAlert } = useAppActions();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [selectedCities, setSelectedCities] = useState<number[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [fileRes, setFileRes] = useState<string>("");
  const [sheetName, setSheetName] = useState<string>("");
  const [tableData, setTableData] = useState<{ [key: string]: string }[]>([]);
  const [image, takeScreenshot] = useScreenshot();
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [tableRes, setTableRes] = useState<{
    headers: string[];
    data: { [key: string]: string | number | boolean }[];
  }>({ headers: [], data: [] });
  const [matchColumns, setMatchColumns] = useState<{ [key: string]: string }>(
    {}
  );
  const userIsWorkingWithFile = useRef(false);

  const [uploadId, setUploadId] = useState(uuidv4())

  const signRef = useRef(null);

  const onDownload = () => {
    const a = document.createElement("a");
    a.download = createFileName("jpg", "screen");
    a.href = image;
    a.click();
  };

  const handleEditSign = (isEdited: boolean) => {
    if (isEdited) takeScreenshot(signRef.current);
    setIsSigned(isEdited);
  };

  const countriesOptions = useMemo(() => {
    return countries ? countries.map(c => ({ item: c.name, value: c.id })) : []
  }, [countries])

  useEffect(() => {
    onGetCountries()
  }, [])

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [errorMessage]);

  const onChangeFile = useCallback(
    (file: File) => {
      if (file) {
        if (userIsWorkingWithFile.current) handleAbordFile();
        setIsFetching(true);
        const uniqueId = uuidv4()
        setUploadId(uniqueId)
        // @ts-ignore
        new FileUploader({
          uploadType: "media",
          files: [file],
          uploadId: uniqueId,
          csrfToken: token || "",
          portion: 1024 * 1024,
          uploadscript: primaryApiUrl + "user/upload-table/",
        });
      }
    },
    [token]
  );

  useEffect(() => {
    if (fileName !== "") {
      setTableData(default_data);
    }
  }, [fileName, default_data]);

  const checkSuccessUpload = (res: any) => {
    if (res) {
      const {
        detail: {
          data: { file_name, options, countrys },
        },
      } = res;
      const [sheetKey, columnKey] = Object.keys(options);
      const columns = options[columnKey];
      const table_template: { [key: string]: string | number | boolean }[] =
        options[sheetKey].data;
      setIsFetching(false);
      setSheetName(sheetKey);
      setFileName(file_name);
      setFileRes("Table was successfully uploaded");
      setTableRes({ headers: columns, data: table_template });
      userIsWorkingWithFile.current = true;
    }
  };

  const handleAbordFile = useCallback(() => {
    if (token && uploadId) {
      User.abordUploadedTable(token, uploadId);
    }
  }, [token, uploadId]);

  useEffect(() => {
    window?.addEventListener("success", checkSuccessUpload);
    window?.addEventListener("beforeunload", handleAbordFile);
    return () => {
      window.removeEventListener("success", checkSuccessUpload);
      window.removeEventListener("beforeunload", handleAbordFile);
    };
  }, [handleAbordFile]);

  const onNextHandler = useCallback(async () => {
    if (!isSigned && selectedCountry === IsraelCountryNumber) {
      onShowAlert(false, "You must sign if your country is Israel");
      return;
    }
    if (typeof selectedCountry !== "number") {
      onShowAlert(false, "Please select your country");
      return;
    }
    if (fileName === "") {
      onShowAlert(false, "Please upload file");
      return;
    }
    if (
      token &&
      fileName &&
      Object.keys(matchColumns).length > 0 &&
      sheetName &&
      typeof selectedCountry === "number"
    ) {
      const match: { [key: string]: string } = {};
      for (const key in matchColumns) {
        if (matchColumns[key] !== "" && matchColumns[key] !== "-") {
          match[key] = matchColumns[key];
        }
      }
      setIsFetching(true);
      const [dataRes, dataErr]: any = await handle(
        User.putUploadTable(
          {
            file_name: fileName,
            slectedSheet: sheetName,
            columns: match,
            country: selectedCountry,
            available_city: selectedCities.length ? selectedCities : null
          },
          token
        )
      );
      setIsFetching(false);
      if (!dataErr) {
        userIsWorkingWithFile.current = false;
        if (selectedCountry !== IsraelCountryNumber)
          onSetRegistrationStep(ERegistrationSteps.StepThree);
      }
      if (dataErr) {
        console.log(dataErr);
        const { error } = dataErr;
        setErrorMessage(error);
        //return if occurs any errors in table uploading
        return;
      }
      //If selected country israel and no errors in table uploading, send digital signature
      if (selectedCountry === IsraelCountryNumber) {
        const [signData, signErr] = await handle(
          User.uploadSignature(image, token)
        );
        if (signData) console.log(signData);
        if (!signErr) onSetRegistrationStep(ERegistrationSteps.StepThree);
        if (signErr) console.log(signErr);
      }
    }
  }, [
    token,
    fileName,
    matchColumns,
    sheetName,
    selectedCountry,
    selectedCities,
    isSigned,
    image,
  ]);

  useEffect(() => {
    return () => {
      if (userIsWorkingWithFile.current) handleAbordFile();
    };
  }, []);

  return (
    <Wrapper isLoading={isFetching}>
      <Title>{t("sign-up_step2")}</Title>
      <CountryDropdown
        placeholder={t("sign-up_step2-country")}
        label={t("sign-up_step2-country")}
        onSelect={(v) => setSelectedCountry(v)}
        value={typeof selectedCountry === "number" ? selectedCountry : 0}
        options={countriesOptions}
      />
      <StyledCard>
        <TextStyled>{t("sign-up_step2-text1")}</TextStyled>
        {!isFetching && (
          <TemplateUploadView onChangeFile={onChangeFile} fileName={fileRes} />
        )}
        {isFetching && <StyledLoader />}
        <TextStyled
          color={tableData.length === 0 ? colors.graphite_1 : colors.graphite_5}
        >
          {t("sign-up_rows")}
        </TextStyled>
        <TablePreviewView
          onChangeMatchColumns={(match) => setMatchColumns(match)}
          data={tableRes.data}
          columns={tableRes.headers}
          registration={true}
        />
        {selectedCountry === IsraelCountryNumber && (
          <DigitalSignature
            isEdited={isSigned}
            setEdited={handleEditSign}
            ref={signRef}
            fullName={userInfo?.full_name}
            login={userInfo?.login}
            uId={userInfo?.uid}
          />
        )}
        {isSigned && (
          <DownloadBtn
            variants={EButtonVariants.Secondary}
            onClick={onDownload}
          >
            {t("sign-up_download")}
          </DownloadBtn>
        )}
        {selectedCountry && <CitiesDropdownComponent value={selectedCities} onChange={setSelectedCities} countryId={selectedCountry} />}
        <ButtonStyled
          disabled={isFetching}
          onClick={onNextHandler}
          variants={EButtonVariants.Primary}
        >
          {t("sign-up_next")}
        </ButtonStyled>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Text>
          {t("sign-up_login")}{" "}
          <Link to={"/sign-in"} onClick={onLogout}>
            <TextLayer as={"span"}>{t("sign-up_sign-in")}</TextLayer>
          </Link>
        </Text>
      </StyledCard>
    </Wrapper>
  );
});

export default withErrorBoundaryHOC(StepTwoView);
