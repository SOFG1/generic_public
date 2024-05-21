import styled from "styled-components"

const HoverPopup = styled.p`
    visibility: hidden;
    opacity: 0;
    text-align: center;
    position: absolute;
    bottom: 85%;
    transition: 200ms;
    padding: 5px;
    border-radius: 12px;
    background-color: #fff;
    width: 120px;
    border: 1px solid #000;
    margin: 0;
    margin-inline-start: -85px;
    background-color: #fff;
    z-index: 30;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    *:hover > & {
        visibility: visible;
    opacity: 1;
    transform: translateY(-20px);
    }
`;

export default HoverPopup