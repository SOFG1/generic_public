import React, { useState } from "react";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Modal } from "../../UI/Modal";
import { CreateCampaignComponent } from "../CallCenterComponents";
import { CampaignCriteriaComponent } from "../CallCenterComponents";
import { activityList } from "../../config/userActivityList";
import {useTranslation} from "react-i18next";

const Wrapper = styled.div`
  max-width: 16.67vw;
  display: flex;
  flex-direction: column;
  gap: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 209px;
    gap: 7px;
  }
`;

const GoogleGroupsComponent = React.memo(() => {

   const [modalOpened, setModalOpened] = useState<boolean>(false);
   const {t} = useTranslation();

  return (
    <>
      <Wrapper>
        <Button
          onClick={() => setModalOpened(true)}
          data-action={activityList["call-center-google-campaign_modal"]}
        >
            {t("google_ads-add-a-campaign")}
        </Button>
      </Wrapper>
      <Modal show={modalOpened} onClose={() => setModalOpened(false)}>
        <CreateCampaignComponent />
        <CampaignCriteriaComponent />
      </Modal>
    </>
  );
});

export default GoogleGroupsComponent;
