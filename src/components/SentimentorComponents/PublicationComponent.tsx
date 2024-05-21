import React, { useMemo, useCallback, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { PublicationType } from "../../store/sentimentor/types";
import { getFormatDate } from "../../utils";
import { colors } from "../../styles/colors";
import {
  CheckedIcon,
  DownloadIcon,
  FalseIcon,
  PublicationSorceIcon,
  TrashIcon,
  TrueIcon,
} from "../../UI/Svg";
import { Button } from "../../UI/Button";
import { desktopBp } from "../../styles/variables";
import { countries } from "country-flags-svg";
import { handle } from "../../api";
import { Sentimentor } from "../../api/sentimentor";
import { usePermissions, useUserActions, useUserState } from "../../store/user";
import { useAppActions } from "../../store/app";
import { Loader } from "../../UI/Spinners";
import { useSentimentorActions } from "../../store/sentimentor";
import { activityList } from "../../config/userActivityList";
import { createActivity } from "../../utils/createActivity";
import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";
import { PostButton } from "../../UI/PostButton/PostButton";
import PostTypeComponent from "./PostTypeComponent";
import HighlightedKeywordsComponent from "./HighlightedKeywordsComponent";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledWrapper = styled.div<{ processed: boolean }>`
  display: flex;
  width: 100%;
  min-height: 10.42vw;
  border-bottom: 1px solid #c2c2c2;
  color: inherit;
  & * {
    word-break: break-all;
  }
  ${({ processed }) => processed && "background-color: #ccc;"}
  @media screen and (max-width: ${desktopBp}) {
    min-height: 131px;
  }
`;

const StyledContent = styled.div`
  padding-inline-start: 0.52vw;
  flex-grow: 1;
  @media screen and (max-width: ${desktopBp}) {
    padding-inline-start: 7px;
  }
`;

const StyledLeft = styled.div`
  padding-inline-end: 0.52vw;
  padding-top: 7px;
  border-inline-end: 1px solid #aaa;
  width: 7.29vw;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-grow: 0;
  @media screen and (max-width: ${desktopBp}) {
    padding-inline-end: 7px;
    width: 90px;
  }
`;

const StyledString = styled.p`
  color: #000;
  font-size: 12px;
  margin: 0;
`;

const StyledLabel = styled(StyledString)`
  display: flex;
  align-items: center;
  gap: 2px;
  text-decoration: underline;
  margin-top: 10px;
`;

const Title = styled.a`
  font-size: 1.15vw;
  color: #000;
  line-height: 1.56vw;
  margin-bottom: 0.52vw;
  mark {
    background-color: #FFF35A;
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 7px;
  }
`;

const Source = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.63vw;
  font-weight: 400;
  font-size: 0.73vw;
  line-height: 1.4;
  color: ${colors.grey_4};
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 8px;
    font-size: 9px;
  }
`;

const SourceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const HoverLink = styled.a`
  color: inherit;
  cursor: pointer;
  transition: opacity 200ms linear;
  &:hover {
    opacity: 0.65;
  }
`;

const StyledText = styled.p`
  font-size: 0.83vw;
  margin: 0 0 1.82vw;
  width: 100%;
  max-width: 100%;
  word-break: break-word;
  span {
    background-color: yellow;
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    margin: 0 0 23px;
  }
`;

const KeywordsTitle = styled.p`
  font-size: 0.94vw;
  line-height: 1.15vw;
  margin-bottom: 0.26vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 3px;
  }
`;

const Keywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.52vw;
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
    margin-bottom: 13px;
  }
`;

const PostKeyword = styled.div`
  padding: 4px 5px 4px 7px;
  font-size: 0.83vw;
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
  border-radius: 13px;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
  }
`;

const StyledDate = styled.p`
  margin-top: 0.94vw;
  font-size: 0.83vw;
  margin-inline-end: auto;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 12px;
    font-size: 10px;
  }
`;

const StyledSubTitle = styled.p`
  font-size: 0.94vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
  }
`;

const StyledInstitution = styled.p`
  font-size: 0.94vw;
  margin: 0;
  text-decoration: underline;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
`;



const BtnPopup = styled.div`
    display: none;
  position: absolute;
  bottom: 95%;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  font-size: 16px;
  font-weight: 400;
  box-shadow: 1px 1px 3px #00000087;
  white-space: nowrap;
  opacity: 1;
  z-index: 1;
`

const StyledActions = styled.div`
  margin-inline-start: auto;
  display: flex;
  justify-content: flex-end;
  margin-inline-end: 10px;
  gap: 0.63vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 8px;
  }
`;

const StyledEmailBtn = styled(Button)`
  display: flex;
  width: auto;
  align-items: center;
  gap: 5px;
  font-size: 0.73vw;
  line-height: 0.89vw;
  padding: 0.26vw 0.78vw;
  svg {
    width: 0.78vw;
    height: 0.68vw;
  }
  &:hover {
    svg path {
      fill: #fff;
    }
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    line-height: 11px;
    padding: 3px 10px;
    svg {
      width: 10px;
      height: 8px;
    }
  }
`;

const StyledFlag = styled.img`
  height: 20px;
  width: 30px;
`;

interface IProps {
  onEmail: () => void;
  is_news: boolean
  publication: PublicationType;
}

const PublicationComponent = React.memo(
  ({
    onEmail,
    is_news,
    publication: {
      id,
      institutions,
      title,
      name,
      cat,
      tag,
      link,
      first_link,
      post_type,
      url,
      link_to_submission,
      description,
      keywords,
      text,
      source_name,
      inner_link_name,
      _sender,
      _viewed,
      date_for_sorting,
      inner_link,
      front_link,
      source_link_app_agenda,
      committee_link,
      defamatory,
      emotions,
      topics,
      lang,
      origin,
      is_processed,
      ...publication
    },
  }: IProps) => {
    const { t } = useTranslation();
    const { token, userInfo } = useUserState();
    const { post_types: postTypesPermissions } = usePermissions("Settings");
    const { onSetPubProcessed, onRemovePublication, onChangePublicationType } = useSentimentorActions();
    const { onSendActivity } = useUserActions()
    const { onShowAlert } = useAppActions();
    const { pathname } = useLocation()
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const sortDate = useMemo(() => {
      if (date_for_sorting) {
        var d = new Date(date_for_sorting * 1000);
        return getFormatDate(d);
      }
      if (!date_for_sorting) return null;
    }, [date_for_sorting]);



    const tagLink = useMemo(() => {
      let tempLink = "";
      if (first_link) tempLink = first_link;
      if (url) tempLink = url;
      if (link_to_submission) tempLink = link_to_submission;
      if (link) tempLink = link;
      if (inner_link) tempLink = inner_link;
      if (front_link) tempLink = front_link;
      if (source_link_app_agenda) tempLink = source_link_app_agenda;
      if (committee_link) tempLink = committee_link;
      const label = tag ? tag : source_name;
      if (tempLink)
        return (
          <HoverLink target="_blank" href={tempLink} data-action={activityList["open-publication-source"]}>
            {label}
          </HoverLink>
        );
      return label;
    }, [
      tag,
      source_name,
      first_link,
      link,
      url,
      link_to_submission,
      inner_link,
      front_link,
      source_link_app_agenda,
    ]);

    const handleProccessClick = useCallback(async () => {
      if (token) {
        setIsFetching(true);
        const [dataRes, dataErr] = await handle(
          Sentimentor.sendPublicationProccess(token, _sender, id)
        );
        setIsFetching(false);
        if (!dataErr) {
          onSetPubProcessed(_sender, id);
        }
        if (dataErr) {
          onShowAlert(false, dataErr.error);
        }
        setIsFetching(false);
      }
    }, [token, _sender, id]);


    const handleDownloadScreenshot = useCallback(async () => {
      const activity = createActivity(
        pathname,
        activityList["download-post-screenshot"]
      );
      onSendActivity(activity);
      setIsFetching(true)
      handleProccessClick()
      if (token) {
        const [dataRes, dataErr] = await handle(Sentimentor.downloadGoogleNewsScreenshot(token, id))
        if (dataRes) {
          saveAs(dataRes, `${title || name}.png`)
        }
        if (dataErr) {
          onShowAlert(false, dataErr.error)
        }
      }
      setIsFetching(false)
    }, [token, id, pathname])



    const handleDeletePublication = useCallback(async () => {
      const activity = createActivity(
        pathname,
        activityList["delete-publication"]
      );
      onSendActivity(activity);
      setIsFetching(true)
      handleProccessClick()
      if (token) {
        const [dataRes, dataErr] = await handle(Sentimentor.deleteGoogleNewsPublication(token, id))
        if (!dataErr) {
          onShowAlert(true, t("ranking_pub-delete_success"))
          onRemovePublication(_sender, id)
        }
        if (dataErr) {
          onShowAlert(false, dataErr.error)
        }
      }
      setIsFetching(false)
    }, [token, _sender, id, pathname, t])



    const handleChangeType = useCallback(async (type: string[]) => {
      if (token) {
        handleProccessClick()
        setIsFetching(true)
        const [dataRes, dataErr] = await handle(Sentimentor.changePublicationType(token, { _sender, id, type }))
        setIsFetching(false)
        if (!dataErr) {
          onChangePublicationType({ _sender, id, type })
        }
        if (dataErr) {
          console.log(dataErr)
        }
      }
    }, [token, _sender, id])

    //Different title depending on tag
    const titleComposed = useMemo(() => {
      if (tag !== "סל התרופות") return title;
      return `${title} - ${inner_link_name}`;
    }, [title, tag, inner_link_name]);

    //Highlight each keyword inside name
    const textHighlighted = useMemo(() => {
      let value = text
      keywords?.forEach((k: any) => {
        value = value?.replaceAll(k.word, `<span>${k.word}</span>`)
      })
      return value
    }, [text, keywords])

    const countryFlag = useMemo(() => {
      return countries.find((c: any) => c.name === origin)?.flag;
    }, [origin, countries]);

    return (
      <StyledWrapper processed={is_processed}>
        <StyledLeft>
          {countryFlag && <>
            <StyledLabel>{t("ranking_pub-flag")}</StyledLabel>
            <StyledFlag src={countryFlag} />
          </>}
          {lang && (
            <>
              <StyledLabel>{t("ranking_pub-lang")}</StyledLabel>
              <StyledString>{lang}</StyledString>
            </>
          )}
          {typeof defamatory === "boolean" && (
            <StyledLabel>
              {t("ranking_pub-defamatory")}
              {defamatory ? <TrueIcon /> : <FalseIcon />}
            </StyledLabel>
          )}
          {topics && (
            <>
              <StyledLabel>{t("ranking_pub-topics")}</StyledLabel>
              <StyledString>{topics}</StyledString>
            </>
          )}
          {emotions && (
            <>
              <StyledLabel>{t("ranking_pub-emotions")}</StyledLabel>
              <StyledString>{eval(emotions).join(", ")}</StyledString>
            </>
          )}
        </StyledLeft>
        <StyledContent>
          {titleComposed && (
            <Title href={link} target="_blank" data-action={activityList["open-publication-link"]}>
              <HighlightedKeywordsComponent text={titleComposed} keywords={keywords || []} />
            </Title>
          )}
          {name && (
            <Title href={link} target="_blank" data-action={activityList["open-publication-link"]}>
              <HighlightedKeywordsComponent text={titleComposed} keywords={keywords || []} />
            </Title>
          )}
          <Source>
            {tagLink && (
              <SourceBox>
                <PublicationSorceIcon />
                {tagLink}
              </SourceBox>
            )}
            {cat && <p>{cat}</p>}
          </Source>
          {description && <StyledText>{description}</StyledText>}
          {text && <StyledText dangerouslySetInnerHTML={{ __html: textHighlighted }} />}
          {keywords && (
            <>
              <KeywordsTitle>{t("ranking_pub-keywords")}</KeywordsTitle>
              <Keywords>
                {keywords.map(
                  (keyword: { word: string; id: number }, index: number) => (
                    <PostKeyword key={index}>{keyword.word}</PostKeyword>
                  )
                )}
              </Keywords>
            </>
          )}
          <StyledSubTitle>{userInfo?.group?.id === 409 ? t("ranking_pub-segments(409)") : t("ranking_pub-segments")}</StyledSubTitle>
          {institutions.map((i: any) => (
            <StyledInstitution key={i.id}>{i.inst_name}</StyledInstitution>
          ))}
          {postTypesPermissions && is_news && <PostTypeComponent post_type={post_type || ""} onChange={handleChangeType} isFetching={isFetching} />}
          {/* <StyledEmailBtn onClick={() => onEmail()}>
            <EnvelopeIcon />
            {t("ranking_send-email")}
          </StyledEmailBtn> */}
          <StyledBox>
            {sortDate && (
              <StyledDate>
                {t("ranking_pub-sort-date")} {sortDate}
              </StyledDate>
            )}
            {isFetching ? (
              <Loader />
            ) : (
              <StyledActions>
                {is_news && <>
                  <PostButton onClick={handleDeletePublication}>
                    <BtnPopup>{t("ranking_pub-delete")}</BtnPopup>
                    <TrashIcon />
                  </PostButton>
                  <PostButton onClick={handleDownloadScreenshot}>
                    <BtnPopup>{t("ranking_pub-download-screenshot")}</BtnPopup>
                    <DownloadIcon id="download-icon-monitoring" />
                  </PostButton>
                </>}
                <PostButton onClick={handleProccessClick} disabled={isFetching} processed={is_processed} data-action={activityList["publication-processed"]}>
                  <CheckedIcon />
                </PostButton>
              </StyledActions>
            )}
          </StyledBox>
        </StyledContent>
      </StyledWrapper>
    );
  }
);


export default withErrorBoundaryHOC(PublicationComponent);