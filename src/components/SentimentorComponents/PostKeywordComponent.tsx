import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { DeleteIcon } from "../../UI/Svg";
import { useUserActions, useUserState } from "../../store/user";
import { handle } from "../../api";
import { Sentimentor } from "../../api/sentimentor";
import { useAppActions } from "../../store/app";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { createActivity } from "../../utils/createActivity";
import { activityList } from "../../config/userActivityList";
import { useSentimentorActions } from "../../store/sentimentor";

const StyledKeyword = styled.div`
  position: relative;
  max-width: 100%;
  word-break: break-all;
  font-size: 0.83vw;
  line-height: 1.09vw;
  padding: 3px 1.04vw;
  border-radius: 15px;
  border: 1px solid #000;
  background: #fff;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    line-height: 14px;
    padding: 3px 13px;
  }
`;

const DeleteKeywordBtn = styled.div`
  position: absolute;
  top: -3px;
  inset-inline-end: -3px;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  border: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #000;
  &:hover div {
    display: block;
  }
  svg {
    width: 70%;
  }
  svg line {
    //stroke: #fff;
  }
`;

const StyledPopup = styled.div`
  display: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100%;
  background-color: #fff;
  box-shadow: 0px 10px 15px #aaa;
  border-radius: 0.78vw;
  overflow: hidden;
  @media screen and (max-width: ${desktopBp}) {
    border-radius: 10px;
  }
`;

const StyledBtn = styled.button`
  white-space: nowrap;
  width: 100%;
  padding: 1.04vw 1.04vw 0.94vw;
  font-size: 0.94vw;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  &:first-child {
    border-bottom: 2px solid #aaa;
  }
  &:hover {
    color: #fff;
    background-color: #000;
  }
  @media screen and (max-width: ${desktopBp}) {
    padding: 13px 13px 12px;
    font-size: 12px;
  }
`;

interface IProps {
  postId: string;
  onSetProcessed: (p: boolean) => void
  keyword: {
    word: string;
    id: number;
  };
}

const PostKeywordComponent = React.memo(({ postId, keyword, onSetProcessed }: IProps) => {
  const { t } = useTranslation();
  const { token, userInfo } = useUserState();
  const { onGetKeywords } = useSentimentorActions()
  const { onShowAlert } = useAppActions();
  const { onSendActivity } = useUserActions()
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { pathname } = useLocation();

  
  const is409Group = useMemo(() => {
    return userInfo?.group.id === 409
  }, [userInfo?.group.id])

  const handleDeclineKeyword = useCallback(
    async (e: React.MouseEvent) => {
      const activity = createActivity(pathname, activityList["decline-keyword"])
      onSendActivity(activity)
      e.preventDefault();
      e.stopPropagation();
      if (!is409Group) onSetProcessed(true)
      if (token) {
        setIsFetching(true);
        const [dataRes, dataErr] = await handle(
          Sentimentor.declineKeyword(token, postId, keyword.id)
        );
        if (!dataErr) {
          onShowAlert(true, t("ranking_pub-req_received"));
        }
        if (dataErr) {
          onShowAlert(false, dataErr.error);
          console.log(dataErr);
        }
        setIsFetching(false);
      }
    },
    [token, postId, keyword.id, t, pathname, is409Group]
  );

  const handleDeleteKeyword = useCallback(
    async (e: React.MouseEvent) => {
      const activity = createActivity(pathname, activityList["delete-post-keyword"])
      onSendActivity(activity)
      e.preventDefault();
      e.stopPropagation();
      if (!is409Group) onSetProcessed(true)
      if (token) {
        setIsFetching(true);
        const [dataRes, dataErr] = await handle(
          Sentimentor.deleteKeyword(token, keyword.id)
        );
        if (!dataErr) {
          onGetKeywords()
          onShowAlert(true, t("ranking_pub-req_received"));
        }
        if (dataErr) {
          onShowAlert(false, dataErr.error);
          console.log(dataErr);
        }
        setIsFetching(false);
      }
    },
    [token, keyword.id, t, pathname, is409Group]
  );

  return (
    <StyledKeyword>
      {!isFetching && (
        <DeleteKeywordBtn>
          <StyledPopup>
            <StyledBtn onClick={handleDeclineKeyword}>
              {t("ranking_pub-not_post")}
            </StyledBtn>
            <StyledBtn onClick={handleDeleteKeyword}>
              {t("ranking_pub-del_word")}
            </StyledBtn>
          </StyledPopup>
          <DeleteIcon />
        </DeleteKeywordBtn>
      )}
      {keyword.word}
    </StyledKeyword>
  );
});

export default PostKeywordComponent;