import styled from 'styled-components'
import { desktopBp } from '../../styles/variables';
import { Button } from '../../UI/Button';


const SettingsButton = styled(Button)`
font-size: 1.35vw;
line-height: 1.77vw;
width: fit-content;
min-width: 7.76vw;
height: 3.49vw;
@media screen and (max-width: ${desktopBp}) {
  font-size: 17px;
  line-height: 22px;
  min-width: 97px;
  height: 44px;
}
@media screen and (max-width: 700px) {
    position: static;
  }
`;


export default SettingsButton