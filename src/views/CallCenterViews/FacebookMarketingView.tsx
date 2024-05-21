import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/common/Card";
import styled from "styled-components";
import { Title } from "../../components/common/Title";
import { Dropdown } from "../../UI/Dropdown";
import {
  useCallCenterActions,
  useCallCenterState,
  FbNodeType,
} from "../../store/callCenter";
import { Button } from "../../UI/Button";
import { Modal } from "../../UI/Modal";
import { FbSelect } from "../../components/CallCenterComponents";
import { useTranslation } from "react-i18next";
import { desktopBp } from "../../styles/variables";
import {
  CreateAdModal,
  CreateAudienceModal,
  CreateCampaignModal,
  CreateCreativeModal,
  CreateSetModal,
} from "./";
import { activityList } from "../../config/userActivityList";
import { useUserState } from "../../store/user";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const FBMarketingCard = styled(Card)`
  flex: 1;
  margin: 2.08vw 0;
  @media screen and (max-width: ${desktopBp}) {
    margin: 26px 0;
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid #000;
  padding: 1.56vw 1.56vw 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 20px 20px 13px;
  }
  @media screen and (max-width: 940px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TitleStyled = styled(Title)`
  font-size: 1.25vw;
  line-height: 1.2;
  font-weight: 500;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
  }
`;

const Form = styled.div`
  display: flex;
  gap: 0.78vw;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 10px;
    padding: 13px;
  }
  @media screen and (max-width: 940px) {
    flex-wrap: wrap;
    gap: 35px 15px;
    > div {
      width: 48%;
      max-width: 50%;
    }
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    > div {
      width: 260px;
      max-width: 100%;
    }
  }
`;

const Footer = styled.div`
  display: flex;
  gap: 0.78vw;
  align-items: flex-end;
  align-content: flex-end;
  justify-content: space-between;
  width: 100%;
  padding: 1.56vw;
  box-sizing: border-box;
  button {
    max-width: 13.54vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    gap: 10px;
    padding: 20px;
    button {
      max-width: 170px;
    }
  }
  @media screen and (max-width: 940px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AccountDropdown = styled(Dropdown)`
  width: 50%;
  @media screen and (max-width: 500px) {
    min-width: 100%;
  }
`;
const ButtonStyled = styled(Button)`
  margin-top: 0.52vw;
  padding: 0.57vw 1.77vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 7px;
    padding: 7px 22px;
  }
`;

const FacebookMarketingView = React.memo(() => {
  const { t } = useTranslation();
  const {userInfo} = useUserState()
  const {
    FBAccountList,
    selectedFBAccount,
    FBCampaings,
    FBSets,
    FBAds,
    FBAudiences,
    FBCreatives,
    isFetching,
  } = useCallCenterState();
  const { onSelectFBAccount, onDeleteNode, onGetFBAccountList } = useCallCenterActions();

  const [selectedCampaing, setSelectedCampaing] = useState<number>(0);
  const [selectedAudience, setSelectedAudience] = useState<number>(0);
  const [selectedSet, setSelectedSet] = useState<number>(0);
  const [selectedCreative, setSelectedCreative] = useState<number>(0);
  const [currentModal, setCurrentModal] = useState<FbNodeType>(null);
  const [selectedAd, setSelectedAd] = useState<number>(0);

  const options: { item: string; value: number }[] = useMemo(() => {
    const options = FBAccountList?.map((item) => {
      return {
        item: item.name,
        value: item.account_id,
      };
    }) || []
    //Custom for 439 group
    if(userInfo?.group.id === 439) {
      return options.filter(o => o.item === "גייל שורש לראשות העיר רמת השרון")
    }
    return options
  }, [FBAccountList, userInfo?.group.id]);

  const adOptions: { item: string; value: number }[] = useMemo(() => {
    return FBAds.map((item) => {
      return {
        item: item.name,
        value: item.id,
      };
    });
  }, [FBAds]);


  useEffect(() => {
    onGetFBAccountList()
  }, [])

  return (
    <FBMarketingCard>
      <Modal show={!!currentModal} onClose={() => setCurrentModal(null)}>
        {currentModal === "campaings" && <CreateCampaignModal />}
        {currentModal === "sets" && <CreateSetModal />}
        {currentModal === "customaudience" && <CreateAudienceModal />}
        {currentModal === "creatives" && <CreateCreativeModal />}
        {currentModal === "ad" && <CreateAdModal />}
      </Modal>
      <CardHeader>
        <TitleStyled>{t("call-center_fb-title")}</TitleStyled>
        <AccountDropdown
          value={selectedFBAccount}
          placeholder={t("call-center_fb-select")}
          onSelect={onSelectFBAccount}
          options={options}
          label={t("call-center_fb-select")}
          isReversed={true}
          isFetching={options.length === 0}
        />
      </CardHeader>
      {selectedFBAccount ? (
        <>
          <Form>
            <FbSelect
              value={selectedCampaing}
              onSelect={(d) => setSelectedCampaing(d)}
              options={FBCampaings}
              label={t("campaing")}
              onCreateAction={() => setCurrentModal("campaings")}
              onDeleteAction={() =>
                onDeleteNode({ node: "campaings", id: selectedCampaing })
              }
              isFetching={isFetching === "campaings"}
            />
            <FbSelect
              value={selectedAudience}
              onSelect={(d) => setSelectedAudience(d)}
              options={FBAudiences}
              label={t("audience")}
              onCreateAction={() => setCurrentModal("customaudience")}
              onDeleteAction={() =>
                onDeleteNode({ node: "customaudience", id: selectedAudience })
              }
              isFetching={isFetching === "customaudience"}
            />
            <FbSelect
              value={selectedSet}
              onSelect={(d) => setSelectedSet(d)}
              options={FBSets}
              label={t("sets")}
              onCreateAction={() => setCurrentModal("sets")}
              onDeleteAction={() =>
                onDeleteNode({ node: "sets", id: selectedSet })
              }
              isFetching={isFetching === "sets"}
            />
            <FbSelect
              value={selectedCreative}
              onSelect={(d) => setSelectedCreative(d)}
              options={FBCreatives}
              label={t("creative")}
              onCreateAction={() => setCurrentModal("creatives")}
              onDeleteAction={() =>
                onDeleteNode({ node: "creatives", id: selectedCreative })
              }
              isFetching={isFetching === "creatives"}
            />
          </Form>
          <Footer>
            <AccountDropdown
              value={selectedAd}
              placeholder={t("call-center_ad-select")}
              onSelect={setSelectedAd}
              options={adOptions}
              label={t("call-center_ad-label")}
              isReversed={true}
            />
            <ButtonStyled
              data-action={activityList["call-center-FB-ad_delete"]}
              onClick={() => onDeleteNode({ node: "ad", id: selectedAd })}
            >
              {t("call-center_ad-del")}
            </ButtonStyled>
            <Button
              data-action={activityList["call-center-FB-ad_create"]}
              disabled={isFetching === "ad"}
              onClick={() => setCurrentModal("ad")}
            >
              {t("call-center_ad-create")}
            </Button>
          </Footer>
        </>
      ) : null}
    </FBMarketingCard>
  );
});

export default withErrorBoundaryHOC(FacebookMarketingView);
