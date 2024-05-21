import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FBCampaignAudeince, FBFilterAudience, FBPageAudience } from "../../components/CallCenterComponents";
import { Title } from "../../components/common/Title";
import {
  useCallCenterState,
} from "../../store/callCenter";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { activityList } from "../../config/userActivityList";

const ModalFrame = styled.div<{ isFetching: boolean }>`
  ${({ isFetching }) => isFetching && "cursor: wait;& * {cursor: wait;}"}
`;

const TitleStyled = styled(Title)`
  font-size: 1.25vw;
  line-height: 1.2;
  font-weight: 500;
  margin: 0 0 0.78vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;



const ButtonsBox = styled.div`
  display: flex;
  gap: 1.04vw;
  margin-bottom: 1.04vw;
  justify-content: center;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
    margin-bottom: 13px;
  }
  @media screen and (max-width: 530px) {
    flex-wrap: wrap;
  }
`;

const SwitcherBtn = styled(Button)`
  width: 100%;
  white-space: nowrap;
`;

type CreateAudienceType = "from_filter" | "from_page_fans" | "from_campaign";

const CreateAudienceModal = React.memo(() => {
  const { t } = useTranslation();
  const {
    isFetching,
  } = useCallCenterState();
  const [audienceType, setAudienceType] =
    useState<CreateAudienceType>("from_filter");


  return (
    <ModalFrame isFetching={isFetching === "customaudience"}>
      <TitleStyled>{t("audience_title")}</TitleStyled>
      <ButtonsBox>
        <SwitcherBtn
          data-action={activityList["call-center-FB-audience_filter"]}
          isActive={audienceType === "from_filter"}
          onClick={() => setAudienceType("from_filter")}
        >
          From audience
        </SwitcherBtn>
        <SwitcherBtn
          data-action={activityList["call-center-FB-audience_fans"]}
          isActive={audienceType === "from_page_fans"}
          onClick={() => setAudienceType("from_page_fans")}
        >
          From page fans
        </SwitcherBtn>
        <SwitcherBtn
          data-action={activityList["call-center-FB-audience_campaign"]}
          isActive={audienceType === "from_campaign"}
          onClick={() => setAudienceType("from_campaign")}
        >
          From campaign conversion
        </SwitcherBtn>
      </ButtonsBox>
      {audienceType === "from_filter" && <FBFilterAudience />}
      {audienceType === "from_page_fans" && <FBPageAudience />}
      {audienceType === "from_campaign" && <FBCampaignAudeince />}
    </ModalFrame>
  );
});

export default CreateAudienceModal;
