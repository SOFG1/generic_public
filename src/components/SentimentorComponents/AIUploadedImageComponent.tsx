import React, { useCallback, useMemo } from "react"
import styled from "styled-components"
import { TrashIcon } from "../../UI/Svg"
import { desktopBp } from "../../styles/variables"
import { useTranslation } from "react-i18next"


const StyledWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    align-self: center;
    height: 100%;
    flex-direction: column;
    align-items: center;
    gap: 0.52vw;
    @media screen and (max-width: ${desktopBp}) {
        gap: 7px;
    }
`

const StyledLabel = styled.p`
    margin: 0 0 5px;
    font-size: 0.73vw;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 9px;
    }
`

const StyledImage = styled.img`
    height: 7.81vw;
    width: 7.81vw;
    object-fit: cover;
    margin-bottom: 1.56vw;
    @media screen and (max-width: ${desktopBp}) {
        height: 98px;
        width: 98px;
        object-fit: cover;
        margin-bottom: 20px;
    }
`

const StyledBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.52vw;
    @media screen and (max-width: ${desktopBp}) {
        gap: 7px;
    }
`

const DeleteButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    background-color: #fff;
    padding: 0;
    height: 1.56vw;
    width: 1.56vw;
    border-radius: 50%;
    svg {
        height: 63%;
        width: 63%;
    }
    :disabled {
        cursor: not-allowed;
    }
    cursor: pointer;
    @media screen and (max-width: ${desktopBp}) {
        height: 20px;
        width: 20px;
    }
`

const StyledButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
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
    @media screen and (max-width: ${desktopBp}) {
        font-size: 8px;
        height: 16px;
        width: 88px;
    }
`

const StyledInput = styled.input`
    display: none;
`





interface IProps {
    image: File | null
    onChange: (i: File | null) => void
}


const AIUploadedImageComponent = React.memo(({ image, onChange }: IProps) => {
    const { t } = useTranslation()

    const previewUrl = useMemo(() => {
        return image ? URL.createObjectURL(image) : ""
    }, [image])



    const handleChange = useCallback((e: any) => {
        if (e.target?.files && e.target?.files[0]) {
            onChange(e.target?.files[0])
        }
    }, [])


    return <StyledWrapper>
        <StyledLabel>{t("ranking_ai-uploaded_image")}</StyledLabel>
        {image && <>
            <StyledImage src={previewUrl} />
        </>}
        <StyledBox>
            <StyledButton>{t("ranking_ai-upload_image")}<StyledInput type="file" accept="image/*" onChange={handleChange} /></StyledButton>
            {image && <>
                <DeleteButton onClick={() => onChange(null)}>
                    <TrashIcon />
                </DeleteButton>
            </>}
        </StyledBox>
    </StyledWrapper>
})

export default AIUploadedImageComponent