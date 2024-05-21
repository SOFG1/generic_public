import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Title } from "../../components/common/Title";
import { Text } from "../../components/common/Text";
import { Button, EButtonVariants } from "../../UI/Button";
import { Input, InputFile } from "../../UI/Input";
import { DeleteIcon, UploadIcon } from "../../UI/Svg";
import { useUserState } from "../../store/user";
import FileUploader from "../../utils/file_uploader";
import { v4 as uuidv4 } from "uuid";
import { primaryApiUrl, handle } from "../../api";
import { colors } from "../../styles/colors";
import { TablePreviewView } from "../SighUpViews";
import { RawData } from "../../api/rawData";
import { saveAs } from "file-saver";
import { Dropdown } from "../../UI/Dropdown";
import { useRawDataActions, useRawDataState } from "../../store/rawData";
import { Loader } from "../../UI/Spinners";
import { useAppActions } from "../../store/app";
import { InputValueType } from "../../types";
import { desktopBp } from "../../styles/variables";
import { FieldInput } from "../../components/common/FieldInput";
import { activityList } from "../../config/userActivityList";

const TitleModal = styled(Title)`
  text-align: center;
  margin-bottom: 0.52vw;
  margin-top: 0;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
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
  text-align: center;
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

const DownloadLink = styled(TextStyled)`
  cursor: pointer;
  color: ${colors.cyan_4};
  text-decoration: underline;
`;

const FieldBox = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: flex-start;
  gap: 0.52vw;
  margin-bottom: 0.78vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
    margin-bottom: 10px;
  }
`;

const StyledTablePreview = styled(TablePreviewView)`
  margin: 0 auto;
`;

const StyledDropdown = styled(Dropdown)`
  flex-grow: 1;
  width: 10.42vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 131px;
  }
  @media screen and (max-width: 600px) {
    width: 120px;
  }
`;

const StyledFieldInput = styled(FieldInput)`
  flex-grow: 1;
  width: 10.42vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 131px;
  }
  @media screen and (max-width: 600px) {
    width: 120px;
  }
`;

const StyledBtn = styled(Button)`
  width: auto;
  padding: 0.52vw 1.56vw;
  margin-bottom: 1.56vw;
  margin-right: auto;
  @media screen and (max-width: ${desktopBp}) {
    padding: 7px 20px;
    margin-bottom: 20px;
  }
`;

const StyledFiltersCount = styled.p`
  font-size: 1.15vw;
  font-weight: 500;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 14px;
  }
`;

const StyledSubtitle = styled.h3`
  width: 100%;
  font-weight: bold;
  font-size: 1.04vw;
  line-height: 1.15vw;
  text-align: center;
  max-width: 32.81vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 13px;
    line-height: 14px;
    max-width: 412px;
  }
`;

const StyledText = styled(StyledSubtitle)`
  text-align: start;
`;

const SubmitBtn = styled(Button)`
  padding: 0.52vw 1.56vw;
  margin: 1.04vw auto 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 7px 20px;
    margin: 13px auto 7px;
  }
`;

const InputFileStyled = styled(InputFile)`
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
  }
`;

const StyledTextarea = styled(Input)`
  & textarea {
    min-height: 5.21vw;
    resize: vertical;
    border-radius: 1.04vw;
    @media screen and (max-width: ${desktopBp}) {
      min-height: 65px;
      border-radius: 13px;
    }
  }
`;

const StyledLoader = styled(Loader)`
  height: 10.42vw;
  width: 10.42vw;
  margin: 1.04vw auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 131px;
    width: 131px;
    margin: 13px auto;
  }
`;

const ClearBtn = styled.div`
  width: 1.25vw;
  height: 1.25vw;
  box-sizing: border-box;
  border-radius: 50%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid ${colors.orange};
  background-color: transparent;
  transition: all 0.25s ease;

  svg path {
    transition: all 0.25s ease;
  }

  &:hover {
    background-color: ${colors.orange};
    svg path {
      fill: #fff;
    }
  }
  @media screen and (max-width: ${desktopBp}) {
    width: 16px;
    height: 16px;
  }
`;

const Switcher = styled.div`
  display: flex;
  justify-content: center;
`;

const SwitcherBtn = styled.button<{ isActive: boolean }>`
  background-color: transparent;
  border: 1px solid #000;
  color: #000;
  font-size: 1.15vw;
  font-weight: 700;
  cursor: pointer;
  width: 10.94vw;
  transition: 250ms linear;
  ${({ isActive }) => isActive && "background-color: #000; color: #fff;"}
  &:hover {
    background-color: #000;
    color: #fff;
  }
  &:first-child {
    border-start-start-radius: 0.52vw;
    border-end-start-radius: 0.52vw;
  }
  &:last-child {
    border-start-end-radius: 0.52vw;
    border-end-end-radius: 0.52vw;
  }

  @media screen and (max-width: ${desktopBp}) {
    font-size: 14px;
    width: 137px;
    &:first-child {
      border-start-start-radius: 7px;
      border-end-start-radius: 7px;
    }
    &:last-child {
      border-start-end-radius: 7px;
      border-end-end-radius: 7px;
    }
  }

  @media screen and (max-width: 850px) {
    width: 140px;
  }
  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

const UpdateData = React.memo(({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const { onGetTable } = useRawDataActions();
  const { onShowAlert } = useAppActions();
  const { token } = useUserState();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [tableFile, setTableFile] = useState<null | File>(null);

  const [tableRes, setTableRes] = useState<{
    headers: string[];
    data: { [key: string]: string | number | boolean }[];
  }>({ headers: [], data: [] });
  const [fileRes, setFileRes] = useState<string>("");


  const { filters, appliedFilters } = useRawDataState();
  const [filtersValues, setFiltersValues] = useState<{
    [key: string]: InputValueType;
  }>({});
  const [idList, setIdList] = useState<string>("");
  const [switcher, setSwitcher] = useState<
    "table" | "input" | "filters" | null
  >(null);

  const filtersOptions = useMemo(() => {
    return filters
      .filter(f => f.fetch || f.type === "bool")
      .filter((f) => f.slug !== "city" && f.slug !== "street")
      .map((f) => ({ item: f.name, value: f.slug }));
  }, [filters]);

  const appliedFiltersCount = useMemo(() => {
    return Object.keys(appliedFilters || {}).length;
  }, [appliedFilters]);

  const disabledSubmitBtn = useMemo(() => {
    if (switcher === "table" && !isFetching) {
      return !tableFile;
    }
    if (switcher === "input" && !isFetching) {
      return !idList;
    }
    return isFetching;
  }, [switcher, filtersValues, tableFile, idList, isFetching]);

  const formHasError = useMemo(() => {
    const filtersValuesArray = Object.values(filtersValues);
    if (
      filtersValuesArray.length === 0 ||
      filtersValuesArray.some((v) => v === "")
    )
      return "Fields mustn't be empty";
  }, [filtersValues]);

  const onChangeFile = useCallback(
    (file: File) => {
      if (file) {
        setTableFile(file);
        setIsFetching(true);
        const uniqueId = uuidv4()
        // @ts-ignore
        const res = new FileUploader({
          uploadType: "media",
          files: [file],
          uploadId: uniqueId,
          csrfToken: token || "",
          portion: 1024 * 1024,
          uploadscript: primaryApiUrl + "raw_data/table_upload/",
        });
      }
    },
    [token]
  );

  const checkSuccessUpload = (res: any) => {
    setIsFetching(false);
    if (res) {
      const {
        detail: {
          data: { file_name, options },
        },
      } = res;
      const [sheetKey, columnKey] = Object.keys(options);
      const columns = options[columnKey];
      const table_template: { [key: string]: string | number | boolean }[] =
        options[sheetKey].data;
      setFileRes("Table was successfully uploaded");
      setTableRes({ headers: columns, data: table_template });
    }
  };

  useEffect(() => {
    window.addEventListener("success", checkSuccessUpload);
    return () => {
      window.removeEventListener("success", checkSuccessUpload);
    };
  }, []);

  const selectField = (f: string, v: string) => {
    let copy: any = { ...filtersValues };
    copy[v] = filtersValues[v] ? filtersValues[v] : "";
    delete copy[f];
    setFiltersValues(copy);
  };

  const deleteField = (f: string) => {
    let copy: any = { ...filtersValues };
    delete copy[f];
    setFiltersValues(copy);
  };

  const onUpdateFields = async () => {
    let data: any = new FormData();
    if (switcher === "table" && tableFile) data.append("file", tableFile);
    if (switcher === "input" && idList) data = { id_list: idList };
    if (switcher === "filters") data = { filters: appliedFilters };
    if (Object.keys(filtersValues).length > 0 && data instanceof FormData) {
      data.append("values", JSON.stringify(filtersValues));
    }
    if (Object.keys(filtersValues).length > 0 && !(data instanceof FormData)) {
      const valuesFormated: any = {}
      Object.keys(filtersValues).forEach(k => {
        const value = filtersValues[k]
        if(typeof value === "boolean") {
          valuesFormated[k] = value ? 1 : 0
          return
        }
        valuesFormated[k] = value
      })
      data.values = JSON.stringify(valuesFormated);
    }
    //Check errors
    if (formHasError) {
      onShowAlert(false, formHasError);
      return;
    }
    // Send request
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(RawData.bulkUpdate(data, token));
      setIsFetching(false);
      if (dataRes) {
        onGetTable();
        onShowAlert(true, dataRes);
        onClose();
      }
      if (dataErr) {
        console.log(dataErr);
        const { error } = dataErr;
        onShowAlert(false, error ? error : "Something went wrong!");
      }
    }
    if (
      !data.values ||
      (switcher === "table" && !tableFile) ||
      (switcher === "input" && !idList)
    ) {
      onShowAlert(false, "Fill necessary fields");
      return;
    }
  };

  const onDownloadCurrentTemplate = useCallback(async () => {
    if (token) {
      const [dataRes, dataErr]: any = await handle(
        RawData.getUpdateTable(token)
      );
      if (dataRes !== undefined) {
        saveAs(dataRes, "CurrentTemplate.xlsx");
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
  }, [token]);



  const filtersCountText = useMemo(() => {
    return eval(t("raw-data_update-filters"))(appliedFiltersCount)
  }, [t, appliedFiltersCount])

  return (
    <>
      <TitleModal>{t("raw-data_update-title")}</TitleModal>
      {Object.keys(filtersValues).map((field, index) => {
        const filterData = filters.find((f) => f.slug === field);
        return (
          <FieldBox key={index}>
            <StyledDropdown
              placeholder=""
              label={t("raw-data_update-field")}
              value={field}
              onSelect={(v) => selectField(field, v)}
              options={filtersOptions}
            />
            {filterData && (
              <StyledFieldInput
                //@ts-ignore
                filter={{
                  ...filterData,
                  name: filterData.slug,
                  is_multiplier: false,
                }}
                label={t("raw-data_update-value")}
                value={filtersValues[field]}
                onChange={(slug, value) =>
                  setFiltersValues((prev) => ({ ...prev, [slug]: value }))
                }
              />
            )}
            <ClearBtn onClick={() => deleteField(field)}>
              <DeleteIcon />
            </ClearBtn>
          </FieldBox>
        );
      })}
      <StyledBtn
        data-action={activityList["rawdata-update-add_field"]}
        variants={EButtonVariants.Primary}
        onClick={() => setFiltersValues((p) => ({ ...p, "": "" }))}
      >
        {t("raw-data_update-add")}
      </StyledBtn>

      {!switcher && (
        <>
          <StyledSubtitle>{t("raw-data_update-subtitle")}</StyledSubtitle>
          <StyledText>{t("raw-data_update-text1")}</StyledText>
          <StyledText>{t("raw-data_update-text2")}</StyledText>
          <StyledText>{t("raw-data_update-text3")}</StyledText>
        </>
      )}

      <Switcher>
        <SwitcherBtn
        data-action={activityList["rawdata-update-by_file"]}
          isActive={switcher === "table"}
          onClick={() => setSwitcher("table")}
        >
          {t("raw-data_update-btn1")}
        </SwitcherBtn>
        <SwitcherBtn
        data-action={activityList["rawdata-update-by_ids"]}
          isActive={switcher === "input"}
          onClick={() => setSwitcher("input")}
        >
          {t("raw-data_update-btn2")}
        </SwitcherBtn>
        <SwitcherBtn
        data-action={activityList["rawdata-update-by_filters"]}
          isActive={switcher === "filters"}
          onClick={() => setSwitcher("filters")}
        >
          {t("raw-data_update-btn3")}
        </SwitcherBtn>
      </Switcher>

      {switcher === "table" && !isFetching && (
        <div>
          <StyledSubtitle>{t("raw-data_update-v1")}</StyledSubtitle>
        
          <DownloadLink onClick={onDownloadCurrentTemplate} data-action={activityList["rawdata-update-template"]}>
            {t("raw-data_template-link")}
          </DownloadLink>
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
          <TextStyled color={colors.graphite_1}>
            {t("raw-data_template-rows")}
          </TextStyled>
          <StyledTablePreview
            onChangeMatchColumns={(match) => {}}
            data={tableRes.data}
            columns={tableRes.headers}
            registration={false}
          />
        </div>
      )}
      {switcher === "input" && !isFetching && (
        <div>
          <StyledSubtitle>{t("raw-data_update-v2")}</StyledSubtitle>
          <StyledTextarea
            disabled={false}
            name="idlist"
            label=""
            type="text"
            value={idList}
            onChange={setIdList}
            isTextarea={true}
          />
        </div>
      )}
      {switcher === "filters" && !isFetching && (
        <StyledFiltersCount dangerouslySetInnerHTML={{__html: filtersCountText}} />
      )}
      {isFetching && <StyledLoader />}
      <SubmitBtn
      data-action={activityList["rawdata-update-submit"]}
        disabled={disabledSubmitBtn}
        variants={EButtonVariants.Primary}
        onClick={onUpdateFields}
      >
        {t("raw-data_update")}
      </SubmitBtn>
    </>
  );
});

export default UpdateData;
