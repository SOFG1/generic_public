import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Modal } from "../../UI/Modal";
import { useSentimentorActions } from "../../store/sentimentor";
import { useSelector } from "react-redux";
import {
  sentimentorAIPostsListSelector,
  sentimentorIsFetchingAISelector,
} from "../../store/sentimentor/selectors";
import { Loader } from "../../UI/Spinners";
import { desktopBp } from "../../styles/variables";
import { Pagination } from "../../components/common/Pagination/Pagination";
import { activityList } from "../../config/userActivityList";
import { ToolbarButton } from "../../UI/ToolbarButton";
import { PostsHistoryIcon } from "../../UI/Svg";
import { AIPostComponent } from "../../components/SentimentorComponents";

const StyledLoader = styled(Loader)`
  width: 13.02vw;
  height: 13.02vw;
  margin: 20px auto;
  @media screen and (max-width: ${desktopBp}) {
    width: 163px;
    height: 163px;
  }
`;

const StyledContent = styled.div`
  min-height: 22.23vw;
  min-width: 22.23vw;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 300px;
    min-width: 300px;
  }
`;

const itemsPerPage = 8


interface IProps {
  opened: boolean
  setOpened: (o: boolean) => void
}

const AIPostsHistoryView = React.memo(({ opened, setOpened }: IProps) => {
  const { t } = useTranslation();
  const AIPostsList = useSelector(sentimentorAIPostsListSelector);
  const isFetchingAi = useSelector(sentimentorIsFetchingAISelector);
  const { onGetAIPosts } = useSentimentorActions();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const sorted = useMemo(() => {
    return [...AIPostsList].sort((c, p) => p.id - c.id);
  }, [AIPostsList])

  const pageItems = useMemo(() => {
    const index = currentPage * itemsPerPage
    return sorted.slice(index, index + itemsPerPage)
  }, [sorted, currentPage])



  useEffect(() => {
    if (opened) onGetAIPosts();
  }, [opened]);

  return (
    <>
      <ToolbarButton opened={opened} onClick={() => setOpened(true)} data-action={activityList["rankings-AIhistory-open"]}>
        <p>{t("ranking_ai-history")}</p>
        <PostsHistoryIcon />
      </ToolbarButton>
      {
        <Modal show={opened} onClose={() => setOpened(false)}>
          <StyledContent>
            {!isFetchingAi && (
              <>
                {pageItems.map((p) => <AIPostComponent isPreview={true} post={p} key={p.id} />)}
                <Pagination currentPage={currentPage} count={sorted.length} limit={itemsPerPage} onSelectPage={setCurrentPage} />
              </>
            )}
            {isFetchingAi && <StyledLoader />}
          </StyledContent>
        </Modal>
      }
    </>
  );
});

export default AIPostsHistoryView;
