import React, { useMemo, useCallback, useState } from "react"
import styled from "styled-components"
import { desktopBp } from "../../styles/variables";
import twitterIcon from "../../assets/images/trending-twitter.png";
import facebookIcon from "../../assets/images/trending-facebook.png";
import instaIcon from "../../assets/images/trending-instagram.png";
import youtubeIcon from "../../assets/images/trending-youtube.png";
import tiktokIcon from "../../assets/images/trending-tiktok.png";
import telegramIcon from "../../assets/images/trending-telegram.png";
import { ITrendingPost } from "../../store/sentimentor";
import { createActivity } from "../../utils/createActivity";
import { FlagIcon } from "../../UI/Svg";
import TrendScaleComponent from "./TrendScaleComponent";
import { useLocation } from "react-router-dom";
import { activityList } from "../../config/userActivityList";
import { useUserActions, useUserState } from "../../store/user";
import PostScoreComponent from "./PostScoreComponent";
import HighlightedKeywordsComponent from "./HighlightedKeywordsComponent";
import {useTranslation} from "react-i18next";

const icons = {
  instagram: instaIcon,
  facebook: facebookIcon,
  twitter: twitterIcon,
  youtube: youtubeIcon,
  tiktok: tiktokIcon,
  telegram: telegramIcon,
};



const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.99vw;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 12px;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  max-width: 100%;
  width: 200px;
  flex-grow: 1;
  min-height: 30px;
  @media screen and (max-width: 1700px) {
    width: 150px;
  }
  @media screen and (max-width: 1500px) {
    width: 83px;
  }
`

const StyledScoreBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  padding: 0;
  border-radius: 50%;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  margin-inline-end: 5px;
  svg {
    height: 100%;
    width: 100%;
  }
`;


const IconWrapper = styled.div`
  height: 3.85vw;
  width: 3.85vw;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
  margin-inline-end: 0.94vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 48px;
    width: 48px;
    margin-inline-end: 12px;
  }
`

const StyledSMIcon = styled.img<{ bgColor: string }>`
  height: 100%;
  width: 100%;
  padding: 1.15vw;
  object-fit: contain;
  object-position: center;
  box-sizing: border-box;
  background-color: ${({ bgColor }) => bgColor};
  @media screen and (max-width: ${desktopBp}) {
    padding: 14px;
  }
`;

const StyledName = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.15vw;
  width: 100%;
  margin: 0;
  mark {
    background-color: #FFF35A;
  }
  &:hover {
    word-break: break-all;
    overflow: visible;
    white-space: normal;
    position: absolute;
    top: -5px;
    inset-inline-start: -4px;
    width: 250px;
    background-color: #fff;
    padding: 4px;
    border-radius: 10px;
    z-index: 3;
    border-radius: 10px;
    box-shadow: 0 0 5px #00000067;
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 14px;
  }
`;

const ScoreWrapper = styled.div`
    display: flex;
    align-items: flex-end;
`

const StyledDate = styled.div`
  font-size: 0.94vw;
  display: flex;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
  }
`;
const StyledRetrivalDate = styled(StyledDate)`
  font-size: 0.63vw;
  color: #333;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 8px;
  }
`

interface IProps {
  post: ITrendingPost;
  onSetProcessed: (p: boolean) => void
  onUpdateScore: (s: number) => void
}


const PostHeaderComponent = React.memo(({ post, onSetProcessed, onUpdateScore }: IProps) => {
  const { userInfo } = useUserState()
  const { onSendActivity } = useUserActions();
  const { pathname } = useLocation();
  const [showScore, setShowScore] = useState<boolean>(false);
  const {t} = useTranslation();


  const is409Group = useMemo(() => {
    return userInfo?.group.id === 409
  }, [userInfo?.group.id])


  const iconBgColor = useMemo(() => {
    return post.label === "POSITIVE" ? "#29C3DA" : "#FE5912";
  }, [post.label]);

  const handleScoreClick = useCallback(
    (e: React.MouseEvent) => {
      const activity = createActivity(
        pathname,
        activityList["open-edit-score"]
      );
      if (!is409Group) onSetProcessed(true)
      onSendActivity(activity);
      e.preventDefault();
      e.stopPropagation();
      setShowScore(true);
    },
    [pathname, is409Group]
  );


  return <>
    <PostScoreComponent
      onUpdateScore={onUpdateScore}
      show={showScore}
      post={post}
      onClose={() => setShowScore(false)}
    />
    <StyledHeader>
      <IconWrapper>
        <StyledSMIcon src={icons[post.network]} bgColor={iconBgColor} />
      </IconWrapper>
      <HeaderContainer>
        <StyledName>
          <HighlightedKeywordsComponent text={post.account || ""} keywords={post.keywords || []} />
        </StyledName>
        <StyledDate>{t("ranking_post_date")}: {post.date || t("ranking_unable_to_retrive_date")}</StyledDate>
        <StyledRetrivalDate>{t("ranking_retrival_date")}: {post.date_added_to_db || t("ranking_unable_to_retrive_date")}</StyledRetrivalDate>
      </HeaderContainer>
      <ScoreWrapper>
        <StyledScoreBtn onClick={handleScoreClick}>
          <FlagIcon />
        </StyledScoreBtn>
        <TrendScaleComponent score={post.score} />
      </ScoreWrapper>
    </StyledHeader>
  </>
})


export default PostHeaderComponent
