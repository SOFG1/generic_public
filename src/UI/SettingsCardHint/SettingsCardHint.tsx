import styled, {keyframes} from 'styled-components'

const hintAnim = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const SettingsCardHint = styled.span`
position: absolute;
top: -15px;
right: -15px;
bottom: -15px;
left: -15px;
border: 8px solid #fe5912;
border-radius: 25px;
animation: ${hintAnim} 1500ms linear infinite;
pointer-events: none;
`;