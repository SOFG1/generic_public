import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import {
  FieldType,
  IColumns,
  useSettingsActions,
} from "../../store/settings";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { CreateableDropdown } from "../../UI/CreateableDropdown";
import { Dropdown } from "../../UI/Dropdown";
import { Checkbox, Input } from "../../UI/Input";
import { Loader } from "../../UI/Spinners";
import { ChevronIcon, ChevronLeftIcon, ChevronRightIcon } from "../../UI/Svg";
import { ConfirmDeleteFull } from "../common/ConfirmDeleteFull";
import FieldPreviewComponent from "./FieldPreviewComponent";
import { activityList } from "../../config/userActivityList";
import { onlyNumbersValidator } from "../../utils";

const typeOptions = [
  { item: "number", value: "int" },
  { item: "text", value: "str" },
  { item: "decimal", value: "float" },
  { item: "true/false", value: "bool" },
  { item: "date time", value: "timestamp" },
];

//Fields with not editable(hardcoded) options
const notEditableOptsFields = [
  "city",
  "street",
  "institution",
  "job",
  "referal",
  "mobilizer",
  "status",
];


const StyledWrapper = styled.div`
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
  margin-bottom: 13px;
  }
`

const StyledHeader = styled.div<{ opened: boolean }>`
  display: flex;
  justify-content: space-between;
  padding-bottom: 3px;
  border-bottom: 1px solid #AAAAAA;
  margin-bottom: 10px;
  > svg {
    width: 1.3vw;
    height: 1.3vw;

    margin-inline-start: auto;
    ${({ opened }) => opened && "transform: rotate(90deg);"}
  }
  > svg path {
    stroke: #000;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 16px;
    > svg {
      height: 16px;
      width: 16px;
    }
  }
`

const StyledTitles = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;
`

const StyledTitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  min-width: 8.75vw;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 110px;
  }
  @media screen and (max-width: 700px) {
    font-size: 12px;
  }
`

const StyledLoader = styled(Loader)`
  height: 3.13vw;
  width: 3.13vw;
  margin: 2.6vw auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 39px;
    width: 39px;
    margin: 33px auto;
  }
`;

const StyledCreateable = styled(CreateableDropdown)`
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
  }
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.6vw;
  margin-bottom: 2.6vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 33px;
    margin-bottom: 33px;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
  }
`;

const StyledLabels = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2.34vw;
  @media screen and (max-width: 700px) {
    margin-bottom: 29px;
  }
  @media screen and (max-width: 700px) {
    display: none;
  }
`

const StyledLabel = styled.p`
  width: 50%;
  display: flex;
  margin: 0;
  font-weight: 700;
  text-decoration: underline;
`

const StyledInput = styled(Input)`
  width: 13.02vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 163px;
  }
`;

const StyledDropdown = styled(Dropdown)`
  width: 13.02vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 163px;
  }
`;

const CheckboxList = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 3.49vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 44px;
  }
`;

const StyledBtn = styled(Button)`
  width: fit-content;
  min-width: 7.03vw;
  border-radius: 100px;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 88px;
  }
`;


const OrderBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`


const OrderBtn = styled.button<{ reversed?: boolean }>`
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  svg {
    ${({ reversed }) => reversed && "transform: rotate(180deg);"}
  }
`;

interface IProps {
  column: IColumns
  isLast: boolean
  showOrderButtons: boolean
}

const EditFieldComponent = React.memo(({ column, isLast, showOrderButtons }: IProps) => {
  const { t, i18n } = useTranslation();
  const { token } = useUserState();
  const { onGetColumns, onChangeColumnOrder } = useSettingsActions();
  const { onShowAlert } = useAppActions();
  const [data, setData] = useState<IColumns>(column)
  const [opened, setOpened] = useState<boolean>(false)
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);


  const handleChangeOrder = useCallback(async (e: any, dir: "inc" | "dec") => {
    e.stopPropagation()
    const newOrder = dir === "inc" ? column.order + 1 : column.order - 1
    setIsFetching(true)
    onChangeColumnOrder(column.id, newOrder)
  }, [token, column])


  const handleChange = useCallback(
    (property: string, value: any) => {
      if (property === "fetch" && value === true) {
        fetchOptions()
      }
      console.log(value)
      setData(p => {
        if(property === "options" && p.type === "int" && value?.some((o: any) => !onlyNumbersValidator(o[0]))) {
          onShowAlert(false, t("settings_fields-numeric_warn"))
        }
        return { ...p, [property]: value }
      })
    },
    []
  );

  const onSave = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr]: any = await handle(
        Settings.putColumn(data, token)
      );
      setIsFetching(false);
      if (dataRes) {
        onShowAlert(true, "Saved successfully");
        onGetColumns();
      }
      if (dataErr?.error) {
        onShowAlert(false, dataErr?.error);
      }
    }
  }, [data, token, onGetColumns]);

  const onDelete = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        Settings.deleteColumn(token, column.id)
      );
      setIsFetching(false);
      if (!dataErr) {
        onShowAlert(true, "Successfully deleted");
        onGetColumns();
      }
    }
  }, [token, column]);

  const fetchOptions = async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        Settings.getColumnOptions(token, column.slug)
      );
      setIsFetching(false);
      if (dataRes?.options?.length > 0) {
        const opts = dataRes.options.map(([o]: [string]) => [o, o]);
        handleChange("options", opts);
      }
      if (dataRes?.len_input_prefetch > 0) {
        handleChange("len_input_prefetch", dataRes?.len_input_prefetch);
      }
    }
  };

  const isDataValid = useMemo(() => {
    let isValid = true;
    //Set always fetch true for referral and status
    if (data.slug === "status" && data?.fetch === false)
      isValid = false;
    if (data.slug === "referal" && data?.fetch === false)
      isValid = false;
    // Required always true for id
    if (data.slug === "id" && data?.required === false)
      isValid = false;
    // Set dropdown false if column type is not string
    if (data.type !== "str" && data.type !== "int" && data.fetch) isValid = false;
    // is_manual_input always false when not dropdown
    if (data.is_manual_input && !data.fetch) isValid = false;
    return isValid;
  }, [data]);

  useEffect(() => {
    if (!isDataValid) {
      //Set always fetch true for referal and status
      if (data.slug === "status" && !data.fetch) {
        handleChange("fetch", true);
      }
      if (data.slug === "referal" && !data.fetch) {
        handleChange("fetch", true);
      }
      // Required always true for id
      if (data.slug === "id" && !column.required) {
        handleChange("required", true);
      }
      // Set dropdown false if column type is not string
      if (data.type !== "str" && data.type !== "int" && data.fetch) {
        handleChange("fetch", false);
      }
      // is_manual_input always false when not dropdown
      if (data.is_manual_input && !data.fetch) {
        handleChange("is_manual_input", false);
      }
    }
  }, [isDataValid, data, column]);

  const inputPreviewFilter = useMemo(() => {
    return {
      type: data.type,
      name: data.slug,
      label: data.name,
      fetch: data.fetch,
      required: data.required,
      is_multiplier: data.is_multiplier,
      options: data?.options,
      is_manual_input: data.is_manual_input,
    };
  }, [data]);


  //Can not be multiple anwers when not dropdown
  useEffect(() => {
    if (!data.fetch && data.is_multiplier) {
      setData((p) => ({ ...p, is_multiplier: false }));
    }
  }, [data.fetch, data.is_multiplier])


  //If type=int all options must be numbers
  useEffect(() => {
    if (data.type === "int" && data.options?.some(o => !onlyNumbersValidator(o[0]))) {
      setData(p => ({
        ...p,
        options: p.options?.filter(o => onlyNumbersValidator(o[0]))
      }))
    }
  }, [data])



  useEffect(() => {
    setIsFetching(false)
  }, [column.order])



  if (isFetching) return <StyledLoader />;

  return (
    <>
      {confirmDelete && (
        <ConfirmDeleteFull
          show={confirmDelete}
          title={t("raw-data_confirm-delete")}
          text={t("raw-data_confirm")}
          onDelete={() => onDelete()}
          onClose={() => setConfirmDelete(false)}
        />
      )}
      <StyledWrapper>
        <StyledHeader onClick={() => setOpened(p => !p)} opened={opened}>
          <StyledTitles>
            <OrderBox>
              {column.order !== 1 && showOrderButtons && (
                <OrderBtn
                  disabled={isFetching}
                  onClick={(e: any) => handleChangeOrder(e, "dec")}
                  data-action={activityList["field-change-order"]}
                  reversed={true}
                >
                  <ChevronIcon />
                </OrderBtn>
              )}
              {!isLast && showOrderButtons && (
                <OrderBtn
                  disabled={isFetching}
                  onClick={(e: any) => handleChangeOrder(e, "inc")}
                  data-action={activityList["field-change-order"]}
                >
                  <ChevronIcon />
                </OrderBtn>
              )}
            </OrderBox>
            <StyledTitle>{data.slug}</StyledTitle>
            <StyledTitle>{data.name}</StyledTitle>
            <StyledTitle>{data.type}</StyledTitle>
          </StyledTitles>
          {i18n.dir() ? < ChevronRightIcon /> : <ChevronLeftIcon />}
        </StyledHeader>
        {opened && (
          <>
            <StyledRow>
              <StyledInput
                disabled={true}
                type="text"
                label={t("settings_fields-create_db_name")}
                onChange={(val: string) => handleChange("slug", val)}
                value={data.slug}
                name="slug"
              />

              <StyledInput
                type="text"
                label={t("settings_fields-create_name")}
                onChange={(val: string) => handleChange("name", val)}
                value={data.name}
                name="name"
              />

              <StyledDropdown
                placeholder={t("settings_fields-create_type")}
                label={t("settings_fields-create_type")}
                value={data.type}
                options={typeOptions}
                onSelect={(val: FieldType) => handleChange("type", val)}
              />
            </StyledRow>
            <StyledLabels>
              <StyledLabel>{t("settings_fields-config")}</StyledLabel>
              <StyledLabel>{t("settings_fields-preview")}</StyledLabel>
            </StyledLabels>
            <StyledRow>
              <CheckboxList>
                <CheckboxContainer>
                  <Checkbox
                    isDisabled={data.type !== "str" && data.type !== "int"}
                    isActive={data.fetch}
                    label={t("settings_fields-dropdown")}
                    onChange={(val: boolean) =>
                      handleChange("fetch", !data.fetch)
                    }
                  />
                </CheckboxContainer>

                <CheckboxContainer>
                  <Checkbox
                    isDisabled={!data.fetch}
                    isActive={data.is_multiplier}
                    label={t("settings_fields-multiplier")}
                    onChange={(val: boolean) =>
                      handleChange("is_multiplier", !data.is_multiplier)
                    }
                  />
                </CheckboxContainer>

                <CheckboxContainer>
                  <Checkbox
                    isActive={!!data.required}
                    label={t("settings_fields-required")}
                    onChange={(val: boolean) =>
                      handleChange("required", !data.required)
                    }
                  />
                </CheckboxContainer>

                <CheckboxContainer>
                  <Checkbox
                    isActive={data.is_filter}
                    label={t("settings_fields-is_filter")}
                    onChange={(val: boolean) =>
                      handleChange("is_filter", !data.is_filter)
                    }
                  />
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    isActive={data.is_field}
                    label={t("settings_fields-is_field")}
                    onChange={(val: boolean) =>
                      handleChange("is_field", !data.is_field)
                    }
                  />
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    isActive={data.is_table}
                    label={t("settings_fields-is_table")}
                    onChange={(val: boolean) =>
                      handleChange("is_table", !data.is_table)
                    }
                  />
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    isActive={!!data.is_manual_input}
                    isDisabled={!data.fetch}
                    label={t("settings_fields-is_manual_input")}
                    onChange={(val: boolean) =>
                      handleChange(
                        "is_manual_input",
                        data.fetch ? !data.is_manual_input : false
                      )
                    }
                  />
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    isActive={!!data.is_volunteer}
                    isDisabled={false}
                    label={t("settings_fields-is_volunteer")}
                    onChange={(val: boolean) =>
                      handleChange("is_volunteer", !data.is_volunteer)
                    }
                  />
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    isActive={!!data.is_excel}
                    label={t("settings_fields-is_excel")}
                    onChange={(val: boolean) =>
                      handleChange("is_excel", !data.is_excel)
                    }
                  />
                </CheckboxContainer>
                <CheckboxContainer>
                  <Checkbox
                    isActive={!!data.is_interviewews_info}
                    label={t("settings_fields-is_interviewews_info")}
                    onChange={(val: boolean) =>
                      handleChange("is_interviewews_info", !data.is_interviewews_info)
                    }
                  />
                </CheckboxContainer>
              </CheckboxList>
              <FieldPreviewComponent
                filter={inputPreviewFilter}
                onAddOption={(opt: string) => { }} //Don't add option in 'edit' mode
              />
            </StyledRow>
            {data.fetch &&
              !notEditableOptsFields.includes(data.slug) && (
                <StyledCreateable
                  options={[]}
                  value={
                    data.options
                      ? data.options?.map((option: [string, string]) => ({
                        label: option[0],
                        value: option[1],
                      }))
                      : []
                  }
                  onChange={(v) =>
                    handleChange(
                      "options",
                      v.map((op) => [op.label, op.value])
                    )
                  }
                  placeholder={t("settings_fields-dropdown_options")}
                  label={t("settings_fields-dropdown_options")}
                />
              )}
            <ButtonsBox>
              <StyledBtn
                onClick={onSave}
                data-action={activityList["settings-edit-field"]}
              >
                {t("settings_fields-save")}
              </StyledBtn>
              <StyledBtn
                onClick={() => setConfirmDelete(true)}
                data-action={activityList["settings-delete-field"]}
              >
                {t("settings_fields-delete")}
              </StyledBtn>
            </ButtonsBox>
          </>
        )}
      </StyledWrapper>
    </>
  );
});

export default EditFieldComponent;
