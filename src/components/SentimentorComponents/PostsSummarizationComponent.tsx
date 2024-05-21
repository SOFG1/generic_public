import React, { useEffect, useState, useCallback, useMemo } from "react"
import { ToolbarButton } from "../../UI/ToolbarButton"
import styled from "styled-components"
import { desktopBp } from "../../styles/variables"
import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { sentimentorSummarizationSelector } from "../../store/sentimentor/selectors"
import { useSentimentorActions } from "../../store/sentimentor"
import { Dropdown } from "../../UI/Dropdown"
import { Input } from "../../UI/Input"
import { Button } from "../../UI/Button"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { Sentimentor } from "../../api/sentimentor"
import { useAppActions } from "../../store/app"
import { Loader } from "../../UI/Spinners"
import { useTranslation } from "react-i18next"
import { activityList } from "../../config/userActivityList"


const StyledContent = styled.div`
  padding-top: 3.23vw;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    padding-top: 41px;
  }
`



const StyledBox = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    gap: 1.30vw;
    margin-bottom: 0.78vw;
    @media screen and (max-width: ${desktopBp}) {
        margin-bottom: 10px;
        gap: 16px;
    }
`

const StyledLabel = styled.p`
    margin: 0;
    font-size: 0.73vw;
    min-width: 4.17vw;
    flex-shrink: 0;
    @media screen and (max-width: ${desktopBp}) {
        min-width: 52px;
        font-size: 9px;
    }
`

const StyledDropdown = styled(Dropdown)`
    max-width: 10.42vw;
    @media screen and (max-width: ${desktopBp}) {
        max-width: 131px;
    }
`;

const StyledInput = styled(Input)`
    max-width: 10.42vw;
    @media screen and (max-width: ${desktopBp}) {
        max-width: 131px;
    }
`;

const StyledButton = styled(Button)`
    font-size: 0.73vw;
    border-radius: 100px;
    width: fit-content;
    min-width: 7.24vw;
    height: 1.88vw;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 9px;
        min-width: 91px;
        height: 24px;
    }
`

const StyledLoader = styled(Loader)`
    height: 1.30vw;
    width: 1.30vw;
    @media screen and (max-width: ${desktopBp}) {
        height: 16px;
        width: 16px;
    }
`

interface IProps {
    opened: boolean
    setOpened: (o: boolean) => void
}


interface ISummarizationList {
    id: number
    name: string
    post_count: number
}

const PostsSummarizationComponent = React.memo(({ opened, setOpened }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const summarizationPosts = useSelector(sentimentorSummarizationSelector)
    const { onShowAlert } = useAppActions()
    const { onSetSummarization } = useSentimentorActions()
    const [newName, setNewName] = useState<string>("")
    const [lists, setLists] = useState<ISummarizationList[]>([])
    const [selectedList, setSelectedList] = useState<number>(0)
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const listsOptions = useMemo(() => {
        return lists.map((l: ISummarizationList) => ({ item: l.name, value: l.id }))
    }, [lists])

    const selectedListCount = useMemo(() => {
        return lists.find(l => l.id === selectedList)?.post_count
    }, [lists, selectedList])

    const handleGetSummarization = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.getSummarization(token))
            setIsFetching(false)
            if (dataRes) {
                setLists(dataRes)
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }
    }, [token])



    const handleCreateNew = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.addSummarization(token, newName))
            setIsFetching(false)
            if (dataRes) {
                onShowAlert(true, t("ranking_summarization-create-success"))
                setLists(p => ([...p, dataRes]))
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
                console.log(dataErr)
            }
        }
    }, [token, newName, t])



    const handleDeleteList = useCallback(async () => {
        if (token && selectedList) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.deleteSummarization(token, selectedList))
            setIsFetching(false)
            if (!dataErr) {
                onShowAlert(true, t("ranking_summarization-delete-success"))
                setLists(p => p.filter(l => l.id !== selectedList))
                setSelectedList(0)
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
                console.log(dataErr)
            }
        }
    }, [token, selectedList, t])



    const handleAddPostsToList = useCallback(async () => {
        if (token && selectedList) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.addSummarizationPosts(token, selectedList, summarizationPosts))
            setIsFetching(false)
            if (dataRes) {
                onShowAlert(true, t("ranking_summarization-add-success", {count: dataRes.added}))
                const newObj = dataRes.obj
                setLists((p: ISummarizationList[]) => {
                    const arr = p.filter(l => l.id !== newObj.id)
                    return [...arr, newObj]
                })
                console.log(dataRes)
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
                console.log(dataErr)
            }
        }
    }, [token, selectedList, summarizationPosts, t])


    const handleClearList = useCallback(async () => {
        if (token && selectedList) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.clearSummarization(token, selectedList))
            setIsFetching(false)
            if (!dataErr) {
                onShowAlert(true, t("ranking_summarization-clear-success"))
                handleGetSummarization()
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
                console.log(dataErr)
            }
        }
    }, [token, selectedList, handleGetSummarization, t])



    const handleSummarizeList = useCallback(async () => {
        if (token && selectedList) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.summarize(token, selectedList))
            setIsFetching(false)
            if (dataRes) {
                onShowAlert(true, dataRes)
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
                console.log(dataErr)
            }
        }
    }, [token, selectedList, handleGetSummarization])



    useEffect(() => {
        if (opened) handleGetSummarization()
        onSetSummarization([])
    }, [opened])

    return <>
        <ToolbarButton opened={opened} onClick={() => setOpened(!opened)} data-action={activityList["ranking-toggle-summarization"]}>
            <p>{t("ranking_summarization")}</p>
        </ToolbarButton>
        {opened && document.getElementById("toolbar-wrapper") && createPortal(<StyledContent>
            <StyledBox>
                <StyledLabel>{t("ranking_summarization-add_label")}</StyledLabel>
                <StyledInput
                    type="text"
                    name="name"
                    label={t("ranking_summarization-name")}
                    placeholder={t("ranking_summarization-name")}
                    value={newName}
                    onChange={setNewName}
                />
                <StyledButton  data-action={activityList["ranking-create-summarization"]} disabled={isFetching} onClick={handleCreateNew}>{t("ranking_summarization-add")}</StyledButton>
            </StyledBox>
            <StyledBox>
                <StyledLabel>{t("ranking_summarization-posts_label")}</StyledLabel>
                <StyledDropdown
                    label={t("ranking_summarization-selected")}
                    placeholder={t("ranking_summarization-selected")}
                    value={selectedList}
                    options={listsOptions}
                    onSelect={setSelectedList}
                />
                {selectedList !== 0 && <>
                    <StyledButton  data-action={activityList["ranking-delete-summarization"]} disabled={isFetching} onClick={handleDeleteList}>{t("ranking_summarization-delete")}</StyledButton>
                    <StyledButton data-action={activityList["ranking-clear-summarization"]} disabled={isFetching} onClick={handleClearList}>{t("ranking_summarization-clear")}</StyledButton>
                    <StyledButton data-action={activityList["ranking-summarize-summarization"]} disabled={isFetching} onClick={handleSummarizeList}>{t("ranking_summarization-summarize")}</StyledButton>
                    <StyledLabel>{selectedListCount} {t("ranking_summarization-contains")}</StyledLabel>
                </>}
            </StyledBox>
            <StyledBox>
                {selectedList !== 0 && <>
                    <StyledButton disabled={isFetching || summarizationPosts.length === 0}  data-action={activityList["ranking-assign-posts-summarization"]} onClick={handleAddPostsToList}>{t("ranking_summarization-add_posts")}</StyledButton>
                </>}
                {summarizationPosts.length !== 0 && <StyledButton  data-action={activityList["ranking-clear-selected-summarization"]} onClick={() => onSetSummarization([])}>{t("ranking_summarization-clear-selected")}</StyledButton>}
                <StyledLabel>{summarizationPosts.length} {t("ranking_summarization-selected_posts")}</StyledLabel>
                {isFetching && <StyledLoader />}
            </StyledBox>
        </StyledContent>, document.getElementById("toolbar-wrapper") as HTMLDivElement)}
    </>
})

export default PostsSummarizationComponent