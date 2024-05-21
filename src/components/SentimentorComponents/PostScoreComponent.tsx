import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ITrendingPost } from "../../store/sentimentor";
import { Modal } from "../../UI/Modal";
import { desktopBp } from "../../styles/variables";
import { useTranslation } from "react-i18next";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { Sentimentor } from "../../api/sentimentor";
import { Loader } from "../../UI/Spinners";
import { useAppActions } from "../../store/app";
import { activityList } from "../../config/userActivityList";

const StyledModal = styled(Modal)`
  > div {
    min-width: 23.44vw;
    @media screen and (max-width: ${desktopBp}) {
      min-width: 294px;
    }
  }
`;

const StyledTitle = styled.p`
  font-size: 1.35vw;
  text-align: center;
  font-weight: 600;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 17px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 2.76vw;
  margin-bottom: 3.49vw;
  gap: 6.51vw;
  @media screen and (max-width: ${desktopBp}) {
    padding-top: 35px;
    margin-bottom: 44px;
    gap: 82px;
  }
`;

const StyledBox = styled.div`
  text-align: center;
`;

const StyledLine = styled.div`
  width: 1px;
  align-self: stretch;
  justify-self: stretch;
  background-color: #000;
  height: 120px;
`

const StyledLabel = styled.p`
  font-size: 0.94vw;
  margin: 0 0 0.52vw;
  font-weight: 600;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    margin-bottom: 7px;
  }
`;

const StyledValue = styled.p`
  margin: 1.15vw 0 0;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 14px;
  }
`;

const StyledInput = styled.input`
  width: 99px;
  border-radius: 5px;
  background: #fff;
  text-align: center;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border: 0;
  font-size: 32px;
  line-height: 39px;
  padding: 3px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 45px;
`;

const StyledBtn = styled.button`
  font-size: 18px;
  font-weight: 700;
  padding: 3px 5px;
  border-radius: 50px;
  border: 1px solid #000;
  background-color: #fff;
  cursor: pointer;
`;

interface IProps {
  post: ITrendingPost;
  show: boolean;
  onClose: () => void;
  onUpdateScore: (s: number) => void
}

const PostScoreComponent = React.memo(({ post, show, onClose, onUpdateScore }: IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { onShowAlert } = useAppActions();
  const [score, setScore] = useState<string>("0");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const onChange = (val: string) => {
    if (Number(val) < 0) {
      setScore("0");
      return;
    }
    if (Number(val) > 10) {
      setScore("10");
      return;
    }
    setScore(val);
  };

  const handleEditScore = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        Sentimentor.editPostScore(token, post.table, post.id, score)
      );
      setIsFetching(false);
      if (!dataErr) {
        onShowAlert(true, t("ranking_pub-score_mes"))
        onUpdateScore(Number(score))
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error)
      }
      onClose()
    }
  }, [token, post.id, post.table, score, t, onClose]);


  useEffect(() => {
    setScore(String(post.score))
  }, [post.score])

  return (
    <StyledModal show={show} onClose={onClose} stopBubbling={true}>
      <StyledTitle>{t("ranking_pub-evaluation")}</StyledTitle>
      <StyledContainer>
        <StyledBox>
          <StyledLabel>{t("ranking_pub-score")}</StyledLabel>
          <StyledValue>{post.score}</StyledValue>
        </StyledBox>
        <StyledLine />
        <StyledBox>
          <StyledLabel>{t("ranking_pub-manually")}</StyledLabel>
          <StyledInput
            type="number"
            value={score}
            onChange={(e: any) => onChange(e.target.value)}
          />
        </StyledBox>
      </StyledContainer>
      <ButtonBox>
        {isFetching ? (
          <Loader />
        ) : (
          <StyledBtn onClick={handleEditScore} data-action={activityList["edit-post-score"]}>
          {t("ranking_pub-submit")}
        </StyledBtn>
        )}
      </ButtonBox>
    </StyledModal>
  );
});

export default PostScoreComponent;
