import styled from "styled-components"
import { desktopBp } from "../../styles/variables"




const ToolbarButton = styled.button<{ opened: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    gap: 0.26vw;
    padding: 0.57vw 1.04vw;
    border-radius: 1.30vw;
    border: 1px solid #000;
    white-space: nowrap;
    background-color: transparent;
    height: 2.19vw;
    min-width: 2.19vw;
    p {
        font-size: 0.73vw;
        line-height: 1;
        margin: 0;
        margin-inline-end: 0.83vw;
    }
    ${({ opened }) => opened && `
        background-color: #000;
        color: #fff;
    `}
    @media screen and (max-width: ${desktopBp}) {
    gap: 3px;
    padding: 7px 13px;
    border-radius: 16px;
    height: 27px;
    min-width: 27px;
    p {
        font-size: 9px;
        margin-inline-end: 10px;
    }
    }
`


export default ToolbarButton