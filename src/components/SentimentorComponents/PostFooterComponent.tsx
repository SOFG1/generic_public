import React, {useCallback, useMemo} from "react"
import {ITrendingPost, useSentimentorActions} from "../../store/sentimentor"
import styled from "styled-components"
import {useTranslation} from "react-i18next"
import PostDefamatoryComponent from "./PostDefamatoryComponent"
import {countries} from "country-flags-svg";
import {Loader} from "../../UI/Spinners"
import {desktopBp} from "../../styles/variables"
import {
  AddBotFarmIcon,
  CheckedIcon, CopyIcon,
  DownloadIcon,
  IsTrackedIcon,
  PostGoogleSheetsIcon,
  SelectAIPostIcon,
  SelectedAIPostIcon,
  TrackPostIcon
} from "../../UI/Svg"
import DeletePostComponent from "./DeletePostComponent"
import {PostButton} from "../../UI/PostButton/PostButton"
import {usePermissions, useUserActions} from "../../store/user"
import {createActivity} from "../../utils/createActivity"
import {useLocation} from "react-router-dom"
import {activityList} from "../../config/userActivityList"
import {useSelector} from "react-redux"
import {sentimentorSelectedPostsSelector} from "../../store/sentimentor/selectors"
import {useAppActions} from "../../store/app";

const StyledFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`

const StyledFooterItem = styled.div<{ greyBg?: boolean }>`
  display: flex;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px solid #000;
  background: #FFF;
  padding: 3px 5px;
  flex-shrink: 0;
  ${({ greyBg }) => greyBg && "background-color: #AAA;"}
  svg {
    margin-inline-start: 15px;
  }
`
const StyledString = styled.p`
  color: #000;
  font-size: 12px;
  margin: 0;
`;

const StyledTopic = styled(StyledString)`
  cursor: pointer;
  white-space: pre-wrap;
  width: 100%;
  padding: 5px; 
  text-overflow: ellipsis;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledLabel = styled(StyledString)`
  display: flex;
  align-items: center;
  gap: 2px;
  text-decoration: underline;
`;



const StyledFlag = styled.img`
  height: 20px;
  width: 30px;
`;


const StyledActions = styled.div`
  margin-inline-start: auto;
  display: flex;
  justify-content: flex-end;
  gap: 0.63vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 8px;
  }
`;


const StyledLoader = styled(Loader)`
  height: 1.04vw;
  width: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 13px;
    width: 13px;
  }
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

const AddToAIButton = styled(PostButton) <{ selected: boolean }>`
${({ selected }) => selected && "background-color: #000;"}
    svg {
      height: 100%;
      width: 100%;
    }
`


const GoogleSheetsBtn = styled(PostButton) <{ added: boolean, disabled: boolean }>`
${({ disabled }) => disabled && `
  background-color: #AAA;
`}
  svg {
    height: 100%;
    width: 100%;
  }
`

interface IProps {
  post: ITrendingPost
  handleTopicClick: (e: React.MouseEvent) => void
  handleProccessClick: (processed: boolean, e?: React.MouseEvent) => void//Set processed in DB
  handleTrackUserClick: (e: React.MouseEvent) => void
  handleDownloadScreenshot: (e: React.MouseEvent) => void
  handleAddGoogleSheets: (e: React.MouseEvent) => void
  onChangeDefamatory: () => void
  onSetProcessed: (p: boolean) => void //Set processed in state (front)
  onRemovePost: () => void
  onResetPosts: () => void
  isFetching: boolean
}


const PostFooterComponent = React.memo(({ post, onResetPosts, onRemovePost, onSetProcessed, onChangeDefamatory, handleTopicClick, handleProccessClick, isFetching, handleTrackUserClick, handleDownloadScreenshot, handleAddGoogleSheets }: IProps) => {
  const { t } = useTranslation();
  const {onShowAlert} = useAppActions()
  const selectedTrendingPosts = useSelector(sentimentorSelectedPostsSelector)
  const { onSelectTrendingPosts } = useSentimentorActions()
  const { onSendActivity } = useUserActions();
  const permsissions = usePermissions("Ranking");
  const { pathname } = useLocation()

  const countryFlag = useMemo(() => {
    return countries.find((c: any) => c.name === post.origin)?.flag;
  }, [post.origin, countries]);


  const isSelected = useMemo(() => {
    return !!selectedTrendingPosts.find(p => p.id === post.id)
  }, [selectedTrendingPosts, post])

  const handleCopyLink = useCallback(async ()=>{
    try{
      await navigator.clipboard.writeText(post.link);
      onShowAlert(true, t("ranking_pub-copy-link-success"));
    }catch(e){
      onShowAlert(false, t("ranking_pub-copy-link-error"));
    }

  },[])

  const handleAddToBotFarm = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const activity = createActivity(
      pathname,
      activityList["add-post-to-botfarm"]
    );
    onSendActivity(activity);
    window.open(`http://65.109.34.120:8081/create-comment/selection?post_links=${post.link}&post_text=${post.post_text} `, "_blank")
  }, [post])



  const handleSelectPost = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const activity = createActivity(
      pathname,
      activityList["select-trending-post"]
    );
    onSendActivity(activity);
    if (selectedTrendingPosts.find(p => p.id === post.id)) {
      onSelectTrendingPosts(selectedTrendingPosts.filter(p => p.id !== post.id))
    }
    if (!selectedTrendingPosts.find(p => p.id === post.id)) {
      onSelectTrendingPosts([...selectedTrendingPosts, post])
    }
  }, [post, selectedTrendingPosts])

  return <StyledFooter>
    {post.emotions && eval(post.emotions) && (
      <StyledFooterItem>
        <StyledLabel>{t("ranking_pub-emotions")}</StyledLabel>
        <StyledTopic>
          {eval(post.emotions).join(", ")}
        </StyledTopic>
      </StyledFooterItem>
    )}
    {post.topics && (
      <>
        <StyledFooterItem onClick={(e) => handleTopicClick(e)}>
          <StyledLabel>{t("ranking_pub-topics")}</StyledLabel>
          <StyledTopic>{post.topics}</StyledTopic>
        </StyledFooterItem>
      </>
    )}
    {post.is_tracked_account && <StyledFooterItem>
      <StyledLabel>{t("ranking_pub-tracked")}</StyledLabel>
      <IsTrackedIcon />
    </StyledFooterItem>}
    {post.lang && (
      <StyledFooterItem>
        <StyledLabel>{t("ranking_post-lang")}</StyledLabel>
        <StyledString>{post.lang}</StyledString>
      </StyledFooterItem>
    )}
    <PostDefamatoryComponent onSetProcessed={onSetProcessed} id={post.id} table={post.table} defamatory={post.defamatory} onChangeDefamatory={onChangeDefamatory} />
    {countryFlag && <StyledFlag src={countryFlag} />}
    <StyledActions>
      {isFetching ? (
        <StyledLoader />
      ) : (
        <>
          {permsissions.edit_tracked_accounts && <PostButton onClick={handleTrackUserClick}>
            <BtnPopup>{t("ranking_pub-track_user")}</BtnPopup>
            <TrackPostIcon />
          </PostButton>}
          {permsissions.post_to_googlesheet && <GoogleSheetsBtn
            added={!!post.is_in_sheet}
            disabled={!!post.is_in_sheet}
            onClick={handleAddGoogleSheets}
          >
            <BtnPopup>{t("ranking_pub-google_sheets")}</BtnPopup>
            <PostGoogleSheetsIcon />
          </GoogleSheetsBtn>}
          <PostButton onClick={(e) => handleDownloadScreenshot(e)}>
            <BtnPopup>{t("ranking_pub-download_screen")}</BtnPopup>
            <DownloadIcon id="download-icon-monitoring" />
          </PostButton>
          {permsissions.suggest_post && <AddToAIButton onClick={handleSelectPost} selected={isSelected}>
            {isSelected ? <SelectedAIPostIcon /> : <SelectAIPostIcon />}
          </AddToAIButton>}
          <DeletePostComponent post={post} onRemovePost={onRemovePost} onResetPosts={onResetPosts} />
          {permsissions.maaher && <PostButton onClick={handleAddToBotFarm}>
            <BtnPopup>{t("ranking_pub-add_to_botfarm")}</BtnPopup>
            <AddBotFarmIcon />
          </PostButton>}
          <PostButton
            processed={post.is_processed}
            onClick={(e) => handleProccessClick(!post.is_processed, e)}
          >
            <BtnPopup>{!post.is_processed ? t("ranking_pub-process_post") : t("ranking_pub-unprocess_post")}</BtnPopup>
            <CheckedIcon />
          </PostButton>
          <PostButton onClick = {handleCopyLink}>
            <CopyIcon/>
            <BtnPopup>{t("ranking_pub-copy-link")}</BtnPopup>
          </PostButton>
        </>
      )}
    </StyledActions>
  </StyledFooter>
})

export default PostFooterComponent
