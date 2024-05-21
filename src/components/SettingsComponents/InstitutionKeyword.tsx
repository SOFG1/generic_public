import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { NoIcon, TrashIcon, UnbindKeywordIcon } from "../../UI/Svg";
import { ConfirmDeleteFull } from "../common/ConfirmDeleteFull";
import { activityList } from "../../config/userActivityList";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import {
  relationsKeywordsSelector,
  useRelationsActions,
} from "../../store/relations";
import { sentimentorKeywordsSelector } from "../../store/sentimentor/selectors";
import { useSentimentorActions } from "../../store/sentimentor";
import { HoverPopup } from "../../UI/HoverPopup";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { Sentimentor } from "../../api/sentimentor";
import { useAppActions } from "../../store/app";

const StyledKeyword = styled.div`
  font-size: 0.94vw;
  display: flex;
  align-items: center;
  gap: 0.47vw;
  padding: 5px;
  padding-inline-start: 0.52vw;
  border: 1px solid #000;
  border-radius: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    gap: 6px;
    padding-inline-start: 7px;
    border-radius: 13px;
  }
`;

const KeywordDelBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.56vw;
  width: 1.56vw;
  border-radius: 50%;
  border: 1px solid #000;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  svg {
    height: 80%;
    width: 80%;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 20px;
    width: 20px;
  }
`;

interface IProps {
  keyword: { word: string; id: number };
  onUnbind: (id: number) => void;
}

const InstitutionKeyword = React.memo(({ keyword, onUnbind }: IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState()
  const relationsKeywords = useSelector(relationsKeywordsSelector);
  const sentimentorKeywords = useSelector(sentimentorKeywordsSelector);
  const { onGetKeywords: getSentimentorKeywords } = useSentimentorActions()
  const { onDeleteKeyword: deleteRelationsKeyword } = useRelationsActions();
  const { onShowAlert } = useAppActions()
  const [showConfirmUnbind, setShowConfirmUnbind] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);


  const onDeleteSentimentorKeyword = useCallback(async (id: number) => {
    if (token) {
      const [dataRes, dataErr] = await handle(Sentimentor.deleteKeyword(token, id))
      if (!dataErr) {
        onUnbind(id)
        getSentimentorKeywords();
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error)
      }
    }

  }, [token])

  const handleDelete = useCallback(() => {
    const isSentimentor = sentimentorKeywords?.find((k) => k.word === keyword.word);
    if (isSentimentor) onDeleteSentimentorKeyword(isSentimentor.id);
    const isRelations = relationsKeywords?.find((k) => k.word === keyword.word);
    if (isRelations) deleteRelationsKeyword(isRelations.id);
  }, [keyword, relationsKeywords, sentimentorKeywords]);

  return (
    <>
      {createPortal(
        <ConfirmDeleteFull
          stopBubbling={true}
          title={t("settings_institutions-keyword_warn")}
          onDelete={() => onUnbind(keyword.id)}
          show={showConfirmUnbind}
          onClose={() => setShowConfirmUnbind(false)}
        />,
        document.querySelector(".App") as Element
      )}
      {createPortal(
        <ConfirmDeleteFull
          stopBubbling={true}
          title={t("settings_institutions-keyword_warn")}
          onDelete={handleDelete}
          show={showConfirmDelete}
          onClose={() => setShowConfirmDelete(false)}
        />,
        document.querySelector(".App") as Element
      )}
      <StyledKeyword>
        {keyword.word}
        <KeywordDelBtn
          onClick={() => setShowConfirmUnbind(true)}
          data-action={activityList["unbind-segment-keyword"]}
        >
          <HoverPopup>{t("settings_institutions-keyword_unbind")}</HoverPopup>
          <UnbindKeywordIcon />
        </KeywordDelBtn>
        <KeywordDelBtn
          onClick={() => setShowConfirmDelete(true)}
          data-action={activityList["delete-segment-keyword"]}
        >
          <HoverPopup>{t("settings_institutions-keyword_del")}</HoverPopup>
          <TrashIcon />
        </KeywordDelBtn>
      </StyledKeyword>
    </>
  );
});

export default InstitutionKeyword;
