import React, { useState, useCallback } from "react"
import styled from "styled-components"
import { desktopBp } from "../../styles/variables"
import { Input } from "../../UI/Input"
import { Dropdown } from "../../UI/Dropdown"
import { useUserState } from "../../store/user"
import { IAIVideoParams, Sentimentor } from "../../api/sentimentor"
import { handle } from "../../api"
import { Loader } from "../../UI/Spinners"
import { useAppActions } from "../../store/app"
import { Button } from "../../UI/Button"
import { useTranslation } from "react-i18next"
import { activityList } from "../../config/userActivityList"

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 3.65vw;
    min-height: 300px;
    box-sizing: border-box;
    gap: 20px;
    @media screen and (max-width: ${desktopBp}) {
        padding: 46px;
    }
    @media screen and (max-width: 450px) {
        padding: 10px;
    }
`




const StyledHeader = styled.div`
    display: flex;
    gap: 10px;
`

const StyledInput = styled(Input)`
    
`

const StyledDropdown = styled(Dropdown)`
    
`

const StyledButton = styled(Button)`
    font-size: 0.73vw;
    border-radius: 100px;
    min-width: 7.24vw;
    width: fit-content;
    height: 1.88vw;
    margin: 0 auto;
    white-space: nowrap;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 9px;
        min-width: 91px;
        height: 24px;
    }
`


const StyledLoader = styled(Loader)`
    height: 50px;
    width: 50px;
    margin: 25px auto;
`

const StyledText = styled.p`
    margin: 0;
`

interface IAIVideo {
    id: number
    prompt: string
    pictory_job_id: string
    preview: string
}

const AIGenerateVideoComponent = React.memo(() => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { onShowAlert } = useAppActions()
    const [topic, setTopic] = useState<string>("")
    const [duration, setDuration] = useState<number>(10)
    const [chain, setChain] = useState<number>(0)
    const [lang, setLang] = useState<string>("en")
    const [generatedVideo, setGeneratedVideo] = useState<IAIVideo | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)



    const handleGenerate = useCallback(async () => {
        const params: IAIVideoParams = {
            topic,
            length: duration,
            chain,
            language_code: lang
        }
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.generateAIVideo(token, params))
            setIsFetching(false)
            if (dataRes) {
                setGeneratedVideo(dataRes)
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
            }
        }
    }, [token, topic, duration, chain, lang])


    const handleDownload = useCallback(async () => {
        if (token && generatedVideo) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.renderAIVideo(token, generatedVideo.id))
            setIsFetching(false)
            if (!dataErr) {
                onShowAlert(true, t("ranking_ai-video_download-success"))
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
            }
        }
    }, [generatedVideo, t])


    return <StyledWrapper>
        <StyledHeader>
            <StyledInput name="topic" type="text" label={t("ranking_ai-video_topic")} placeholder={t("ranking_ai-video_topic")} value={topic} onChange={setTopic} />
            <StyledInput name="duration" type="text" label={t("ranking_ai-video_duration")} placeholder={t("ranking_ai-video_duration")} value={duration} onChange={setDuration} />
            <StyledInput name="chain" type="text" label={t("ranking_ai-video_chain")} placeholder={t("ranking_ai-video_chain")} value={chain} onChange={setChain} />
            <StyledDropdown label={t("ranking_ai-video_lang")} placeholder={t("ranking_ai-video_lang")} value={lang} onSelect={setLang} options={[{ item: "English", value: "en" }]} />
        </StyledHeader>
        {isFetching && <StyledLoader />}
        {generatedVideo && <><StyledText>{t("ranking_ai-video_prompt")}</StyledText><StyledText>{generatedVideo.prompt}</StyledText></>}
        {generatedVideo && <StyledButton as="a" target="_blank"  data-action={activityList["preview-ai-video"]} href={generatedVideo.preview}>{t("ranking_ai-video_preview")}</StyledButton>}
        {generatedVideo && <StyledButton disabled={isFetching} data-action={activityList["download-ai-video"]} onClick={handleDownload}>{t("ranking_ai-video_download")}</StyledButton>}
        <StyledButton data-action={activityList["generate-ai-video"]} disabled={isFetching} onClick={handleGenerate}>{generatedVideo ? t("ranking_ai-video_regenerate") : t("ranking_ai-video_generate")}</StyledButton>
    </StyledWrapper>
})


export default AIGenerateVideoComponent