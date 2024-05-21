import styled from "styled-components";
import {Title} from "../common/Title";
import {desktopBp} from "../../styles/variables";
import {DropdownFetch} from "../../UI/Dropdown";
import {Button, EButtonVariants} from "../../UI/Button";
import {ITableColumn, useRawDataActions, useRawDataState} from "../../store/rawData";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useUserState} from "../../store/user";
import {useAppActions} from "../../store/app";
import {convertRowData} from "../../utils/convertRowData";
import {handle} from "../../api";
import {RawData} from "../../api/rawData";
import {Modal} from "../../UI/Modal";
import {FieldInput} from "../common/FieldInput";
import {TrashIcon} from "../../UI/Svg";
import {activityList} from "../../config/userActivityList";
import Close from "../../UI/Svg/icons/Close";
import {SecondaryButton} from "../../UI/SecondaryButton";

const CreateFieldsStyled = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 10px;
  overflow: auto;
  max-height: 60vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.color.lightGrey};
  margin-bottom: 20px;
`

const InstitutionTitle = styled(Title)`
  margin-top: 0;
  width: 100%;
  text-align: left;
  font-size: ${props => props.theme.fontSize.headerSecondary.vw};
  @media(max-width: ${desktopBp}){
    font-size: ${props => props.theme.fontSize.headerSecondary.px};
  }
`;

const StyledBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
  }
`;

const StyledDropdown = styled(DropdownFetch)`
  max-width: 200px;
`;

const DeleteBtn = styled.button`
  border-radius: 13px;
  flex-shrink: 0;
  width: 15px;
  height: 15px;
  padding: 3px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.6;
  }
  svg{
    width: 0.80vw;
    height: 0.80vw;
    
    @media(max-width: ${desktopBp}){
      width: 10px;
      height: 10px;
    }
  }
`;

const TitleCard = styled(Title)`
  margin-top: 0;
  width: 100%;
  text-align: left;
  font-size: ${props => props.theme.fontSize.headerSecondary.vw};
  @media(max-width: ${desktopBp}){
    font-size: ${props => props.theme.fontSize.headerSecondary.px};
  }
`;

const Fields = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-content: center;
  align-items: flex-end;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.52vw 1.04vw;

  & > div {
    width: 45.60vw;
  }

  @media screen and (max-width: ${desktopBp}) {
    gap: 7px 13px;

    & > div {
      width: 570px;
    }
  }

  @media screen and (max-width: 500px) {
    gap: 20px;
  }
  @media screen and (max-width: 440px) {
    flex: column;
    align-items: center;
    & > div {
      width: 90%;
    }
  }
`;

const StyledAddBtn = styled(SecondaryButton)`
  width: 6.67vw;
  height: 3.40vw;
  margin-bottom: 0.78vw;
  font-size: ${props => props.theme.fontSize.primary.vw};
  @media screen and(max-width: ${desktopBp}) {
    margin-bottom: 10px;
    width: 83px;
    height: 43px;
    font-size: ${props => props.theme.fontSize.primary.px};
  }
`;

const StyledSaveBtn = styled(SecondaryButton)`
  margin: 0 auto;
  height: 3.40vw;
  margin-left: 3.40vw;
  width: 6.67vw;
  font-size: ${props => props.theme.fontSize.primary.vw};
  @media screen and(max-width: ${desktopBp}) {
    height: 43px;
    font-size: ${props => props.theme.fontSize.primary.px};
    margin-left: 43px;
    width: 83px;
  }
`;

const StyledModal = styled(Modal)`
    .js-modal-content{
        padding: 0 10px;
      overflow: hidden;
    }
`

const CloseContainer = styled.div`
  cursor: pointer;
`

interface IProps {
  initialData: ITableColumn | null;
  onClose: () => void;
}

const AddRowModal = React.memo(({ initialData, onClose }: IProps) => {
  const { t } = useTranslation();
  const { token, userInfo } = useUserState();
  const { filters, fields } = useRawDataState();
  const { onGetTable } = useRawDataActions();
  const { onShowAlert } = useAppActions();
  const [dataFields, setDataFields] = useState<{ [key: string]: any }>({});

  const mode: "edit" | "create" = useMemo(() => {
    //If initial data has no id that means we are creating a new row
    return initialData?.id ? "edit" : "create";
  }, [initialData?.id]);

  //Set initial data
  useEffect(() => {
    const newData: { [key: string]: any } = {};
    for (const field of fields) {
      let val: any = initialData ? initialData[field.slug] : "";
      if (field.type === "timestamp") {
        val = val ? new Date(val.split(".").reverse().join("-")) : null;
      }
      if (field.slug === "job") continue;
      newData[field.slug] = val;
    }
    setDataFields(newData);
  }, [initialData, fields]);

  const onChangeHandler = useCallback((key: string, val: any) => {
    setDataFields((prevState) => {
      return {
        ...prevState,
        [key]: val,
      };
    });
  }, []);

  const onSave = useCallback(async () => {
    if (token) {
      const formData = convertRowData(initialData as Object, dataFields);
      if (mode === "create") {
        const [dataRes, dataErr]: any = await handle(
            RawData.create(formData, token)
        );
        if (dataRes !== undefined) {
          onShowAlert(true, "Note was created successfully");
          onClose();
        }
        if (dataErr) {
          onShowAlert(false, dataErr?.error || "Something went wrong!");
        }
      }

      if (mode === "edit") {
        const [dataRes, dataErr]: any = await handle(
            RawData.edit(initialData?.id as string, formData, token)
        );
        if (dataRes !== undefined) {
          onShowAlert(true, "Сhanges were saved successfully");
          onClose();
        }
        if (dataErr) {
          onShowAlert(false, dataErr?.error || "Something went wrong!");
        }
      }
      onGetTable();
    }
  }, [token, initialData, dataFields, mode]);

  const handleSelectInstitution = useCallback(
      (index: number, value: number) => {
        const copy = [...dataFields.institution];
        copy[index] = value;
        setDataFields((p) => ({ ...p, institution: copy }));
      },
      [dataFields]
  );

  const handleAddInstitution = useCallback(() => {
    if (Array.isArray(dataFields?.institution)) {
      setDataFields((p) => ({ ...p, institution: [...p.institution, 0] }));
      return;
    }
    setDataFields((p) => ({ ...p, institution: [0] }));
  }, [dataFields]);

  const handleDeleteInstitution = useCallback(
      (index: number) => {
        const copy = [...dataFields.institution];
        copy.splice(index, 1);
        setDataFields((p) => ({ ...p, institution: copy }));
      },
      [dataFields]
  );

  return (
      <StyledModal isHiddenClose={true} show={!!initialData} onClose={onClose}>
        <Header>
          <TitleCard>{t("raw-data_edit_raw")}</TitleCard>
          <CloseContainer onClick={onClose}>
            <Close/>
          </CloseContainer>

        </Header>
        <CreateFieldsStyled>
          <Fields>
            {fields.map((filter_item, id) => {
              const options =
                  filters.find((f) => f.slug === filter_item.slug)?.options || [];

              //Set date input to single input and integer range to single integer
              let filterType = filter_item.type;
              if (filterType === "int") filterType = "int-single";
              if (filterType === "timestamp") filterType = "date-single";

              if (filter_item.slug === "street") {
                let option;
                if (
                    filter_item.parent !== null &&
                    typeof dataFields[filter_item.parent] !== "string"
                ) {
                  option = dataFields[filter_item.parent];
                } else {
                  option = initialData?.city_code ? initialData.city_code : null;
                }
                return (
                    <FieldInput
                        isForPreview={false}
                        filter={{
                          ...filter_item,
                          type: filter_item.type,
                          name: filter_item.slug,
                          label: filter_item.name + ":",
                          is_multiplier: false,
                          options: options,
                          required: filter_item.required,
                        }}
                        key={`FilterItem-${id}`}
                        dependentOption={option}
                        isDisabled={
                            filter_item.default_disabled &&
                            filter_item.parent !== null &&
                            !dataFields[filter_item.parent]
                        }
                        value={dataFields[filter_item.slug] || ""}
                        onChange={onChangeHandler}
                    />
                );
              }
              if (
                  filter_item.slug === "job" ||
                  filter_item.slug === "institution"
              )
                return null;
              return (
                  <FieldInput
                      isForPreview={false}
                      filter={{
                        ...filter_item,
                        type: filterType,
                        name: filter_item.slug,
                        label: filter_item.name + ":",
                        is_multiplier: false,
                        required: filter_item.required,
                        options: options,
                      }}
                      key={`FilterItem-${id}`}
                      dependentOption={
                        filter_item.parent !== null
                            ? dataFields[filter_item.parent]
                            : null
                      }
                      isDisabled={
                          filter_item.default_disabled &&
                          filter_item.parent !== null &&
                          !dataFields[filter_item.parent]
                      }
                      value={
                        dataFields[filter_item.slug] === undefined
                            ? ""
                            : dataFields[filter_item.slug]
                      }
                      onChange={onChangeHandler}
                  />
              );
            })}
          </Fields>
          <InstitutionTitle>{userInfo?.group.id === 409 ? t("raw-data_institution(409)") : t("raw-data_institution")}</InstitutionTitle>
          {Array.isArray(dataFields.institution) &&
              dataFields?.institution?.map((institution: number, index: number) => {
                return (
                    <StyledBox key={index}>
                      <StyledDropdown
                          isForPreview={false}
                          slug="institution"
                          len_input_prefetch={0}
                          value={institution}
                          placeholder="Keyword grouping"
                          onSelect={(value) => handleSelectInstitution(index, value)}
                          label="Keyword grouping"
                      />
                      <DeleteBtn onClick={() => handleDeleteInstitution(index)}>
                        <TrashIcon />
                      </DeleteBtn>
                    </StyledBox>
                );
              })}

          <StyledAddBtn
              onClick={handleAddInstitution}
              data-action={activityList["rawdata-add-institution"]}
          >
            {t("raw-data_institution-add")}
          </StyledAddBtn>
          <StyledSaveBtn
              data-action={activityList[`rawdata-row-${mode}`]}
              onClick={onSave}
              disabled={false}
          >
            {t("raw-data_save-fields")}
          </StyledSaveBtn>
        </CreateFieldsStyled>
      </StyledModal>
  );
});

export default AddRowModal;
