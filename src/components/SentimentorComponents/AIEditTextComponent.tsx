import React, {useCallback, useEffect, useState} from "react"
import {IAIPost, useSentimentorActions} from "../../store/sentimentor"
import styled from "styled-components"
import {TrashIcon} from "../../UI/Svg"
import {debounce} from "lodash"
import {ConfirmDeleteFull} from "../common/ConfirmDeleteFull"
import {useTranslation} from "react-i18next"
import {activityList} from "../../config/userActivityList"
import {desktopBp} from "../../styles/variables"
import Upload from "../../UI/Svg/icons/Upload";
import {useSelector} from "react-redux";
import {sentimentorIsFetchingAISelector} from "../../store/sentimentor/selectors";
import {UploadTextToBotFarmComponent} from "./index";
import {usePermissions} from "../../store/user";


const StyledWrapper = styled.div<{ isPreview?: boolean }>`
    ${props => props.isPreview ?
    `
        flex-grow: 1;
        background: #FFF;
        max-width: 31.46vw;
        width: 1000px;
        @media screen and (max-width: ${desktopBp}) {
            max-width: 395px;   
        }
        @media screen and (max-width: 990px) {
            min-width: 0;   
        }
    ` : 
    `
     width: calc(100% - 3.65vw * 2);
     @media(max-width:${desktopBp}) {
       width: calc(100% - 46px * 2);
     }
     `
}

  
`

const StyledHeader = styled.div`
    padding: 0 1.72vw;
    display: flex;
    align-items: center;
    gap: 0.52vw;
    transform: translateY(50%);
    @media screen and (max-width: ${desktopBp}) {
        padding: 0 22px;
        gap: 7px;
    }
`

const StyledModeBtn = styled.button`
    white-space: nowrap;
    font-size: 0.63vw;
    height: 1.25vw;
    width: 7.03vw;
    border-radius: 100px;
    border: 1px solid #000;
    background: #FFF;
    cursor: pointer;
    transition: 150ms;
    :disabled {
        cursor: not-allowed;
    }
    :hover:not(:disabled) {
        background-color: #000;
        color: #fff;
    }
    @media screen and (max-width: ${desktopBp}) {
        font-size: 8px;
        height: 16px;
        width: 88px;
    }
`

const RegenerateButton = styled(StyledModeBtn)`
    height: 1.56vw;
    width: 7.86vw;
    font-size: 0.63vw;
    margin: 0 auto;
    display: block;
    transform: translateY(-50%);
    @media screen and (max-width: ${desktopBp}) {
        height: 20px;
        width: 99px;
        font-size: 8px;
    }
`

const IconButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    background-color: #fff;
    padding: 0;
    height: 1.25vw;
    width: 1.25vw;
    border-radius: 50%;
    :disabled {
        cursor: not-allowed;
    }
    cursor: pointer;
    svg {
        height: 63%;
        width: 63%;
    }
    @media screen and (max-width: ${desktopBp}) {
        height: 16px;
        width: 16px;
    }
`

const StyledContainer = styled.div`
    border-radius: 10px;
    border: 1px solid #000;
    width: 100%;
    overflow: hidden;
`

const Textarea = styled.textarea`
    resize: none;
    font-family: inherit;
    outline: none;
    font-size: 0.73vw;
    border: 0;
    height: 20.20vw;
    padding: 1.46vw 2.08vw;
    box-sizing: border-box;
    width: 100%;
    ::-webkit-scrollbar {
        width: 12px;
        border: 0;
        border-inline-start: 1px solid #000;
    }
    @media screen and (max-width: ${desktopBp}) {
        font-size: 9px;
        border: 0;
        height: 250px;
        padding: 18px 26px;
    }
`

interface IProps {
    post: IAIPost,
    isPreview?:boolean,
}

type TabType = "text" | "prompt"

const AIEditTextComponent = React.memo(({ post, isPreview }: IProps) => {
    const { t } = useTranslation()
    const isFetchingAI = useSelector(sentimentorIsFetchingAISelector);
    const permissions = usePermissions("Ranking");
    const { editAIPostText, onRegeneratePostText, onDeleteAIPost } =
        useSentimentorActions();
    const [tab, setTab] = useState<TabType>("text")
    const [prompt, setPrompt] = useState<string>("")
    const [text, setText] = useState<string>("")
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
    const [isTextUploadModal, setIsTextUploadModal] = useState(false);

    const editTextDebounced = useCallback(debounce(editAIPostText, 1000), []);



    const handleChangeText = useCallback((v: string) => {
        editTextDebounced(post.id, v)
        setText(v)
    }, [editTextDebounced, post.id])

    const handleRegenerate = useCallback(() => {
        onRegeneratePostText(post.id, prompt)
        setTab("text")
    }, [editTextDebounced, post.id, prompt])

    useEffect(() => {
        if (post.text_request?.text) {
            setText(post.text_request?.text);
        }
    }, [post.text_request?.text]);

    useEffect(() => {
        if (post?.text_request?.request) {
            setPrompt(post?.text_request?.request);
        }
    }, [post?.text_request?.request]);

    return <StyledWrapper isPreview = {isPreview}>
        <ConfirmDeleteFull show={confirmDelete} onClose={() => setConfirmDelete(false)} onDelete={() => onDeleteAIPost(post.id)} title={t("ranking_ai-del_warn")} />
        <StyledHeader>
            <StyledModeBtn disabled={isFetchingAI} onClick={() => setTab(tab === "text" ? "prompt" : "text")}>{tab === "text" ? t("ranking_ai-tab_text") : t("ranking_ai-tab_prompt")}</StyledModeBtn>
            <IconButton data-action={activityList["ranking-delete-ai-post"]} disabled={isFetchingAI} onClick={() => setConfirmDelete(true)}><TrashIcon /></IconButton>
            {permissions.post_to_googlesheet && <IconButton data-action={activityList["ranking-upload-ai-post"]} disabled={isFetchingAI} onClick ={()=>setIsTextUploadModal(true)}><Upload fill = "#000"/></IconButton>}
            <IconButton data-action={activityList["ranking-upload-ai-post"]} disabled={isFetchingAI} onClick ={()=>setIsTextUploadModal(true)}><Upload fill = "#000"/></IconButton>
        </StyledHeader>
        <StyledContainer>
            {tab === "text" ? (<Textarea value={text} onChange={(e) => handleChangeText(e.target.value)} />) : (<Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />)}
        </StyledContainer>
        <RegenerateButton  data-action={activityList["ranking-regenerate-ai-post"]} disabled={isFetchingAI} onClick={handleRegenerate}>{t("ranking_ai-regenerate")}</RegenerateButton>

        <UploadTextToBotFarmComponent postText={text} isOpen={isTextUploadModal} onClose={()=>setIsTextUploadModal(false)}/>
    </StyledWrapper>
})

export default AIEditTextComponent
