import styled from "styled-components";
import { desktopBp } from "../../styles/variables";




const StyledBtn = styled.button<{ disabled?: boolean }>`
  position: relative;
  border-radius: 50%;
  flex-shrink: 0;
  font-size: 1.15vw;
  line-height: 0.5;
  font-weight: 800;
  width: 1.82vw;
  height: 1.82vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 1px solid #000;
  cursor: pointer;
  :hover:not(:disabled) svg {
    opacity: 0.65;
  }
  :hover > div {
    display: block;
  }
  img {
    height: 1.04vw;
    width: 1.04vw;
  }
  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 85%;
    width: 100%;
  }
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #000;
    cursor: not-allowed;
    svg path {
      fill: #fff;
    }
  `}


  @media screen and (max-width: ${desktopBp}) {
    width: 23px;
    height: 23px;
    font-size: 14px;
    img {
      height: 13px;
      width: 13px;
    }
  }
`;



export const PostButton = styled(StyledBtn) <{ processed?: boolean }>`
${({ processed }) => processed && "background-color: #000;"}
  svg {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 60%;
    width: 60%;
    path {
      ${({ processed }) => processed && "fill: #fff;"}
    }
  }
`