import React, { useMemo } from "react"
import styled from "styled-components"
import { Dropdown } from "../../UI/Dropdown"
import { useTranslation } from "react-i18next"


const StyledDropdown = styled(Dropdown)`
    
`


interface IProps {
    value: string
    onChange: (v: string) => void
    answers?: any[]
}

const VoterAnswerDropdown = React.memo(({value, onChange, answers}: IProps) => {
    const { t } = useTranslation()

    const options = useMemo(() => {
        const arr = []
        if(!answers?.find(a => a.answer_words === "yes")) {
            arr.push({item: t("settings_answer-yes"), value: "yes", color: "#65C763"})
        }
        if(!answers?.find(a => a.answer_words === "no")) {
            arr.push({item: t("settings_answer-no"), value: "no", color: "#EB5B3C"})
        }
        if(!answers?.find(a => a.answer_words === "unknown")) {
            arr.push({item: t("settings_answer-unknown"), value: "unknown", color: "#AAAAAA"})
        }
        return arr
    }, [t, answers])


    return <StyledDropdown label={t("settings_answers-label")} placeholder={t("settings_answers-label")} value={value} onSelect={onChange} options={options} />
})

export default VoterAnswerDropdown