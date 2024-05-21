import React, { useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { colorsChart } from "../../config";
import { Dropdown } from "../../UI/Dropdown";
import { desktopBp } from "../../styles/variables";
import { Input } from "../../UI/Input";
import { IAIPictureTextParams } from "../../api/sentimentor";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div`
    flex-shrink: 0;
    height: 100%;
  width: 100%;
    margin-bottom: 120px;
    @media screen and (max-width: ${desktopBp}) {
  
    }
`


const StyledTextarea = styled.textarea`
    font-family: inherit;
    font-size: 0.63vw;
    border-radius: 5px;
    border: 1px solid #000;
    background: #FFF;
    resize: none;
    padding: 6px 8px;
    width: 100%;
    box-sizing: border-box;
    height: 82px;
    margin-bottom: 0.63vw;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 8px;
        height: 82px;
        margin-bottom: 8px;
    }
`

const StyledBox = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 6px;
    margin-bottom: 0.57vw;
    @media screen and (max-width: ${desktopBp}) {
        margin-bottom: 7px;
    }
`

const StyledLabel = styled.p`
    margin: 0;
    white-space: nowrap;
    font-size: 0.52vw;
    min-width: 3.23vw;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 7px;
        min-width: 41px;
    }
`

const StyledDropdown = styled(Dropdown)`
flex-grow: 1;
label {
  display: none;
}
    margin-bottom: 0;
`;

const ColorOption = styled.div<{ color: string }>`
  padding: 4px;
  min-width: 5.21vw;
  border: 1px solid #000;
  width: 100%;
  display: flex;
  height: 1.04vw;
  box-sizing: border-box;
  border-radius: 100px;
  background-color: ${({ color }) => color};
  @media screen and (max-width: ${desktopBp}) {
    min-width: 65px;
    height: 13px;
  }
`;

const StyledButton = styled.button<{ selected?: boolean }>`
    white-space: nowrap;
    font-size: 0.63vw;
    height: 1.25vw;
    border-radius: 100px;
    flex-shrink: 0;
    min-width: 5.21vw;
    border: 1px solid #000;
    background: #FFF;
    margin: 0 auto;
    display: block;
    cursor: pointer;
    transition: 150ms;
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
        height: 16px;
        min-width: 65px;
    }
`


const fontSizeOptions = [
    { item: "8px", value: 8 },
    { item: "9px", value: 9 },
    { item: "10px", value: 10 },
    { item: "11px", value: 11 },
    { item: "12px", value: 12 },
    { item: "13px", value: 13 },
    { item: "14px", value: 14 },
    { item: "15px", value: 15 },
    { item: "16px", value: 16 },
    { item: "17px", value: 17 },
    { item: "18px", value: 18 },
    { item: "19px", value: 19 },
    { item: "20px", value: 20 },
    { item: "21px", value: 21 },
    { item: "22px", value: 22 },
    { item: "23px", value: 23 },
    { item: "24px", value: 24 },
    { item: "25px", value: 25 },
    { item: "26px", value: 26 },
    { item: "27px", value: 27 },
    { item: "28px", value: 28 },
    { item: "30px", value: 30 },
    { item: "32px", value: 32 },
    { item: "34px", value: 34 },
    { item: "36px", value: 36 },
    { item: "38px", value: 38 },
    { item: "40px", value: 40 },
    { item: "42px", value: 42 },
    { item: "44px", value: 44 },
    { item: "46px", value: 46 },
    { item: "48px", value: 48 },
    { item: "50px", value: 50 },
    { item: "52px", value: 52 },
    { item: "54px", value: 54 },
    { item: "56px", value: 56 },
    { item: "58px", value: 58 },
    { item: "60px", value: 60 },


]


const colorOptions = [
    {item: <ColorOption color="rgb(0,0,0)" />, value: "rgb(0,0,0)"},
    {item:  <ColorOption color="rgb(255,255,255)" />, value: "rgb(255,255,255)"},
    {item: <ColorOption color="rgb(255,0,0)" />, value: "rgb(255,0,0)"},
    {item: <ColorOption color="rgb(0,255,0)" />, value: "rgb(0,255,0)"},
    {item: <ColorOption color="rgb(255,255,0)" />, value: "rgb(255,255,0)"},
    {item: <ColorOption color="rgb(0,255,255)" />, value: "rgb(0,255,255)"},
    {item: <ColorOption color="rgb(255,0,255)" />, value: "rgb(255,0,255)"},

]


const alignOptions = [
    //{ item: "Left", value: "" },
    { item: "Right", value: "right" },
    { item: "Center", value: "center" },

]


interface IProps {
    data: IAIPictureTextParams
    onChange: (key: keyof IAIPictureTextParams, value: any) => void
    onSubmit: () => void
}

const AIPictureTextComponent = React.memo(({ data, onChange, onSubmit }: IProps) => {
    const { t } = useTranslation()




    const handleChangeStrokeWidth = useCallback((value: number) => {
        if (value < 0 || value > 12) return
        onChange("outline_size", value)
    }, [])

    const handleChangePosition = useCallback((value: number, axis: "X" | "Y") => {
        if (value < 0 || value > 500) return
        const val = [...data.text_position]
        if (axis === "X") val[0] = value
        if (axis === "Y") val[1] = value
        onChange("text_position", val)
    }, [data.text_position])



    return <StyledWrapper>
        <StyledTextarea placeholder={t("ranking_ai-text-text")} value={data.text} onChange={(e) => onChange("text", e.target.value)} />
        <StyledBox>
            <StyledLabel>{t("ranking_ai-text-color_lbl")}</StyledLabel>
            <StyledDropdown
                value={data.text_color || ""}
                placeholder={t("ranking_ai-text-color")}
                onSelect={(v) => onChange("text_color", v)}
                options={colorOptions}
                label={t("ranking_ai-text-color")}
                isCustomColor={true}
            />
        </StyledBox>
        <StyledBox>
            <StyledLabel>{t("ranking_ai-text-outline_color_lbl")}</StyledLabel>
            <StyledDropdown
                value={data.outline_color || ""}
                placeholder={t("ranking_ai-text-outline_color")}
                onSelect={(v) => onChange("outline_color", v)}
                options={colorOptions}
                label={t("ranking_ai-text-outline_color")}
                isCustomColor={true}
            />
        </StyledBox>
        <StyledBox>
            <StyledLabel>{t("ranking_ai-text-font_size_lbl")}</StyledLabel>
            <StyledDropdown
                value={data.text_size || 0}
                placeholder={t("ranking_ai-text-font_size")}
                onSelect={(v) => onChange("text_size", v)}
                options={fontSizeOptions}
                label={t("ranking_ai-text-font_size")}
            />
        </StyledBox>
        <StyledBox>
            <StyledLabel>{t("ranking_ai-text-stroke_w_lbl")}</StyledLabel>
            <Input
                name="strokeWidth"
                type="number"
                value={String(data.outline_size)}
                onChange={(v) => handleChangeStrokeWidth(Number(v))}
                label={t("ranking_ai-text-stroke_w")}
            />
        </StyledBox>
        <StyledBox>
            <StyledLabel>{t("ranking_ai-text-position_lbl")}</StyledLabel>
            <Input
                name="positionX"
                type="number"
                value={String(data.text_position[0])}
                onChange={(v) => handleChangePosition(Number(v), "X")}
                label={t("ranking_ai-text-position_x")}
            />
            <Input
                name="positionY"
                type="number"
                value={String(data.text_position[1])}
                onChange={(v) => handleChangePosition(Number(v), "Y")}
                label={t("ranking_ai-text-position_y")}
            />
        </StyledBox>
        <StyledBox>
            <StyledLabel>{t("ranking_ai-text-align_lbl")}</StyledLabel>
            <StyledDropdown
                value={data.alignment}
                placeholder={t("ranking_ai-text-align")}
                onSelect={(v) => onChange("alignment", v)}
                options={alignOptions}
                label={t("ranking_ai-text-align")}
            />
        </StyledBox>
        <StyledButton onClick={onSubmit}>Add text</StyledButton>
    </StyledWrapper>
})


export default AIPictureTextComponent
