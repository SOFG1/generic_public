import React, { useState } from "react";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Modal } from "../../UI/Modal";
import CreateGroupComponent from "./CreateGroupComponent";
import GroupCriteriaComponent from "./GroupCriteriaComponent";
import { activityList } from "../../config/userActivityList";
import {useTranslation} from "react-i18next";

const Wrapper = styled.div`
  max-width: 13.54vw;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 170px;
  }
`;

const GoogleCreativesComponent = React.memo(() => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const {t} = useTranslation();
  return (
    <>
      <Wrapper>
        <Button onClick={() => setModalOpened(true)} data-action={activityList["call-center-google-group_modal"]}>{t("google_ads-add-a-group")}</Button>
      </Wrapper>
      <Modal show={modalOpened} onClose={() => setModalOpened(false)}>
        <CreateGroupComponent />
        <GroupCriteriaComponent />
      </Modal>
    </>
  );
});

export default GoogleCreativesComponent;
