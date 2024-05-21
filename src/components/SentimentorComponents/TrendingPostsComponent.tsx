import React, { useCallback, useEffect, useMemo, useState, useRef } from "react"
import styled from "styled-components"
import { Card } from "../common/Card";
import { desktopBp } from "../../styles/variables";
import { Title } from "../common/Title";
import { useSelector } from "react-redux";
import { sentimentorAppliedFiltersSelector, sentimentorSelectedTagSelector, sentimentorTrendingPostsFetchingSelector } from "../../store/sentimentor/selectors";
import { NoIcon } from "../../UI/Svg";
import { ISentimentorFilters, ITrendingPost, SentimentorKeyword, useSentimentorActions } from "../../store/sentimentor";
import { useTranslation } from "react-i18next";
import { Loader } from "../../UI/Spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import TrendingPostComponent from "./TrendingPostComponent";
import { useUserState } from "../../store/user";
import { Sentimentor } from "../../api/sentimentor";
import { handle } from "../../api";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";
import { debounce } from "lodash";


const StyledCard = styled(Card)`
  position: relative;
  margin-bottom: 0;
`;


const StyledBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 3px 30px;
  margin-top: 0.99vw;
  margin-bottom: 3.85vw;
  text-align: left;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
    margin-top: 12px;
    margin-bottom: 48px;
  }
`;


const StyledTitle = styled(Title)`
  align-self: stretch;
  font-size: 1.67vw;
  line-height: 2.19vw;
  font-weight: 400;
  margin: 0;
  text-align: left;
  span {
    margin-inline-start: 10px;
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;


const ActionBtn = styled.button`
  position: relative;
  flex-shrink: 0;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  border: none;
`;

const StyledLoader = styled(Loader)`
  position: absolute;
  top: 95px;
  left: 50%;
  transform: translateX(-50%);
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


const TrendingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 30.16vw;
  overflow-y: auto;
  max-width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    height: 378px;
  }
`;

interface IProps {
    title: string,
    sentiment?: "positive" | "negative"
}

interface IFetchPostsParams {
    offset: number,
    requestOrder: number
    appliedFilters: ISentimentorFilters
    tag?: string
}

const TrendingPostsComponent = React.memo(({ title, sentiment }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const requestRef = useRef<number>(0)
    const selectedTag = useSelector(sentimentorSelectedTagSelector);
    const appliedFilters = useSelector(sentimentorAppliedFiltersSelector)
    const isFetching = useSelector(sentimentorTrendingPostsFetchingSelector)[sentiment || "undefined"]
    const { onSelectTag, onSetPostsCount, onSetIsFetchingTrendingPosts } = useSentimentorActions();
    const [data, setData] = useState<{ count: number, posts: ITrendingPost[] }>({ count: 0, posts: [] })


    const fetchPosts = useCallback(async ({offset, requestOrder, appliedFilters, tag}: IFetchPostsParams) => {
        if(offset % 50 !==0) {
            return
        }
        const filters: ISentimentorFilters = {
            ...appliedFilters,
            tag,
        }
        if (token) {
            onSetIsFetchingTrendingPosts(sentiment || "undefined", true)
            const [dataRes, dataErr] = await handle(Sentimentor.getPosts(token, filters, offset, sentiment))
            if (dataRes && requestOrder === requestRef.current) {
                onSetIsFetchingTrendingPosts(sentiment || "undefined", false)
                setData((p) => ({ count: dataRes.count, posts: [...p.posts, ...dataRes.posts] }))
            }
            if (dataErr) {
                onSetIsFetchingTrendingPosts(sentiment || "undefined", false)
                console.log(dataErr)
            }
        }
    }, [sentiment])


    const fetchPostsDebounced = useCallback(debounce(fetchPosts, 600), [fetchPosts]);






    //Remove post from local state
    const handleRemovePost = useCallback((id: string) => {
        setData(p => ({ ...p, posts: p.posts.filter(p => p.id !== id) }))
    }, [])


    const setPostProccessed = useCallback((id: string, is_processed: boolean) => {
        setData(p => {
            const index = p.posts.findIndex(post => post.id === id)
            const post = { ...p.posts[index], is_processed }
            const posts = [...p.posts]
            posts.splice(index, 1, post)
            return { ...p, posts }
        })
    }, [data.posts])


    const onChangeDefamatory = useCallback((id: string) => {
        setData(p => {
            const index = p.posts.findIndex(post => post.id === id)
            const post = { ...p.posts[index], defamatory: !p.posts[index].defamatory }
            const posts = [...p.posts]
            posts.splice(index, 1, post)
            return {
                ...p,
                posts
            }
        })
    }, [])

    const onUpdateType = useCallback((id: string, post_type: string[]) => {
        setData(p => {
            const index = p.posts.findIndex(post => post.id === id)
            const post = { ...p.posts[index], post_type }
            const posts = [...p.posts]
            posts.splice(index, 1, post)
            return { ...p, posts }
        })
    }, [])



    const handleUpdateScore = useCallback((id: string, score: number) => {
        setData(p => {
            const index = p.posts.findIndex(post => post.id === id)
            const post = { ...p.posts[index], score }
            const posts = [...p.posts]
            posts.splice(index, 1, post)
            return { ...p, posts }
        })
    }, [])

    const handleSetInSheets = useCallback((id: string, is_in_sheet: boolean) => {
        setData(p => {
            const index = p.posts.findIndex(post => post.id === id)
            const post = { ...p.posts[index], is_in_sheet }
            const posts = [...p.posts]
            posts.splice(index, 1, post)
            return { ...p, posts }
        })
    }, [])



    const addKeywordToPost = useCallback((id: string, keyword: SentimentorKeyword) => {
        setData(p => {
            const index = p.posts.findIndex(post => post.id === id)
            const keywords = [keyword]
            if (p.posts[index].keywords) keywords.unshift(...p.posts[index].keywords as SentimentorKeyword[])
            const post = { ...p.posts[index], keywords }
            const posts = [...p.posts]
            posts.splice(index, 1, post)
            return { ...p, posts }
        })
    }, [])





    const noDataMessage: string | undefined = useMemo(() => {
        if (selectedTag && data.posts.length === 0) {
            return t("ranking_no-data_filter");
        }
        if (data.posts.length === 0) {
            return t("ranking_no-data");
        }
    }, [data.posts, selectedTag, t]);


    const hasMore = useMemo(() => {
        if (data.posts.length === 0) return true;
        return data.posts.length < data.count;
    }, [data]);


    const handleResetData = useCallback(() => {
        setData({ count: 0, posts: [] })
        fetchPostsDebounced({offset: 0, requestOrder: ++requestRef.current, appliedFilters, tag: selectedTag?.text})
    }, [fetchPostsDebounced, appliedFilters, selectedTag])


    useEffect(() => {
        handleResetData()
    }, [handleResetData])


    useEffect(() => {
        onSetPostsCount(sentiment || "undefined", data.posts.length)
    }, [data])

    return <StyledCard>
        <StyledBox>
            <StyledTitle>
                {title}
                {selectedTag && (
                    <>
                        <span>Tag filter: {selectedTag?.text}</span>{" "}
                        <ActionBtn onClick={() => onSelectTag(null)}>
                            <NoIcon />
                        </ActionBtn>
                    </>
                )}
            </StyledTitle>
        </StyledBox>
        {noDataMessage && !isFetching && (
            <StyledNoData>{noDataMessage}</StyledNoData>
        )}
        {isFetching && <StyledLoader />}
        <TrendingWrapper id={title}>
            <InfiniteScroll
                dataLength={data.posts.length}
                next={() => fetchPostsDebounced({offset: data.posts.length, requestOrder: requestRef.current, appliedFilters, tag: selectedTag?.text})}
                hasMore={hasMore}
                loader={<></>}
                scrollableTarget={title}
                scrollThreshold={0.98}
            >
                {data.posts.map((post) => {
                    return <TrendingPostComponent onUpdateScore={(s: any) => handleUpdateScore(post.id, s)} post={post} key={post.id} onRemovePost={() => handleRemovePost(post.id)} onSetProcessed={(p: any) => setPostProccessed(post.id, p)} onResetPosts={handleResetData} onChangeDefamatory={() => onChangeDefamatory(post.id)} updateType={(post_type: any) => onUpdateType(post.id, post_type)} onAddKeywordToPost={(k: any) => addKeywordToPost(post.id, k)} onSetInSheets={(is: boolean) => handleSetInSheets(post.id, is)} />;
                })}
            </InfiniteScroll>
        </TrendingWrapper>
    </StyledCard>
})

export default withErrorBoundaryHOC(TrendingPostsComponent)
