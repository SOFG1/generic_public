import React, { useMemo } from "react";
import { useUserState } from "../store/user";
import { usePermissions } from "../store/user";
import {
  ChartAndKeywordsView,
  FacebookPostsView,
  TrendingFor409Group,
  TrendingView,
} from "../views/SentimentorViews";
import PublicationsView from "../views/SentimentorViews/PublicationsView";

const Sentimentor = () => {
  const { userInfo } = useUserState()
  const permissions = usePermissions("Ranking");


  const is409Group = useMemo(() => {
    return userInfo?.group?.id === 409  || userInfo?.group?.id === 482 || userInfo?.group?.id  === 481 || userInfo?.group?.id  === 484
  }, [userInfo?.group?.id])
  return (
    <>
      {permissions.sentiment_analysis && <ChartAndKeywordsView />}
      {permissions.posts && !is409Group && <TrendingView />}
      {is409Group && <TrendingFor409Group />}
      <PublicationsView />
      {permissions.post && <FacebookPostsView />}
    </>
  );
}

export default Sentimentor;
