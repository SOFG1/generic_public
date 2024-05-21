import React, { useCallback } from "react"
import styled from "styled-components"
import { handle } from "../../api"
import { Sentimentor } from "../../api/sentimentor"
import { useUserState } from "../../store/user"
import { useAppActions } from "../../store/app"
import { IAIImageRequest } from "../../store/sentimentor"
import { activityList } from "../../config/userActivityList"
import { desktopBp } from "../../styles/variables"
import { useTranslation } from "react-i18next"



const StyledWrapper = styled.div`
    display: grid;
    align-self: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    height: 10.83vw;
    width: 10.83vw;
    margin: 0 auto;
    @media screen and (max-width: ${desktopBp}) {
        height: 136px;
        width: 136px;
    }
`

const StyledBox = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    gap: 0.52vw;
    @media screen and (max-width: ${desktopBp}) {
        gap: 7px;
    }
`


const StyledButton = styled.button<{ selected?: boolean }>`
    white-space: nowrap;
    font-size: 0.63vw;
    height: 1.56vw;
    border-radius: 100px;
    flex-grow: 1;
    border: 1px solid #000;
    background: #FFF;
    cursor: pointer;
    transition: 150ms;
    flex-grow: 0;
    width: 4.79vw;
    :disabled {
        cursor: not-allowed;
    }
    :hover:not(:disabled) {
        background-color: #000;
        color: #fff;
    }
    ${({ selected }) => selected && ` background-color: #000; color: #fff;`}
    @media screen and (max-width: ${desktopBp}) {
        font-size: 8px;
        height: 20px;
        width: 60px;
    }
`


interface IProps {
    selectedImage?: IAIImageRequest
    setIsFetching: (f: boolean) => void
}

const AIPictureButtonsComponent = React.memo(({ setIsFetching, selectedImage }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { onShowAlert } = useAppActions()


    const handleEditByButton = useCallback(
        async (button: string) => {
            setIsFetching(true);
            if (token && selectedImage) {
                const [dataRes, dataErr] = await handle(
                    Sentimentor.editAIPictureByButton(token, selectedImage.id, button)
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
        },
        [token, selectedImage, t]
    );


    return <StyledWrapper>
        <StyledBox style={{ borderInlineEnd: "1px solid #AAA" }}>
            {selectedImage?.buttons?.includes("V1") && (
                <StyledButton onClick={() => handleEditByButton("V1")} data-action={activityList["rankings-AIpicture-V1"]}>
                    {t("ranking_ai-change", {number: 1})}
                </StyledButton>
            )}
            {selectedImage?.buttons?.includes("U1") && (
                <StyledButton onClick={() => handleEditByButton("U1")} data-action={activityList["rankings-AIpicture-U1"]}>
                    {t("ranking_ai-upscale", {number: 1})}
                </StyledButton>
            )}
        </StyledBox>
        <StyledBox style={{ alignItems: "flex-end" }}>
            {selectedImage?.buttons?.includes("V2") && (
                <StyledButton onClick={() => handleEditByButton("V2")} data-action={activityList["rankings-AIpicture-V2"]}>
                    {t("ranking_ai-change", {number: 2})}
                </StyledButton>
            )}
            {selectedImage?.buttons?.includes("U2") && (
                <StyledButton onClick={() => handleEditByButton("U2")} data-action={activityList["rankings-AIpicture-U2"]}>
                    {t("ranking_ai-upscale", {number: 2})}
                </StyledButton>
            )}
        </StyledBox>
        <StyledBox style={{ borderInlineEnd: "1px solid #AAA", borderTop: "1px solid #AAA" }}>
            {selectedImage?.buttons?.includes("V3") && (
                <StyledButton onClick={() => handleEditByButton("V3")} data-action={activityList["rankings-AIpicture-V3"]}>
                    {t("ranking_ai-change", {number: 3})}
                </StyledButton>
            )}
            {selectedImage?.buttons?.includes("U3") && (
                <StyledButton onClick={() => handleEditByButton("U3")} data-action={activityList["rankings-AIpicture-U3"]}>
                    {t("ranking_ai-upscale", {number: 3})}
                </StyledButton>
            )}
        </StyledBox>
        <StyledBox style={{ alignItems: "flex-end", borderTop: "1px solid #AAA" }}>
            {selectedImage?.buttons?.includes("V4") && (
                <StyledButton onClick={() => handleEditByButton("V4")} data-action={activityList["rankings-AIpicture-V4"]}>
                    {t("ranking_ai-change", {number: 4})}
                </StyledButton>
            )}
            {selectedImage?.buttons?.includes("U4") && (
                <StyledButton onClick={() => handleEditByButton("U4")} data-action={activityList["rankings-AIpicture-U4"]}>
                    {t("ranking_ai-upscale", {number: 4})}
                </StyledButton>
            )}
        </StyledBox>
    </StyledWrapper>
})

export default AIPictureButtonsComponent
