import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  FieldType,
  ICreateField,
  useSettingsActions,
  useSettingsState,
} from "../../store/settings";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { CreateableDropdown } from "../../UI/CreateableDropdown";
import { Dropdown } from "../../UI/Dropdown";
import { HintComponent } from "../../UI/HintComponent";
import { Checkbox, Input } from "../../UI/Input";
import FieldPreviewComponent from "./FieldPreviewComponent";
import { activityList } from "../../config/userActivityList";
import { Modal } from "../../UI/Modal";
import { onlyNumbersValidator } from "../../utils";
import { useAppActions } from "../../store/app";

const initialData: ICreateField = {
  name: "",
  db_name: "",
  type: "int",
  fetch: false,
  is_multiplier: false,
  is_volunteer: false,
  required: false,
  is_filter: false,
  is_field: false,
  is_table: false,
  is_excel: false,
  is_manual_input: false,
  options: [],
};

const typeOptions = [
  { item: "number", value: "int" },
  { item: "text", value: "str" },
  { item: "decimal", value: "float" },
  { item: "true/false", value: "bool" },
  { item: "date time", value: "timestamp" },
];

const StyledTitle = styled.h2`
  font-size: 1.67vw;
  line-height: 2.19vw;
  font-weight: 400;
  text-transform: capitalize;
  margin: 0 0 1.88vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
    margin: 0 0 24px;
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

const StyledCreateable = styled(CreateableDropdown)`
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
  }
`;

const StyledInput = styled(Input)``;

const StyledDropdown = styled(Dropdown)``;

const CheckboxList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledBtn = styled(Button)`
  width: fit-content;
  min-width: 7.03vw;
  border-radius: 100px;
  margin: 0 auto;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 88px;
  }
`;

interface IProps {
  show: boolean
  onClose: () => void
}

const CreateFieldComponent = React.memo(({ show, onClose }: IProps) => {
  const { t } = useTranslation();
  const { isCreatingField } = useSettingsState();
  const { onCreateField } = useSettingsActions();
  const { onShowAlert } = useAppActions()
  const [createData, setCreateData] = useState<ICreateField>(initialData);



  const handleChangeOptions = useCallback((v: any[]) => {
    setCreateData((p) => {
      if (p.type === "int" && v?.some(o => !onlyNumbersValidator(o.value))) {
        onShowAlert(false, t("settings_fields-numeric_warn"))
      }
      return {
        ...p,
        options: v.map((op: any) => [op.label, op.value]),
      }
    })
  }, [t])

  //is_multiplier and fetch couldn't be checked when type is not string
  useEffect(() => {
    if (
      createData.type !== "str" &&
      createData.type !== "int" &&
      createData.fetch
    ) {
      setCreateData((prev: ICreateField) => ({
        ...prev,
        is_multiplier: false,
        fetch: false,
      }));
    }
  }, [createData]);

  //"Manual input" couldn't be "true" without fetch = true
  useEffect(() => {
    if (!createData.fetch && createData.is_manual_input) {
      setCreateData((p) => ({ ...p, is_manual_input: false }));
    }
  }, [createData.fetch]);

  //Clear options if dropdown not selected
  useEffect(() => {
    if (!createData.fetch) {
      setCreateData((p) => ({ ...p, options: [] }));
    }
  }, [createData.fetch]);


  //Can not be multiple anwers when not dropdown
  useEffect(() => {
    if (!createData.fetch && createData.is_multiplier) {
      setCreateData((p) => ({ ...p, is_multiplier: false }));
    }
  }, [createData.fetch, createData.is_multiplier])

  const inputPreviewFilter = useMemo(() => {
    return {
      type: createData.type,
      name: createData.db_name,
      label: createData.name,
      fetch: createData.fetch,
      required: createData.required,
      is_multiplier: createData.is_multiplier,
      options: createData?.options,
      is_manual_input: createData.is_manual_input,
    };
  }, [createData]);

  const handleAddOption = useCallback(
    (option: string) => {
      const alreadyExist = createData.options?.some(
        (o) => o[0] === option || o[1] === option
      );
      if (!alreadyExist && createData.options) {
        setCreateData((p) => ({
          ...p,
          options: [...(createData.options as [][]), [option, option]],
        }));
      }
      if (!alreadyExist && !createData.options) {
        setCreateData((p) => ({ ...p, options: [[option, option]] }));
      }
    },
    [createData]
  );



  //If type=int all options must be numbers
  useEffect(() => {
    if (createData.type === "int" && createData.options?.some(o => !onlyNumbersValidator(o[0]))) {
      setCreateData(p => ({
        ...p,
        options: p.options?.filter(o => onlyNumbersValidator(o[0]))
      }))
    }
  }, [createData, t])


  return (
    <Modal show={show} onClose={onClose}>
      <StyledTitle>{t("settings_fields-create")}</StyledTitle>
      <StyledRow>
        <StyledInput
          type="text"
          label={t("settings_fields-create_db_name")}
          onChange={(val: string) =>
            setCreateData((prev: ICreateField) => ({ ...prev, db_name: val }))
          }
          value={createData.db_name}
          name="db_name"
        />

        <StyledInput
          type="text"
          label={t("settings_fields-create_name")}
          onChange={(val: string) =>
            setCreateData((prev: ICreateField) => ({ ...prev, name: val }))
          }
          value={createData.name}
          name="name"
        />

        <StyledDropdown
          placeholder={t("settings_fields-create_type")}
          label={t("settings_fields-create_type")}
          value={createData.type}
          options={typeOptions}
          onSelect={(val: FieldType) =>
            setCreateData((prev: ICreateField) => ({ ...prev, type: val }))
          }
        />
      </StyledRow>
      <StyledRow>
        <CheckboxList>
          <CheckboxContainer>
            <Checkbox
              isDisabled={createData.type !== "str" && createData.type !== "int"}
              isActive={createData.fetch}
              label={t("settings_fields-dropdown")}
              onChange={(val: boolean) =>
                setCreateData((prev: ICreateField) => ({ ...prev, fetch: val }))
              }
            />
            <HintComponent position="end" items={["First hint"]} />
          </CheckboxContainer>

          <CheckboxContainer>
            <Checkbox
              isDisabled={!createData.fetch}
              isActive={createData.is_multiplier}
              label={t("settings_fields-multiplier")}
              onChange={(val: boolean) =>
                setCreateData((prev: ICreateField) => ({
                  ...prev,
                  is_multiplier: val,
                }))
              }
            />
          </CheckboxContainer>

          <CheckboxContainer>
            <Checkbox
              isActive={createData.required}
              label={t("settings_fields-required")}
              onChange={(val: boolean) =>
                setCreateData((prev: ICreateField) => ({
                  ...prev,
                  required: val,
                }))
              }
            />
          </CheckboxContainer>

          <CheckboxContainer>
            <Checkbox
              isActive={createData.is_filter}
              label={t("settings_fields-is_filter")}
              onChange={(val: boolean) =>
                setCreateData((prev: ICreateField) => ({
                  ...prev,
                  is_filter: val,
                }))
              }
            />
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              isActive={createData.is_field}
              label={t("settings_fields-is_field")}
              onChange={(val: boolean) =>
                setCreateData((prev: ICreateField) => ({
                  ...prev,
                  is_field: val,
                }))
              }
            />
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              isActive={createData.is_table}
              label={t("settings_fields-is_table")}
              onChange={(val: boolean) =>
                setCreateData((prev: ICreateField) => ({
                  ...prev,
                  is_table: val,
                }))
              }
            />
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              isActive={createData.is_manual_input}
              isDisabled={!createData.fetch}
              label={t("settings_fields-is_manual_input")}
              onChange={(val: boolean) =>
                setCreateData((prev: ICreateField) => ({
                  ...prev,
                  is_manual_input: prev.fetch ? val : false,
                }))
              }
            />
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              isActive={!!createData.is_volunteer}
              isDisabled={false}
              label={t("settings_fields-is_volunteer")}
              onChange={(val: boolean) =>
                setCreateData((prev: ICreateField) => ({
                  ...prev,
                  is_volunteer: val,
                }))
              }
            />
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              isActive={createData.is_excel}
              label={t("settings_fields-is_excel")}
              onChange={(val: boolean) =>
                setCreateData((prev: ICreateField) => ({
                  ...prev,
                  is_excel: val,
                }))
              }
            />
          </CheckboxContainer>
        </CheckboxList>
        <FieldPreviewComponent
          filter={inputPreviewFilter}
          onAddOption={handleAddOption}
        />
      </StyledRow>
      {createData.fetch && (
        <StyledCreateable
          options={[]}
          value={
            createData.options
              ? createData.options?.map((option) => ({
                label: option[0],
                value: option[1],
              }))
              : []
          }
          onChange={handleChangeOptions}
          placeholder="Dropdown Options"
          label="Dropdown Options"
        />
      )}
      <StyledBtn
        onClick={() => onCreateField(createData)}
        disabled={isCreatingField}
        data-action={activityList["settings-create-field"]}
      >
        {t("settings_fields-create_btn")}
      </StyledBtn>
    </Modal>
  );
});

export default CreateFieldComponent;
