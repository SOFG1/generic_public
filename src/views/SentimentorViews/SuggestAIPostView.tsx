import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  sentimentorSelectedAIPostSelector, sentimentorSelectedPostsSelector,
} from "../../store/sentimentor/selectors";
import {
  AIGenerateVideoComponent,
  AIPostComponent,
  CreateAIPostComponent,
} from "../../components/SentimentorComponents";
import { useSentimentorActions } from "../../store/sentimentor";
import { useTranslation } from "react-i18next";
import { activityList } from "../../config/userActivityList";
import { SuggestPostClosedIcon, SuggestPostOpenedIcon } from "../../UI/Svg";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { desktopBp } from "../../styles/variables";
import { ToolbarButton } from "../../UI/ToolbarButton";



const StyledContent = styled.div`
  padding-top: 3.23vw;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    padding-top: 41px;
  }
`


interface IProps {
  opened: boolean
  setOpened: (o: boolean) => void
}

const SuggestAIPostView = React.memo(({ opened, setOpened }: IProps) => {
  const { t } = useTranslation();
  const AIPost = useSelector(sentimentorSelectedAIPostSelector);
  const selectedTrendingPosts = useSelector(sentimentorSelectedPostsSelector)
  const { onSetSelectedAIPost } =
    useSentimentorActions();
  const [cancelledCreating, setCancelledCreating] = useState<boolean>(false)

  //Reset on close
  useEffect(() => {
    if (!opened) {
      onSetSelectedAIPost(null);
    }
  }, [opened]);



  useEffect(() => {
    if (selectedTrendingPosts.length) setOpened(true)
  }, [selectedTrendingPosts])

  return (
    <>
      <ToolbarButton opened={opened} onClick={() => setOpened(!opened)} data-action={activityList["rankings-suggest-AIpost"]}>
        <p>{t("ranking_ai-suggest")}</p>
        {opened ? <SuggestPostOpenedIcon /> : <SuggestPostClosedIcon />}
      </ToolbarButton>
      {opened && document.getElementById("toolbar-wrapper") && createPortal(<StyledContent>
        <CreateAIPostComponent cancelled={cancelledCreating} setCancelled={setCancelledCreating} />
        {!cancelledCreating && (<AIPostComponent post={AIPost} />)}
        <AIGenerateVideoComponent />
      </StyledContent>, document.getElementById("toolbar-wrapper") as HTMLDivElement)}
    </>
  );
});

export default SuggestAIPostView;
