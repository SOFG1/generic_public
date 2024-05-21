import React, { useCallback } from "react"
import { DownloadIcon } from "../../UI/Svg"
import styled from "styled-components"
const { useScreenshot, createFileName } = require("use-react-screenshot");



const StyledBtn = styled.button`
    height: 15px;
    width: 15px;
    position: absolute;
    inset-inline-end: 3px;
    top: 3px;
    padding: 0;
    border-radius: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    svg {
        height: 100%;
        width: 100%;
    }
`


interface IProps {
    fileName: string
}


const ExportChartComponent = React.forwardRef(({ fileName }: IProps, ref: any) => {
    const [image, takeScreenshot] = useScreenshot();



    const handleSave = async () => {
        if (ref?.current) {
            const a = document.createElement("a");
            a.download = createFileName("png", fileName);
            a.href = await takeScreenshot(ref.current);
            a.click();
        }
    }



    return <StyledBtn onClick={handleSave}>
        <DownloadIcon />
    </StyledBtn>
})


export default ExportChartComponent