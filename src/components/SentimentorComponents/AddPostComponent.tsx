import React, { useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { Checkbox, Input, SingleInputDate } from "../../UI/Input"
import { Button } from "../../UI/Button"
import { desktopBp } from "../../styles/variables"
import { useTranslation } from "react-i18next"
import { activityList } from "../../config/userActivityList"
import { usePermissions, useUserState } from "../../store/user"
import { handle } from "../../api"
import { IManualPostParams, Sentimentor } from "../../api/sentimentor"
import { useAppActions } from "../../store/app"
import { useSelector } from "react-redux"
import { sentimentorFiltersDataSelector, sentimentorKeywordsSelector } from "../../store/sentimentor/selectors"
import { networkOptions, useSentimentorActions } from "../../store/sentimentor"
import { DropdownWithSearch } from "../../UI/Dropdown"
import { getFormatDate } from "../../utils"
import { detectNetwork } from "../../utils/detectNetwork"
import { settingsPostTypesSelector, useSettingsActions } from "../../store/settings"


const StyledTitle = styled.p`
    font-size: 1.67vw;
    margin: 0 0 2.50vw;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 21px;
        margin: 0 0 31px;
    }
`

const StyledInput = styled(Input)`
    width: 33.85vw;
    max-width: 100%;
    margin-bottom: 2.08vw;
    @media screen and (max-width: ${desktopBp}) {
        width: 425px;
        margin-bottom: 26px;
    }
`

const StyledDropdown = styled(DropdownWithSearch)`
    margin-bottom: 20px;
`

const StyledBtn = styled(Button)`
    width: 7.92vw;
    margin-inline-start: auto;
    border-radius: 100px; 
    @media screen and (max-width: ${desktopBp}) {
        width: 99px;
    }
`



const StyledCheckbox = styled(Checkbox)`
    margin-bottom: 20px;

`

const AddPostComponent = React.memo(() => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const keywords = useSelector(sentimentorKeywordsSelector)
    const post_types = useSelector(settingsPostTypesSelector)
    const filtersData = useSelector(sentimentorFiltersDataSelector)
    const { onGetKeywords, onGetFilters } = useSentimentorActions()
    const permissions = usePermissions("Settings")
    const { onShowAlert } = useAppActions()
    const { onGetPostTypes } = useSettingsActions()
    const [url, setUrl] = useState<string>("")
    const [selectedKeywords, setSelectedKeywords] = useState<string>("")
    const [selectedType, setSelectedType] = useState<string>("")
    const [selectedNetwork, setSelectedNetwork] = useState<string>("")
    const [selectedLanguage, setSelectedLanguage] = useState<string>("")
    const [selectedDefamatory, setSelectedDefamatory] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [score, setScore] = useState<string>("0")
    const [isFetching, setIsFetching] = useState<boolean>(false)


    const keywordsOptions = useMemo(() => {
        return keywords.map(k => ({ item: k.word, value: k.id }))
    }, [keywords])


    const languageOptions = useMemo(() => {
        return filtersData.lang.map(l => ({ item: l, value: l }))
    }, [filtersData])




    const typesOptions = useMemo(() => {
        return post_types.map(type => ({ item: type, value: type }))
    }, [post_types])

    const handleChangeScore = (val: string) => {
        if (Number(val) < 0) {
            setScore("0");
            return;
        }
        if (Number(val) > 10) {
            setScore("10");
            return;
        }
        setScore(val);
    };


    const handleAddPost = useCallback(async () => {
        if (token) {
            const params: IManualPostParams = { link: url, date: getFormatDate(selectedDate), network: selectedNetwork, lang: selectedLanguage ? selectedLanguage : null, score: Number(score) }
            if (selectedKeywords) {
                params.keyword_id = selectedKeywords.split(",").filter(id => id).map(id => Number(id))
            }
            if (selectedType) params.post_type = selectedType
            params.defamatory = selectedDefamatory
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.addPostManually(token, params))
            setIsFetching(false)
            if (!dataErr) {
                onShowAlert(true, t("ranking_manual_post-success"))
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
            }
        }
    }, [token, url, selectedKeywords, selectedType, selectedDefamatory, selectedDate, selectedNetwork, selectedLanguage, score, t])


    useEffect(() => {
        onGetKeywords()
        onGetPostTypes()
    }, [])


    //Detect network automatically
    useEffect(() => {
        const detected = detectNetwork(url)
        if (detected) setSelectedNetwork(detected)
    }, [url])


    useEffect(() => {
        onGetFilters()
    }, [])


    return <>
        <StyledTitle>{t("ranking_manual_post-title")}</StyledTitle>
        <StyledInput type="text" name="url" label={t("ranking_manual_post-url")} value={url} onChange={setUrl} />
        <StyledDropdown label={t("ranking_manual_post-keyword")} isMultiSelect={true} placeholder={t("ranking_manual_post-keyword")} value={selectedKeywords} options={keywordsOptions} onSelect={setSelectedKeywords} />
        <StyledDropdown label={t("ranking_manual_post-network")} placeholder={t("ranking_manual_post-network")} value={selectedNetwork} options={networkOptions} onSelect={setSelectedNetwork} />
        <StyledDropdown label={t("ranking_manual_post-language")} placeholder={t("ranking_manual_post-language")} value={selectedLanguage} options={languageOptions} onSelect={setSelectedLanguage} />



        <StyledInput type="number" name="score" label={t("ranking_manual_post-score")} value={score} onChange={handleChangeScore} />


        {permissions.post_types && (
            <StyledDropdown label={t("ranking_manual_post-type")} placeholder={t("ranking_manual_post-type")} value={selectedType} options={typesOptions} onSelect={setSelectedType} />
        )}
        <StyledCheckbox label={t("ranking_manual_post-defamatory")} isActive={selectedDefamatory} onChange={setSelectedDefamatory} />
        <SingleInputDate label={t("ranking_manual_post-date")} startDate={selectedDate} showTimeSelect={false} onChange={(v) => setSelectedDate(v)} />
        <StyledBtn data-action={activityList["monitoring-add-post"]} onClick={handleAddPost} disabled={isFetching}>{t("ranking_manual_post-btn")}</StyledBtn>
    </>
})

export default AddPostComponent