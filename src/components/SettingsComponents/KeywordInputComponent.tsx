import React, { useCallback, useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { Input } from "../../UI/Input";
import { useTranslation } from "react-i18next";


const StyledWrapper = styled.div`
    position: relative;
    width: 100%;
  margin: 5px 0;
`



const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`

const StyledPopup = styled.p`
    position: absolute;
    width: 300px;
    padding: 10px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    bottom: 100%;
    left: 0;
    animation: ${fadeOut} 3000ms 500ms forwards;
`

const StyledInput = styled(Input)`

`;



interface IProps {
    value: string
    onChange: (v: string) => void
}

type PopupType = "#" | "|" | "&" | '"' | null

const KeywordInputComponent = React.memo(({ value, onChange }: IProps) => {
    const { t } = useTranslation()
    const [popup, setPopup] = useState<PopupType>(null)

    const handleChangeValue = useCallback((v: string) => {
        if (v.includes("#")) {
            setPopup("#")
            return
        }
        if (v.includes("|")) {
            setPopup("|")
            return
        }
        // if (v.includes('"')) {
        //     setPopup('"')
        //     return
        // }
        if (v.includes("&")) {
            setPopup("&")
            return
        }
        onChange(v)
    }, [])



    useEffect(() => {
        let didUpdated = false
        if (popup) {
            setTimeout(() => {
                //Prevent setting to null if it's been changed
                if (!didUpdated) {
                    setPopup(null)
                }
            }, 3500)
        }
        return () => {
            didUpdated = true
        }
    }, [popup])

    return <StyledWrapper>
        {popup && <StyledPopup key={popup}>{t(`settings_keywords-hint${popup}`)}</StyledPopup>}
        <StyledInput
            type="text"
            name="word"
            label={t("settings_keywords-label")}
            value={value}
            onChange={handleChangeValue}
        />
    </StyledWrapper>
})

export default KeywordInputComponent
