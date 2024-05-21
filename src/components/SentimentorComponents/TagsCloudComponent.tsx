import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {useSentimentorActions} from "../../store/sentimentor/hooks";
import {
  sentimentorPostsCountSelector,
  sentimentorSelectedTagSelector, sentimentorTagsFetchingSelector,
  sentimentorTagsSelector,
  sentimentorTrendingPostsFetchingSelector,
} from "../../store/sentimentor/selectors";
import {desktopBp} from "../../styles/variables";
import {Loader} from "../../UI/Spinners";
import CloudComponent from "./CloudComponent";
import DeleteTagComponent from "./DeleteTagComponent";
import {useUserActions} from "../../store/user";
import {createActivity} from "../../utils/createActivity";
import {useLocation} from "react-router-dom";
import {activityList} from "../../config/userActivityList";

const TagsCloudStyled = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-grow: 1;
  max-height: 26.04vw;
  flex-direction: column;
  padding-top: 2.34vw;
  text {
    font-family: "IMBPlexSansHebrew", sans-serif;
  }
  @media screen and (max-width: ${desktopBp}) {
    padding-top: 29px;
    max-height: 327px;
  }
`;

const StyledDelComponent = styled(DeleteTagComponent)`
  position: absolute;
  align-self: flex-start;
  top: 0;
`;

const StyledLoader = styled(Loader)`
  height: 10.42vw;
  width: 10.42vw;
  margin: 2.6vw auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 131px;
    width: 131px;
    margin: 33px auto;
  }
`;

const StyledNoData = styled.p`
  margin-top: 2.08vw;
  font-size: 1.04vw;
  text-align: center;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 26px;
    font-size: 13px;
  }
`;

const TagsCloudComponent = React.memo(() => {
  const { t } = useTranslation();
  const tagsCloud = useSelector(sentimentorTagsSelector);
  const selectedTag = useSelector(sentimentorSelectedTagSelector);
  const postsCount = useSelector(sentimentorPostsCountSelector);
  const isFetchingCloudTags = useSelector(sentimentorTagsFetchingSelector);
  const isFetchingPosts = useSelector(sentimentorTrendingPostsFetchingSelector)
  const { onGetTagsCloud, onDeleteTag, onSelectTag } = useSentimentorActions();
  const { onSendActivity } = useUserActions();
  const { pathname } = useLocation();
  const [showTagsCloud, setShowTagsCloud] = useState<boolean>(false);

  const isFetching = useMemo(() => {
    const posts = Object.values(isFetchingPosts).some(s => s)
    return isFetchingCloudTags || posts
  }, [isFetchingCloudTags, isFetchingPosts])


  
  const noPosts = useMemo(() => {
    let noPosts = true
    Object.values(postsCount).forEach(c => {
      if(c) noPosts = false
    })
    return noPosts
  }, [postsCount])

  useEffect(() => {
    onGetTagsCloud();
  }, []);

  //Return first 20 tags
  const tags = useMemo(() => {
    return tagsCloud
      .map((item) => {
        return {
          text: item.word,
          value: item.size,
          color: item.color,
        };
      })
      .sort((c, p) => p.value - c.value)
      .slice(0, 25);
  }, [tagsCloud]);

  const noDataYet = useMemo(() => {
    if(noPosts) return true
    return tagsCloud.length === 0
  }, [tagsCloud, noPosts]);

  useEffect(() => {
    // We got problem when tag cloud initializes it slows down the app, so we need to show it after a delay
    setTimeout(() => {
      setShowTagsCloud(true);
    }, 1000);
  }, []);

  const handleSelect = useCallback(
    (tag: any) => {
      const activity = createActivity(
        pathname,
        activityList["select-tag_cloud"]
      );
      onSendActivity(activity);
      onSelectTag(tag);
    },
    [pathname]
  );

  return (
    <>
      {!isFetching && noDataYet && showTagsCloud && (
        <StyledNoData>{t("ranking_no-data")}</StyledNoData>
      )}
      <TagsCloudStyled>
        {selectedTag && (
          <StyledDelComponent
            word={selectedTag}
            onDelete={() => onDeleteTag()}
            onClose={() => handleSelect(null)}
          />
        )}
        {(showTagsCloud && !noDataYet && !isFetching) && <CloudComponent tags={tags} onClick={handleSelect} />}
        {(!showTagsCloud || isFetching) && <StyledLoader />}
      </TagsCloudStyled>
    </>
  );
});

export default TagsCloudComponent;
