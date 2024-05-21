import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import {
  ITrendingPost,
  SentimentorKeyword,
  useSentimentorActions,
} from "../../store/sentimentor";
import { desktopBp } from "../../styles/variables";
import { PlusIcon } from "../../UI/Svg";
import { usePermissions, useUserActions, useUserState } from "../../store/user";
import { handle } from "../../api";
import { Sentimentor } from "../../api/sentimentor";
import { useAppActions } from "../../store/app";
import { httpOrHttpsRegex } from "../../utils";
import { useTranslation } from "react-i18next";
import PostKeywordComponent from "./PostKeywordComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { convertBlobImageToBase64 } from "../../utils/convertBlobToBase64";
import { saveSentimentorPostHtml } from "../../utils/saveSentimentorPostHtml";
import { ConfirmDeleteFull } from "../common/ConfirmDeleteFull";
import { activityList } from "../../config/userActivityList";
import { createActivity } from "../../utils/createActivity";
import PostTypeComponent from "./PostTypeComponent";
import PostHeaderComponent from "./PostHeaderComponent";
import PostFooterComponent from "./PostFooterComponent";
import AddPostKeywordComponent from "./AddPostKeywordComponent";
import PostCommentComponent from "./PostCommentComponent";
import HighlightedKeywordsComponent from "./HighlightedKeywordsComponent";
import { useSelector } from "react-redux";
import { sentimentorOpenedTabSelector, sentimentorSummarizationSelector } from "../../store/sentimentor/selectors";
import { Button } from "../../UI/Button";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledWrapper = styled.div<{ proccessed: boolean }>`
  position: relative;
  display: block;
  max-width: calc(100% - 15px);
  width: calc(100% - 15px);
  min-height: 10.42vw;
  margin: 10px 10px 20px;
  border-radius: 10px;
  padding: 1.56vw;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  ${({ proccessed }) => proccessed && "background-color: #ccc;"}
  @media screen and (max-width: ${desktopBp}) {
    min-height: 131px;
    padding: 20px;
  }
`;


const SummarizationButton = styled(Button) <{ selected: boolean }>`
  position: absolute;
  top: 3px;
  inset-inline-end: 3px;
  padding: 3px;
  font-size: 12px;
  width: auto;
  ${({ selected }) => selected && "background-color: #000; color: #fff;"}
`

const StyledLink = styled.a`
    text-decoration: none;
  color: inherit;
`



const StyledText = styled.p<{ isLargeFont: boolean }>`
  font-size: ${({ isLargeFont }) => isLargeFont ? "0.94vw" : "0.83vw"} ;
  width: 100%;
  max-width: 100%;
  word-break: break-word;
  padding-bottom: 0.89vw;
  border-bottom: 1px solid #AAA;
  margin-bottom: 1.04vw;
  mark {
    background-color: #FFF35A;
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${({ isLargeFont }) => isLargeFont ? "12px" : "10px"} ;
    padding-bottom: 11px;
    border-bottom: 1px solid #AAA;
    margin-bottom: 13px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.57vw;
  padding-bottom: 0.89vw;
  border-bottom: 1px solid #AAA;
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
    padding-bottom: 11px;
    border-bottom: 1px solid #AAA;
    margin-bottom: 13px;
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



const StyledBtn = styled.button<{ disabled?: boolean }>`
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
  cursor: pointer;
  :hover:not(:disabled) svg {
    opacity: 0.65;
  }
  :hover > div {
    display: block;
  }
  img {
    height: 1.04vw;
    width: 1.04vw;
  }
  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 85%;
    width: 100%;
  }
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #000;
    cursor: not-allowed;
    svg path {
      fill: #fff;
    }
  `}


  @media screen and (max-width: ${desktopBp}) {
    width: 23px;
    height: 23px;
    font-size: 14px;
    img {
      height: 13px;
      width: 13px;
    }
  }
`;




const AddInstitutionBtn = styled(StyledBtn)`
width: 20px;
height: 20px;
svg {
  position: static;
  height: auto;
  transform: none;
}
  @media screen and (max-width: ${desktopBp}) {
    width: 20px;
    height: 20px;
  }
`

interface IProps {
  post: ITrendingPost;
  onRemovePost: () => void
  onSetProcessed: (p: boolean) => void
  onResetPosts: () => void
  onChangeDefamatory: () => void
  updateType: (type: string[]) => void
  onUpdateScore: (s: number) => void
  onSetInSheets: (isIn: boolean) => void
  onAddKeywordToPost: (k: SentimentorKeyword) => void
}

const TrendingPostComponent = React.memo(({ post, onRemovePost, onSetProcessed, onResetPosts, onChangeDefamatory, updateType, onUpdateScore, onAddKeywordToPost, onSetInSheets }: IProps) => {
  const { t } = useTranslation();
  const user = useUserState();
  const { token, userInfo } = useUserState();
  const openedTab = useSelector(sentimentorOpenedTabSelector)
  const summarizationPosts = useSelector(sentimentorSummarizationSelector)
  const { onGetKeywords, onSetSummarization } = useSentimentorActions();
  const { onShowAlert } = useAppActions();
  const { onSendActivity } = useUserActions();
  const { post_types: postTypesPermissions } = usePermissions("Settings");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [topicWarning, setTopicWarning] = useState<boolean>(false);


  const is409Group = useMemo(() => {
    return userInfo?.group.id === 409
  }, [userInfo?.group.id])


  //This function sends activity and prevents link click
  const handleSendActivity = (activityString: string, e?: React.MouseEvent) => {
    const activity = createActivity(
      pathname,
      activityString
    );
    onSendActivity(activity);
    e?.preventDefault();
    e?.stopPropagation();
  }


  const handleProccessClick = async (processed: boolean, e?: React.MouseEvent) => {
    if (processed === post.is_processed) {
      return
    }
    handleSendActivity(activityList["set-post-processed"])
    if (token) {
      const [dataRes, dataErr] = await handle(
        Sentimentor.sendPostProccess(token, post.id, post.table)
      );
      if (dataRes) {
        onSetProcessed(!post.is_processed)
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
      setIsFetching(false);
    }
  }



  const handleDownloadScreenshot = useCallback(
    async (e: React.MouseEvent) => {
      handleSendActivity(activityList["download-post-screenshot"], e)
      if(!is409Group) onSetProcessed(true)
      if (token) {
        setIsFetching(true);
        const [dataRes, dataErr] = await handle(
          Sentimentor.getPostScreenShot(token, post.table, post.id)
        );
        if(!dataErr) {
          setIsFetching(false);
          onShowAlert(true, t(is409Group ? "ranking_pub-download_screen_success(409)" : "ranking_pub-download_screen_success"))
          return
        }
        // if (dataRes) {
        //   const base64Img = await convertBlobImageToBase64(dataRes);
        //   const fileName = `${post.network}_${post.account}_${post.date}`;
        //   saveSentimentorPostHtml(post.link, base64Img as string, fileName);
        //   setIsFetching(false);
        // }
        if (dataErr) {
          setIsFetching(false);
          console.log(dataErr);
        }
      }
    },
    [token, post, pathname, is409Group, t]
  );



  const handleAddGoogleSheets = useCallback(async (e: React.MouseEvent) => {
    handleSendActivity(activityList["add-post-to-googlesheets"], e)
    onSetProcessed(true)
    if (token) {
      setIsFetching(true);
      const [targetsRes, targetsErr] = await handle(Sentimentor.addPostToTargets({...post, client_id:user.userInfo?.group.id}))
      const [sheetRes, sheetErr] = await handle(
        Sentimentor.addPostGoogleSheets(token, post.id)
      );
      setIsFetching(false);
      //1. If botfarm success and sheets success
      if (!sheetErr && !targetsErr) {
        onSetInSheets(true)
        onShowAlert(true, t("ranking_pub-sheets_bots_success"));
      }
      //2. If botfarm error and sheets error
      if (sheetErr && targetsErr) {
        onShowAlert(false, `${t("ranking_pub-sheets_bots_error")} \\ ${sheetErr.error} \\ ${targetsErr.detail}`);
      }
      //3. If bots error and sheets success
      if (sheetErr && !targetsErr) {
        onShowAlert(false, `${t("ranking_pub-sheets_error")} ${sheetErr.error}`);
      }
      //4. If google success and bots error
      if (!sheetErr && targetsErr) {
        onShowAlert(false, `${t("ranking_pub-bots_error")} ${targetsErr.detail}`);
      }
    }
  }, [token, post, pathname, user.userInfo?.group.id])





  const handleLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, link: string) => {
      navigator.clipboard.writeText(post.link);
      if (!is409Group) handleProccessClick(true)
      if (!httpOrHttpsRegex.test(link)) {
        event.preventDefault();
        onShowAlert(false, "Sorry, link is corrupted");
      }
    },
    [httpOrHttpsRegex, is409Group]
  );

  const navigateToInstitutions = useCallback(
    (e: React.MouseEvent) => {
      handleSendActivity(activityList["open-institutions"], e)
      if (!is409Group) handleProccessClick(true)
      navigate("/settings?modal=general&tab=institutions&message=ranking_pub-segm_message");
    },
    [navigate, pathname, is409Group]
  );


  const handleTrackUserClick = useCallback(
    async (e: React.MouseEvent) => {
      handleSendActivity(activityList["track-notorious-user"], e)
      onSetProcessed(true)
      if (token) {
        setIsFetching(true);
        const [dataRes, dataErr] = await handle(
          Sentimentor.collectPostData(token, post.id)
        );
        setIsFetching(false);
        if (!dataErr) {
          onShowAlert(true, t("ranking_pub-added_track"));
        }
        if (dataErr) {
          onShowAlert(false, dataErr.error);
        }
      }
    },
    [token, post.id, t, pathname]
  );

  const addTopicKeyword = useCallback(async () => {
    if (token && !isFetching) {
      setIsFetching(true);
      onSetProcessed(true)
      const [dataRes, dataErr] = await handle(
        Sentimentor.createTopicKeyword(token, post.id, post.topics as string)
      );
      setIsFetching(false);
      if (!dataErr) {
        onShowAlert(
          true,
          t("ranking_pub-topic_keyword", { keyword: post.topics })
        );
        onGetKeywords();
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token, post.id, t, isFetching, post.topics]);

  const handleTopicClick = useCallback(
    async (e: React.MouseEvent) => {
      handleSendActivity(activityList["create-topic-keyword"], e)
      if (!is409Group) handleProccessClick(true)
      setTopicWarning(true);
    },
    [pathname, is409Group]
  );


  const handleChangeType = useCallback(async (type: string[]) => {
    if (token && type) {
      onSetProcessed(true)
      setIsFetching(true)
      const [dataRes, dataErr] = await handle(Sentimentor.changePostType(token as string, post.table, post.id, type))
      setIsFetching(false)
      if (!dataErr) {
        updateType(type)
      }
      if (dataErr) {
        console.log(dataErr)
      }
    }
  }, [token, post])




  const handleAddKeywordToPost = useCallback(async (keyword: SentimentorKeyword) => {
    if (token) {
      if (!is409Group) {
        onSetProcessed(true)
      }
      setIsFetching(true)
      const [dataRes, dataErr] = await handle(Sentimentor.addKeywordToPost(token, post.id, keyword.id))
      setIsFetching(false)
      if (!dataErr) {
        onShowAlert(true, t("ranking_pub-keywords-success"));
        onAddKeywordToPost(keyword)
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [post, onAddKeywordToPost, t, is409Group])




  const selectedSummarization = useMemo(() => {
    return summarizationPosts.includes(post.id)
  }, [summarizationPosts, post.id])

  const handleSelectSummarization = useCallback(() => {
    if (selectedSummarization) onSetSummarization(summarizationPosts.filter(id => id !== post.id))
    if (!selectedSummarization) onSetSummarization([...summarizationPosts, post.id])
  }, [post.id, summarizationPosts, selectedSummarization])



  return (
    <>
      <StyledWrapper
        proccessed={post.is_processed}
      >
        {openedTab === "summarization" && <SummarizationButton onClick={handleSelectSummarization} selected={selectedSummarization}>{selectedSummarization ? t("ranking_pub-deselect") : t("ranking_pub-select")}</SummarizationButton>}
        <StyledLink href={post.link} target="_blank" onClick={(e) => handleLinkClick(e, post.link)}>
          {post.is_comment && post.parent_id && <PostCommentComponent parent_id={post.parent_id} />}
          <PostHeaderComponent onSetProcessed={onSetProcessed} post={post} onUpdateScore={onUpdateScore} />
          <StyledText isLargeFont={is409Group}>
            <HighlightedKeywordsComponent text={post.post_text} keywords={post.keywords || []} />
          </StyledText>
        </StyledLink>
        <StyledBox>
          <StyledSubTitle>{t("ranking_pub-keywords")}</StyledSubTitle>
          {post?.keywords?.map((k) => (
            <PostKeywordComponent postId={post.id} keyword={k} onSetProcessed={onSetProcessed} key={k.id} />
          ))}
          <AddPostKeywordComponent onAddKeyword={handleAddKeywordToPost} isFetching={isFetching} addedKeywords={post?.keywords || []} />
        </StyledBox>
        {!is409Group && (
          <StyledBox>
            <StyledSubTitle>{t("ranking_pub-segments")}</StyledSubTitle>
            {post.institutions?.map((k) => (
              <StyledInstitution key={k.id}>{k.inst_name}</StyledInstitution>
            ))}
            <AddInstitutionBtn onClick={navigateToInstitutions}>
              <PlusIcon />
            </AddInstitutionBtn>
          </StyledBox>
        )}
        {postTypesPermissions && (
          <PostTypeComponent isFetching={isFetching} onChange={handleChangeType} post_type={post.post_type} />
        )}
        <PostFooterComponent onSetProcessed={onSetProcessed} post={post} handleAddGoogleSheets={handleAddGoogleSheets} onResetPosts={onResetPosts} onRemovePost={onRemovePost} onChangeDefamatory={onChangeDefamatory} handleDownloadScreenshot={handleDownloadScreenshot} handleTrackUserClick={handleTrackUserClick} handleTopicClick={handleTopicClick} handleProccessClick={handleProccessClick} isFetching={isFetching} />
      </StyledWrapper >
      <ConfirmDeleteFull
        title={t("ranking_pub-topic_warn", { keyword: post.topics })}
        show={topicWarning}
        onClose={() => setTopicWarning(false)}
        onDelete={addTopicKeyword}
      />
    </>
  );
});

export default withErrorBoundaryHOC<IProps>(TrendingPostComponent);
