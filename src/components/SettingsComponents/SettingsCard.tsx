import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { Card } from "../common/Card";

const SettingsCard = styled(Card)`
  position: relative;
  display: flex;
  align-items: center;
  height: 7.14vw;
  gap: 10px;
  border-radius: 10px;
  margin-bottom: 2.08vw;
  &:first-child {
    margin-top: 2.6vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 90px;
    margin-bottom: 26px;
    &:first-child {
      margin-top: 33px;
    }
  }
  @media screen and (max-width: 530px) {
    flex-direction: column;
    height: auto;
  }
`;

export default SettingsCard;
