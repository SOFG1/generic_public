import React, { useCallback, useState } from "react"
import { handle } from "../../api";
import styled from "styled-components";
import { useUserState } from "../../store/user";
import { useAppActions } from "../../store/app";
import { Sentimentor } from "../../api/sentimentor";
import { desktopBp } from "../../styles/variables";
import { useTranslation } from "react-i18next";


const StyledWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    height: 100%;
    flex-direction: column;
    align-items: center;
    gap: 0.52vw;
    height: 12.76vw;
    @media screen and (max-width: ${desktopBp}) {
        gap: 7px;
        height: 160px;
    }
`


const StyledTextarea = styled.textarea`
    resize: none;
    width: 100%;
    font-family: inherit;
    font-size: 0.63vw;
    flex-grow: 1;
    flex-shrink: 0;
    ::-webkit-scrollbar {
        width: 12px;
        border: 0;
        border-inline-start: 1px solid #000;
    }
    @media screen and (max-width: ${desktopBp}) {
        font-size: 8px;
    }
`

const StyledButton = styled.button<{ selected?: boolean }>`
    white-space: nowrap;
    font-size: 12px;
    height: 24px;
    border-radius: 100px;
    flex-shrink: 0;
    min-width: 100px;
    border: 1px solid #000;
    background: #FFF;
    cursor: pointer;
    transition: 150ms;
    flex-grow: 0;
    :disabled {
        cursor: not-allowed;
    }
    :hover:not(:disabled) {
        background-color: #000;
        color: #fff;
    }
    ${({ selected }) => selected && ` background-color: #000; color: #fff;`}
`


interface IProps {
    selectedImageId?: number
    setIsFetching: (f: boolean) => void
}

const AIPictureEditComponent = React.memo(({ setIsFetching, selectedImageId }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { onShowAlert } = useAppActions()
    const [editPrompt, setEditPrompt] = useState("")

    const handleEditPicture = useCallback(async () => {
        setIsFetching(true);
        if (token && selectedImageId) {
            const [dataRes, dataErr] = await handle(
                Sentimentor.editAIPostPicture(token, selectedImageId, editPrompt)
            );
            if (dataRes) {
                onShowAlert(
                    true,
                    t("ranking_ai-request_success")
                );
                console.log(dataRes);
            }
            if (dataErr) {
                console.log(dataErr);
            }
        }
    }, [token, editPrompt, selectedImageId, t]);



    return <StyledWrapper>
        <StyledTextarea placeholder={t("ranking_ai-edit_prompt")} value={editPrompt} onChange={(e) => setEditPrompt(e.target.value)} />
        <StyledButton onClick={handleEditPicture}>{t("ranking_ai-edit")}</StyledButton>
    </StyledWrapper>
})

export default AIPictureEditComponent
