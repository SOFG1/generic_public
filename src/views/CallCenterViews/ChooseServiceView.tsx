import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { GearHintComponent } from "../../UI/GearHintComponent";
import { activityList } from "../../config/userActivityList";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledWrapper = styled.div`
  margin-bottom: 3.33vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 42px;
  }
`;

const StyledTitle = styled.h2`
  text-align: start;
  font-weight: 400;
  font-size: 1.67vw;
  line-height: 2.19vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.52vw 1.04vw;
  margin-bottom: 2.19vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px 13px;
    margin-bottom: 27px;
  }
  @media screen and (max-width: 500px) {
    gap: 8px;
  }
`;


const StyledHeader = styled(StyledBox)`
  justify-content: space-between;
`


const StyledBtn = styled(Button)<{ selected: boolean }>`
  width: auto;
  padding: 1.04vw 2.34vw;
  ${({ selected }) =>
    selected &&
    `
  color: #fff;
  background-color: #000;
  `}
  @media screen and (max-width: ${desktopBp}) {
    padding: 13px 29px;
  }
  @media screen and (max-width: 940px) {
    padding: 7px 15px;
  }
`;

interface IProps {
  services: string[];
  selected: string;
  selectService: (service: string) => void;
}

const ChooseServiceView = React.memo(
  ({ services, selected, selectService }: IProps) => {
    const { t } = useTranslation();
    return (
      <StyledWrapper>
        <StyledHeader>
          <StyledTitle>{t("call-center_choose-platform")}</StyledTitle>
          <GearHintComponent
            action={activityList["call-center-hint"]}
            currentHint="call-center1"
            startPoint="left"
            hintArrowTarget="Menu-Settings"
          />
        </StyledHeader>
        <StyledBox>
          {services.map((service) => {
            //@ts-ignore
            const action = activityList[`call-center-${service}`]
            return <StyledBtn
            data-action={action}
            key={service}
            onClick={() => selectService(service)}
            selected={selected === service}
          >
            {t(`call-center_btn-${service}`)}
          </StyledBtn>
          })}
        </StyledBox>
      </StyledWrapper>
    );
  }
);

export default withErrorBoundaryHOC(ChooseServiceView);
