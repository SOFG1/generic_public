import React, { useCallback, useMemo, useState } from "react";
import { ITrendingPost } from "../../store/sentimentor";
import { useUserActions, useUserState } from "../../store/user";
import { useAppActions } from "../../store/app";
import { handle } from "../../api";
import { Sentimentor } from "../../api/sentimentor";
import { desktopBp } from "../../styles/variables";
import styled from "styled-components";
import { TrashIcon } from "../../UI/Svg";
import { Loader } from "../../UI/Spinners";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { activityList } from "../../config/userActivityList";
import { createActivity } from "../../utils/createActivity";

const DeleteBtn = styled.div`
  position: relative;
  border-radius: 50%;
  flex-shrink: 0;
  font-size: 1.15vw;
  line-height: 0.5;
  font-weight: 800;
  width: 1.82vw;
  height: 1.82vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 1px solid #000;
  transition: 300ms linear;
  cursor: pointer;
  &:hover div {
    visibility: visible;
  }
  svg {
    height: 1.04vw;
    width: 1.04vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    width: 23px;
    height: 23px;
    font-size: 14px;
    svg {
      height: 13px;
      width: 13px;
    }
  }
`;

const StyledPopup = styled.div`
  visibility: hidden;
  position: absolute;
  inset-inline-end: 0;
  bottom: 100%;
  background-color: #fff;
  box-shadow: 0px 10px 15px #aaa;
  border-radius: 0.78vw;
  border-end-end-radius: 0;
  overflow: hidden;
  z-index: 1;
  @media screen and (max-width: ${desktopBp}) {
    border-radius: 10px;
    border-end-end-radius: 0;
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
  post: ITrendingPost;
  onRemovePost: () => void
  onResetPosts: () => void
}

const DeletePostComponent = React.memo(({ post, onRemovePost, onResetPosts }: IProps) => {
  const { t } = useTranslation();
  const { token, userInfo } = useUserState();
  const { onShowAlert } = useAppActions();
  const { onSendActivity } = useUserActions()
  const { pathname } = useLocation()
  const [isFetching, setIsFetching] = useState<boolean>(false);



  const is409Group = useMemo(() => {
    return userInfo?.group.id === 409
  }, [userInfo?.group.id])

  const handleDeletePost = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log(123)
      const activity = createActivity(pathname, activityList["delete-post"])
      onSendActivity(activity)
      e.preventDefault(); //Prevent link click
      e.stopPropagation(); //Prevent link click
      if (token) {
        setIsFetching(true);
        const [dataRes, dataErr] = await handle(
          Sentimentor.deletePost(token, post.table, post.id)
        );
        setIsFetching(false);
        if (dataErr) {
          onShowAlert(false, dataErr.error);
        }
        if (!dataErr) {
          onRemovePost()
          onShowAlert(true, t("ranking_pub-del_success"));
        }
      }
    },
    [post, token, t, pathname, is409Group]
  );

  const handleDeleteAuthor = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const activity = createActivity(pathname, activityList["delete-post-author"])
      onSendActivity(activity)
      e.preventDefault(); //Prevent link click
      e.stopPropagation(); //Prevent link click
      if (token) {
        setIsFetching(true);
        const [dataRes, dataErr] = await handle(
          Sentimentor.deletePostAuthor(token, post.table, post.id)
        );
        setIsFetching(false);
        if (dataErr) {
          onShowAlert(false, dataErr.error);
        }
        if (!dataErr) {
          onResetPosts();
          onShowAlert(true, t("ranking_pub-del_success"));
        }
      }
    },
    [post, token, t, pathname, is409Group]
  );

  if (isFetching) return <Loader />;

  return (
    <DeleteBtn>
      <StyledPopup>
        <StyledBtn onClick={handleDeleteAuthor}>
          {t("ranking_pub-del_author")}
        </StyledBtn>
        <StyledBtn onClick={handleDeletePost}>
          {t("ranking_pub-del_post")}
        </StyledBtn>
      </StyledPopup>
      <TrashIcon />
    </DeleteBtn>
  );
});

export default DeletePostComponent;
