import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { Card, card_size } from "../common/Card";
import { colors } from "../../styles/colors";
import { useSMStatsActions, useSMStatsState } from "../../store/smStats";
import { Text } from "../common/Text";
import LinkIcon from "../../assets/images/Link.png";
import ClickIcon from "../../assets/images/Click.png";
import PlayIcon from "../../assets/images/Play.png";
import { useTranslation } from "react-i18next";
import { Loader } from "../../UI/Spinners";
import SmDataComponent from "./SmDataComponent";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { desktopBp } from "../../styles/variables";
import { activityList } from "../../config/userActivityList";
import { PaidIcon } from "../../UI/Svg";
import { HoverPopup } from "../../UI/HoverPopup";

const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 24.01vw;
  min-width: 24.01vw;
  margin-bottom: 0;
  @media screen and (max-width: ${desktopBp}) {
    width: 301px;
  }
  @media screen and (max-width: 1050px) {
    width: 450px;
  }
  @media screen and (max-width: 640px) {
    width: 100%;
  }
`;

const Preview = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  overflow: hidden;
  height: 24.69vw;
  iframe {
    width: 100%;
    height: 97%;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 310px;
  }
`;

const PreviewLink = styled.div`
  position: absolute;
  top: 0.52vw;
  inset-inline-start: 0.52vw;
  height: 1.04vw;
  z-index: 1;
  a {
    font-weight: 700;
    background-color: #fff;
    padding: 2px 5px;
    border-radius: 10px;
    text-decoration: none;
    margin: 0 10px;
    color: #000;
    transition: 200ms linear;
    box-shadow: 2px 2px 5px ${colors.graphite_4};
  }
  a:hover {
    opacity: 0.75;
  }
  @media screen and (max-width: ${desktopBp}) {
    top: 7px;
    inset-inline-start: 7px;
    height: 13px;
  }
`;

const PostInfo = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
`;

const StyledContent = styled.div`
  overflow: auto;
  width: 100%;
  padding-top: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.56vw;
  padding: 1.56vw 1.09vw 0.73vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 20px 14px 9px;
    gap: 20px;
  }
`;

const StyledLine = styled.div`
  border-top: 1px solid #c0c0c0;
`;

const PaidBadge = styled.span<{ notPaid?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.04vw;
  padding: 2px;
  padding-inline-start: 10px;
  border-radius: 20px;
  border: 1px solid #000;
  font-size: 0.89vw;
  line-height: 1;
  flex-shrink: 0;
  margin-inline-start: auto;
  ${({ notPaid }) =>
    notPaid && "opacity: 0.6;"}
    svg {
      height: 24px;
      width: 24px;
    }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    gap: 13px;
  }
`;

const StatsItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  margin: 4px 4px 0;
  position: relative;
  cursor: pointer;
`;

const StyledPostTitle = styled.h2`
  width: 100%;
  font-weight: 700;
  font-size: 0.94vw;
  line-height: 1.2vw;
  color: #000000;
  margin-bottom: 0.89vw;
  max-height: 5.21vw;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
    margin-bottom: 11px;
    max-height: 65px;
  }
`;

const StatsIcon = styled.div`
  margin-bottom: 0.26vw;
  img {
    height: 1.46vw;
    width: 1.46vw;
    object-fit: contain;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 3px;
    img {
      height: 18px;
      width: 18px;
    }
  }
`;

const StatsValue = styled(Text)`
  font-style: normal;
  color: #000;
  font-weight: 700;
  font-size: 0.83vw;
  line-height: 1.04vw;
  margin-bottom: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    line-height: 13px;
  }
`;

const StyledLoader = styled(Loader)`
  height: 7.81vw;
  width: 7.81vw;
  margin: 0 auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 98px;
    width: 98px;
  }
`;

const StyledNoContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingText = styled.p`
  font-size: 1.04vw;
  line-height: 1.25vw;
  font-weight: normal;
  color: ${colors.graphite_6};
  @media screen and (max-width: ${desktopBp}) {
    font-size: 13px;
    line-height: 16px;
  }
`;

const PostPreviewComponent = React.memo(() => {
  const { t } = useTranslation();
  const { postList, previewPost, isFetchingStats } = useSMStatsState();
  const { onSelectPreviewPost } = useSMStatsActions();

  const html = useMemo(() => {
    if (!previewPost?.html) {
      return (
        <StyledContent className="content">
          <p style={{ textAlign: "center" }}>No Content</p>
        </StyledContent>
      );
    }
    return previewPost ? (
      <StyledContent
        className="content"
        dangerouslySetInnerHTML={{ __html: previewPost.html }}
      ></StyledContent>
    ) : null;
  }, [previewPost?.html]);


  const isPostPaid = useMemo(() => {
    return previewPost?.is_inline_created;
  }, [previewPost]);

  //Set last post selected initially
  useEffect(() => {
    if (postList[0]) onSelectPreviewPost(postList[0].post_id);
  }, [postList]);

  return (
    <CardStyled size={card_size.sm}>
      {/* {!isFetchingStats && (
        <Dropdown
          isSmall={true}
          value={selectedPreviewPost}
          placeholder={t("stats_preview-select")}
          onSelect={onSelectPost}
          options={posts}
          label={t("stats_preview-select")}
        />
      )} */}
      {previewPost && (
        <>
          <Preview>
            {
              <PreviewLink>
                <a
                  data-action={activityList["post-preview-link"]}
                  rel={"noreferrer"}
                  target={"_blank"}
                  href={previewPost.attachment_url}
                >
                  {t("stats_link-to-post")}
                </a>
              </PreviewLink>
            }
            {html}
          </Preview>
          <PostInfo>
            <StyledPostTitle>
              {previewPost.post_message}
            </StyledPostTitle>
            <Stats>
              <StatsItem>
                <HoverPopup>{t("stats_preview-views")}</HoverPopup>
                <StatsIcon>
                  <img src={PlayIcon} />
                </StatsIcon>
                <StatsValue>
                  {previewPost.unique_video_plays &&
                    numberWithCommas(previewPost.unique_video_plays)}
                </StatsValue>
              </StatsItem>

              <StatsItem>
                <HoverPopup>{t("stats_preview-clicks2")}</HoverPopup>
                <StatsIcon>
                  <img src={ClickIcon} />
                </StatsIcon>
                <StatsValue>
                  {previewPost.unique_other_clicks &&
                    numberWithCommas(previewPost.unique_other_clicks)}
                </StatsValue>
              </StatsItem>

              <StatsItem>
                <HoverPopup>{t("stats_preview-clicks1")}</HoverPopup>
                <StatsIcon>
                  <img src={LinkIcon} />
                </StatsIcon>
                <StatsValue>
                  {previewPost.unique_link_clicks &&
                    numberWithCommas(previewPost.unique_link_clicks)}
                </StatsValue>
              </StatsItem>

              <PaidBadge notPaid={!isPostPaid}>
                {isPostPaid ? t("stats_preview-paid") : t("stats_preview-not_paid")}
                <PaidIcon />
              </PaidBadge>
            </Stats>
            <StyledLine />
            <SmDataComponent previewPost={previewPost} />
          </PostInfo>
        </>
      )}
      {!previewPost && !isFetchingStats && <StyledNoContent>{t("stats_preview-no_content")}</StyledNoContent>}
      {!previewPost && isFetchingStats && (
        <>
          <LoadingText>{t("stats_preview-collecting")}</LoadingText>
          <StyledLoader />
        </>
      )}
    </CardStyled>
  );
});

export default PostPreviewComponent;
