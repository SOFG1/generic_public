import React, { useCallback, useMemo, useState, useEffect } from "react"
import styled from "styled-components"
import { Dropdown } from "../../UI/Dropdown"
import { desktopBp } from "../../styles/variables"
import { Button } from "../../UI/Button"
import { activityList } from "../../config/userActivityList"
import { useTranslation } from "react-i18next"
import { Input } from "../../UI/Input"
import { IAIPostParams, Sentimentor } from "../../api/sentimentor"
import { useSelector } from "react-redux"
import { sentimentorIsFetchingAISelector, sentimentorSelectedAIPostSelector, sentimentorSelectedPostsSelector } from "../../store/sentimentor/selectors"
import { useSentimentorActions } from "../../store/sentimentor"
import FakeProgressBar from "../common/FakeProgressBar/FakeProgressBar"
import { useUserState } from "../../store/user"
import { handle } from "../../api"


const itemOptions = [
    { item: "Post", value: "Post" },
    { item: "Tweet", value: "Tweet" },
    { item: "Instagram story", value: "Instagram story" },
    { item: "Facebook status update", value: "Facebook status update" },
    { item: "LinkedIn article", value: "LinkedIn article" },
    { item: "YouTube script", value: "YouTube script" },
    { item: "Podcast script", value: "Podcast script" },
    { item: "Email newsletter", value: "Email newsletter" },
    { item: "Presentation slides", value: "Presentation slides" },
    { item: "Infographic design", value: "Infographic design" },
    { item: "Blog post", value: "Blog post" },
    { item: "Video tutorial", value: "Video tutorial" },
    { item: "Podcast episode", value: "Podcast episode" },
    { item: "Newsletter", value: "Newsletter" },
    { item: "Case study", value: "Case study" },
    { item: "Slide presentation", value: "Slide presentation" },
    { item: "E-book", value: "E-book" },
    { item: "Whitepaper", value: "Whitepaper" },
    { item: "Webinar", value: "Webinar" },
    { item: "Political strategy overview", value: "Political strategy overview" },
    { item: "SWOT analysis", value: "SWOT analysis" },
    { item: "Messages box's and target audience per message", value: "Messages box's and target audience per message" },
];

const SMOptions = [
    { item: "Facebook", value: "facebook" },
    { item: "Instagram", value: "instagram" },
    { item: "Twitter", value: "twitter" },
    { item: "LinkedIn", value: "linkedIn" },
    { item: "Pinterest", value: "pinterest" },
    { item: "YouTube", value: "youTube" },
    { item: "TikTok", value: "tikTok" },
    { item: "Snapchat", value: "snapchat" },
    { item: "Reddit", value: "reddit" },
    { item: "Tumblr", value: "tumblr" },
];

const StyledWrapper = styled.div`
    padding: 0 3.65vw;
    @media screen and (max-width: ${desktopBp}) {
        padding: 0 46px;
    }
    @media screen and (max-width: 450px) {
        padding: 0 10px;
    }
`

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.46vw 2.60vw;
    margin-bottom: 1.61vw;
    @media screen and (max-width: ${desktopBp}) {
        gap: 18px 33px;
        margin-bottom: 20px;
    }
    @media screen and (max-width: 1100px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`

const StyledBox = styled.div`
    display: flex;
    flex-grow: 1;
    gap: 1.30vw;
    @media screen and (max-width: ${desktopBp}) {
        gap: 16px;
    }
`

const StyledLabel = styled.p`
    margin: 0;
    font-size: 0.73vw;
    min-width: 4.58vw;
    flex-shrink: 0;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 9px;
        min-width: 58px;
    }
`

const StyledDropdown = styled(Dropdown)`

`;

const StyledInput = styled(Input)`

`;


const StyledButton = styled(Button)`
    font-size: 0.73vw;
    border-radius: 100px;
    width: 7.24vw;
    height: 1.88vw;
    margin: 2.19vw auto 0;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 9px;
        width: 91px;
        height: 24px;
        margin-top: 27px;
    }
`


const CancelButton = styled(StyledButton)`
    margin: 0;
    height: 32px;
`

const ClearBtn = styled(CancelButton)`
    display: inline-flex;
    margin-inline-start: 10px;

`

const StyledProgressBar = styled(FakeProgressBar)`
    width: 100%;
`


const StyledText = styled.p`
    margin: 0;
    text-align: center;
`

const StyledTextarea = styled(Input)`
    textarea {
        resize: none;
        min-height: 100px;
    }
    margin-bottom: 12px;
`


const atitudeOptions = [
    { item: "positive", value: "positive" },
    { item: "negative", value: "negative" },
]

interface IProps {
    cancelled: boolean
    setCancelled: (c: boolean) => void
}

const CreateAIPostComponent = React.memo(({ cancelled, setCancelled }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const AIPost = useSelector(sentimentorSelectedAIPostSelector);
    const selectedTrendingPosts = useSelector(sentimentorSelectedPostsSelector)
    const isFetchingAI = useSelector(sentimentorIsFetchingAISelector);
    const { onCreateAIPost, onRemoveAIPost, onSelectTrendingPosts } = useSentimentorActions();
    const [item, setItem] = useState<string>("");
    const [socialMedia, setSocialMedia] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [topic, setTopic] = useState<string>("");
    const [additionalInfo, setAdditionalInfo] = useState<string>("");
    const [count, setCount] = useState<string>("10");
    const [length, setLength] = useState<"words" | "characters">("words");
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [attitude, setAttitude] = useState<string | null>(null)


    const handleClear = useCallback(() => {
        onSelectTrendingPosts([])
        setItem("")
        setSocialMedia("")
        setLanguage("")
        setLanguage("")
        setTopic("")
        setAdditionalInfo("")
        setCount("10")
        setLength("words")
    }, [])



    const handleCreate = useCallback(() => {
        const params: IAIPostParams = {
            item,
            social_media: socialMedia,
            language,
            topic,
            additional_info: additionalInfo,
            count,
            length,
            attitude
        };
        onCreateAIPost(params);
    }, [item, socialMedia, language, topic, additionalInfo, count, length, attitude]);



    const handleDelete = useCallback(async () => {
        if (token && AIPost && !isDeleting) {
            setIsDeleting(true)
            const [dataRes, dataErr] = await handle(Sentimentor.deleteAIPost(token, AIPost.id))
            if (dataRes) {
                console.log(dataRes)
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }

    }, [token, AIPost, isDeleting])


    const lengthOptions = useMemo(() => {
        return [
            { item: t("ranking_ai-characters"), value: "characters" },
            { item: t("ranking_ai-words"), value: "words" },
        ]
    }, [t])



    //Delete AI post in DB if it has been canceled
    useEffect(() => {
        if (AIPost && cancelled) {
            handleDelete()
        }
    }, [AIPost, cancelled, handleDelete])


    //Delete AI Post in store if it has been cancelled
    useEffect(() => {
        if (AIPost && cancelled && !isFetchingAI) {
            setCancelled(false)
            setIsDeleting(false)
            onRemoveAIPost(AIPost.id)
        }
    }, [AIPost, cancelled, isFetchingAI])




    //Fill data according to selected posts
    useEffect(() => {
        if (selectedTrendingPosts.length) setItem("Post")
        if (selectedTrendingPosts.length) {
            const smList: string[] = []
            selectedTrendingPosts.forEach(p => {
                if (p.network && !smList.includes(p.network)) {
                    smList.push(p.network)
                }
            })
            setSocialMedia(smList.join(", "))
        }
        if (selectedTrendingPosts.length) {
            const langsList: string[] = []
            selectedTrendingPosts.forEach(p => {
                if (p.lang && !langsList.includes(p.lang)) {
                    langsList.push(p.lang)
                }
            })
            setLanguage(langsList.join(", "))
        }
        if (selectedTrendingPosts.length) {
            const topicsList: string[] = []
            selectedTrendingPosts.forEach(p => {
                if (p.topics && !topicsList.includes(p.topics)) {
                    topicsList.push(p.topics)
                }
            })
            setTopic(topicsList.join("\n"))
        }
        if (selectedTrendingPosts.length) {
            const textsList: string[] = []
            selectedTrendingPosts.forEach(p => {
                if (p.post_text && !textsList.includes(p.post_text)) {
                    textsList.push(p.post_text)
                }
            })
            setAdditionalInfo(`Reference posts:\n${textsList.join("\n")}`)
        }
        if (selectedTrendingPosts.length) setAttitude("positive")
        if (!selectedTrendingPosts.length) setAttitude(null)
    }, [selectedTrendingPosts])




    return <StyledWrapper>
        {selectedTrendingPosts.length > 0 && <>
            <StyledLabel>{t("ranking_ai-selected_posts", { count: selectedTrendingPosts.length })}<ClearBtn data-action={activityList["rankings-clear-selected-posts"]} onClick={handleClear}>{t("ranking_ai-clear")}</ClearBtn></StyledLabel>
        </>}
        <StyledGrid>
            <StyledBox>
                <StyledDropdown
                    label={t("ranking_ai-label")}
                    placeholder={t("ranking_ai-label")}
                    value={item}
                    onSelect={setItem}
                    options={itemOptions}
                />
            </StyledBox>
            <StyledBox>
                <StyledDropdown
                    label={t("ranking_ai-sm-label")}
                    placeholder={t("ranking_ai-sm-label")}
                    isMultiSelect={true}
                    value={socialMedia}
                    onSelect={setSocialMedia}
                    options={SMOptions}
                />
            </StyledBox>
            <StyledBox>
                <StyledInput
                    type="text"
                    name="language"
                    label={t("ranking_ai-lang-label")}
                    placeholder={t("ranking_ai-lang-label")}
                    value={language}
                    onChange={setLanguage}
                />
            </StyledBox>
            <StyledBox>
                <StyledInput
                    type="number"
                    name="words"
                    label={t("ranking_ai-limit-label")}
                    placeholder={t("ranking_ai-limit-label")}
                    value={count}
                    onChange={setCount}
                />
            </StyledBox>
            <StyledBox>
                <StyledDropdown
                    label={t("ranking_ai-length-label")}
                    placeholder={t("ranking_ai-length-label")}
                    value={length}
                    options={lengthOptions}
                    onSelect={setLength}
                />
            </StyledBox>
            {selectedTrendingPosts.length > 0 && <StyledBox>
                <StyledDropdown
                    label={t("ranking_ai-attitude")}
                    placeholder={t("ranking_ai-attitude")}
                    value={attitude || ""}
                    options={atitudeOptions}
                    onSelect={setAttitude}
                />
            </StyledBox>}
        </StyledGrid>
        <StyledTextarea
            isTextarea={true}
            name="info"
            type="text"
            label={t("ranking_ai-topic-label")}
            placeholder={t("ranking_ai-topic-label")}
            value={topic}
            onChange={setTopic}
        />
        <StyledTextarea
            isTextarea={true}
            name="info"
            type="text"
            label={t("ranking_ai-ad_info-label")}
            placeholder={t("ranking_ai-ad_info-label")}
            value={additionalInfo}
            onChange={setAdditionalInfo}
        />
        {!isFetchingAI && !cancelled && !isDeleting && <StyledButton onClick={handleCreate} data-action={activityList["rankings-generate-AIpost"]}>{t("ranking_ai-generate")}</StyledButton>}
        {isFetchingAI && !cancelled && <StyledBox>
            <StyledProgressBar />
            <CancelButton onClick={() => setCancelled(true)} data-action={activityList["rankings-cancel-AIpost"]}>{t("ranking_ai-cancel")}</CancelButton>
        </StyledBox>}
        {cancelled && <StyledText>{t("ranking_ai-cancelling")}</StyledText>}
    </StyledWrapper>
})


export default CreateAIPostComponent
