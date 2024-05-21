import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { handle } from "../../api";
import { Sentimentor } from "../../api/sentimentor";
import { IEditInstitution, Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import { sentimentorKeywordsSelector } from "../../store/sentimentor/selectors";
import {
  IInstitution,
  useSettingsActions,
  useSettingsState,
} from "../../store/settings";
import { useUserState } from "../../store/user";
import { usePermissions } from "../../store/user/hooks";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Dropdown } from "../../UI/Dropdown";
import { Checkbox, Input } from "../../UI/Input";
import { CheckedIcon, ChevronLeftIcon, ChevronRightIcon, EditIcon, FalseIcon } from "../../UI/Svg";
import { ConfirmDeleteFull } from "../common/ConfirmDeleteFull";
import InstitutionKeyword from "./InstitutionKeyword";
import { colorsChart } from "../../config";
import { activityList } from "../../config/userActivityList";
import { createPortal } from "react-dom";
import { useSentimentorActions } from "../../store/sentimentor";
import { useRelationsActions } from "../../store/relations";
import KeywordsDropdownComponent from "./KeywordsDropdownComponent";



const StyledHeader = styled.div<{ opened: boolean }>`
  display: flex;
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

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  width: 20%;
  padding-inline-end: 32px;
  box-sizing: border-box;
  &:first-child {
    width: 45%;
  }
`

const StyledContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`

const StyledColor = styled.div<{ color: string }>`
  border-radius: 100px;
  border: 1px solid #000;
  background: ${({ color }) => color};
  height: 17px;
  flex-grow: 1;
`

const StyledWrapper = styled.div`
  margin-bottom: 2.60vw;
  @media screen and (max-wdith: ${desktopBp}) {
    margin-bottom: 33px;
  }
`;


const StyledTitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  text-align: start;
  svg {
    height: 17px;
    width: 17px;
  }
  svg path {
    stroke-width: 1;
  }
`

const InputWrapper = styled.div`
  flex-grow: 1;
`

const StyledInput = styled(Input)``;

const StyledCheckbox = styled(Checkbox)`
  p {
    white-space: nowrap;
  }
`;

const StyledDropdown = styled(Dropdown)``;


const EditBtn = styled.button`
  height: 20px;
  width: 20px;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-inline-start: -27px;
  padding: 0;
  svg {
    margin: 0;
    height: 10px;
    width: 10px;
  }
`


const StyledBtn = styled(Button)`
  width: fit-content;
  min-width: 7.03vw;
  border-radius: 100px;
  margin-top: auto;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 88px;
  }
`;

const StyledSubtitle = styled.p`
  font-size: 0.94vw;
  line-height: 1.2vw;
  font-weight: 600;
  margin: 0 0 1.09vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
    margin-bottom: 14px;
  }
`;

const KeywordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.63vw 0.94vw;
  margin-bottom: 10px;
  @media screen and (max-width: ${desktopBp}) {
    gap: 8px 12px;
  }
`;

const ColorOption = styled.div<{ color: string }>`
  padding: 4px;
  min-width: 5.21vw;
  border: 1px solid #000;
  width: 100%;
  display: flex;
  height: 1.04vw;
  box-sizing: border-box;
  background-color: ${({ color }) => color};
  @media screen and (max-width: ${desktopBp}) {
    min-width: 65px;
    height: 13px;
  }
`;

interface IProps {
  institution: IInstitution;
}

type ConfirmDelete = "with_keywords" | "without_keywords" | null;

const EditInsitutionComponent = React.memo(({ institution }: IProps) => {
  const { t, i18n } = useTranslation();
  const { token, userInfo } = useUserState();
  const keywords = useSelector(sentimentorKeywordsSelector);
  const { onShowAlert } = useAppActions();
  const { onGetInstitutions } = useSettingsActions();
  const { onGetKeywords: getSentimentorKeywords } = useSentimentorActions();
  const { onGetKeywords: getRelationsKeywords } = useRelationsActions();
  const [opened, setOpened] = useState<boolean>(false)
  const [instName, setInstName] = useState<string>("");
  const [newKeywordId, setNewKeywordId] = useState<string>("");
  const [isMain, setIsMain] = useState<boolean>(false);
  const [color, setColor] = useState<string | null>(null);
  const permissions = usePermissions("Ranking");
  const connectionsPermission = usePermissions("connections")?.Read
  const [showConfirmDelete, setShowConfirmDelete] =
    useState<ConfirmDelete>(null);

  const keywordsOptions = useMemo(() => {
    return (
      keywords
        .map((k) => ({ item: k.word, value: k.id }))
    );
  }, [keywords]);


  const colorOptions: Array<{
    item: string | JSX.Element;
    value: string | number;
  }> = useMemo(() => {
    const opts = colorsChart.map((color) => {
      return {
        item: <ColorOption color={color} />,
        value: color,
      };
    });
    return [{ item: t("settings_institutions-color"), value: "" }, ...opts];
  }, [t]);


  const isGroup409 = useMemo(() => {
    return userInfo?.group.id === 409
  }, [userInfo?.group.id])

  const handleEdit = useCallback(async (color: string | null) => {
    if (token) {
      const params: IEditInstitution = {
        inst_name: instName,
        is_main: isMain,
        color
      };
      if (color) {
        params.color = color;
      }
      const [dataRes, dataErr]: any = await handle(
        Settings.editInstitution(token, institution.inst_code, params)
      );
      if (dataRes) {
        onShowAlert(true, "Successfully changed");
        onGetInstitutions();
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token, institution, instName, isMain, color]);

  const onBindKeyword = useCallback(
    async (keywordId: string | number) => {
      if (token) {
        //Previous keywords of this institution
        const [dataRes, dataErr]: any = await handle(
          Settings.bindInstitutionKeyword(token, institution.inst_code, Number(keywordId))
        );
        if (!dataErr) {
          onShowAlert(true, "Successfully added");
          onGetInstitutions();
        }
        if (dataErr) {
          onShowAlert(false, dataErr.error);
        }
      }
    },
    [token, institution]
  );

  const handleAddKeyword = useCallback(
    async (keyword: string, parsing_style:string) => {
      const trimmed = keyword.trim();
      if (!permissions["add_keyword"]) {
        onShowAlert(false, "You dont have access for add keyword!");
        return;
      }
      if (trimmed === "") {
        onShowAlert(false, "Keyword field is empty");
      }
      if (keywords.some((k) => k.word === trimmed)) {
        onShowAlert(false, "You've already added this keyword!");
        return;
      }
      if (token) {
        const [addKeywordRes, addKeywordErr]: any = await handle(
          Settings.addInstitutionKeyword(token, institution.inst_code, keyword, parsing_style)
        );
        if (addKeywordRes) {
          getSentimentorKeywords()
          onGetInstitutions();
          onShowAlert(true, "Successfully added");
        }
        if (addKeywordErr) {
          onShowAlert(false, addKeywordErr.error);
        }
      }
    },
    [token, permissions, keywords, institution.inst_code, getSentimentorKeywords, onGetInstitutions]
  );

  const onDeleteInstitution = useCallback(async () => {
    if (token) {
      const withKeywords = showConfirmDelete === "with_keywords";
      const [dataRes, dataErr]: any = await handle(
        Settings.deleteInstitution(token, institution.inst_code, withKeywords)
      );
      if (!dataErr) {
        onShowAlert(true, "Successfully deleted");
        onGetInstitutions();
        setInstName("");
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
      //Update keywords after deleting with keywords
      if (withKeywords) {
        getSentimentorKeywords();
        getRelationsKeywords();
      }
    }
  }, [token, institution, showConfirmDelete]);

  const onUnbindKeyword = useCallback(
    async (keywordId: number) => {
      if (token) {
        const [dataRes, dataErr] = await handle(
          Settings.deleteInstitutionKeyword(token, institution.inst_code, keywordId)
        );
        if (!dataErr) {
          onShowAlert(true, "Successfully deleted");
          onGetInstitutions();
        }
        if (dataErr) {
          onShowAlert(false, dataErr.error);
        }
      }
    },
    [token, institution]
  );

  useEffect(() => {
    setInstName(institution.inst_name);
    setIsMain(institution.is_main);
    setColor(institution.color);
  }, [institution]);


  const handleSetColor = useCallback((color: string | null) => {
    setColor(color)
    setTimeout(() => handleEdit(color), 400) // Save when color changes
  }, [handleEdit])

  return (
    <>
      {createPortal(
        <ConfirmDeleteFull
          stopBubbling={true}
          show={!!showConfirmDelete}
          title={t("settings_institutions-warning")}
          onClose={() => setShowConfirmDelete(null)}
          onDelete={onDeleteInstitution}
        />,
        document.querySelector(".App") as Element
      )}
      <StyledHeader onClick={() => setOpened(p => !p)} opened={opened}>
        <StyledBox>
          {opened ? (
            <InputWrapper onClick={(e) => e.stopPropagation()}>
              <StyledInput
                type="text"
                name="name"
                label={isGroup409 ? t("settings_institutions-label2(409)") : t("settings_institutions-label2")}
                value={instName}
                onChange={setInstName}
              />
            </InputWrapper>
          ) : (
            <>
              <EditBtn><EditIcon /></EditBtn>
              <StyledTitle>{institution.inst_name}</StyledTitle>
            </>
          )}
        </StyledBox>
        {connectionsPermission && <>
          <StyledBox onClick={(e) => { if (opened) e.stopPropagation() }}>
            {opened ? (
              <StyledCheckbox
                label={""}
                isActive={isMain}
                onChange={setIsMain}
              />
            ) : (
              <>
                <EditBtn><EditIcon /></EditBtn>
                <StyledTitle>{institution.is_main ? <CheckedIcon /> : <FalseIcon />}</StyledTitle>
              </>
            )}
          </StyledBox>
        </>}

        <StyledBox onClick={(e) => { if (opened) e.stopPropagation() }}>
          {opened ? (
            <StyledDropdown
              value={color || ""}
              placeholder={t("settings_institutions-color-l")}
              onSelect={handleSetColor}
              options={colorOptions}
              label={t("settings_institutions-color-l")}
              isCustomColor={true}
            />
          ) : (
            <>
              <EditBtn><EditIcon /></EditBtn>
              <StyledColor color={institution.color || ""} />
            </>
          )}
        </StyledBox>
        {i18n.dir() ? < ChevronRightIcon /> : <ChevronLeftIcon />}
      </StyledHeader>
      {opened && (
        <StyledWrapper>
          <StyledButtons>
            <StyledBtn
              disabled={!instName}
              onClick={() => handleEdit(color)}
              data-action={activityList["edit-segment"]}
            >{isGroup409 ? t("settings_institutions-btn(409)") : t("settings_institutions-btn")}</StyledBtn>
            <StyledBtn
              title="Delete segment and it's keywords"
              onClick={() => setShowConfirmDelete("with_keywords")}
              data-action={activityList["delete-segment"]}
            >{t("settings_institutions-del_keywords")}</StyledBtn>
            <StyledBtn
              title="Delete segment without keywords"
              onClick={() => setShowConfirmDelete("without_keywords")}
              data-action={activityList["delete-segment-with_keywords"]}
            >{t("settings_institutions-del_only")}</StyledBtn>
          </StyledButtons>
          <StyledSubtitle>{isGroup409 ? t("settings_institutions-keywords(409)") : t("settings_institutions-keywords")}</StyledSubtitle>
          <KeywordsList>
            {institution.keywords.map((k) => {
              return (
                <InstitutionKeyword
                  onUnbind={onUnbindKeyword}
                  keyword={k}
                  key={k.id}
                />
              );
            })}
          </KeywordsList>
          <StyledContainer>
            <KeywordsDropdownComponent
              value={newKeywordId}
              onSelect={setNewKeywordId}
              options={keywordsOptions}
              onAddOption={(v, parsing_style) => handleAddKeyword(v, parsing_style)}
            />
            <StyledBtn
              data-action={activityList["bind-segment-keyword"]}
              disabled={!newKeywordId}
              onClick={() => onBindKeyword(newKeywordId)}
            >
              {t("settings_institutions-add_keyword")}
            </StyledBtn>
          </StyledContainer>
        </StyledWrapper>
      )}
    </>
  );
});

export default EditInsitutionComponent;
