import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  AudienceCampaignComponent,
  GoogleAdsComponent,
  GoogleCampaignsComponent,
  GoogleGroupsComponent,
} from "../../components/CallCenterComponents";
import { Card } from "../../components/common/Card";
import { Title } from "../../components/common/Title";
import { useGoogleAdsActions, useGoogleAdsState } from "../../store/googleAds";
import { desktopBp } from "../../styles/variables";
import { Dropdown } from "../../UI/Dropdown";
import { Checkbox } from "../../UI/Input";
import { RefreshIcon } from "../../UI/Svg";
import { useTranslation } from "react-i18next";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledCard = styled(Card)`
  position: relative;
  display: block;
  margin: 2.08vw 0;
  flex: 1;
  @media screen and (max-width: ${desktopBp}) {
    margin: 26px 0;
  }
`;

const StyledUpdateBtn = styled.button`
  position: absolute;
  top: 0.52vw;
  inset-inline-end: 0.52vw;
  border: 0;
  padding: 0;
  background-color: transparent;
  transition: opacity 200ms linear, transform 100ms linear;
  cursor: pointer;
  svg {
    height: 1.3vw;
    width: 1.3vw;
  }
  &:hover {
    opacity: 0.7;
  }
  &:active {
    transform: rotate(180deg);
  }
  @media screen and (max-width: ${desktopBp}) {
    top: 7px;
    inset-inline-end: 7px;
    svg {
      height: 16px;
      width: 16px;
    }
  }
`;

const TitleStyled = styled(Title)`
  font-size: 1.25vw;
  width: 50%;
  line-height: 1.2;
  font-weight: 500;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
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

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.52vw;
  padding: 0.52vw 0.78vw;
  margin-bottom: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
    padding: 7px 10px;
    margin-bottom: 20px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.78vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 10px;
  }
  @media screen and (max-width: 940px) {
    flex-direction: column;
    align-items: center;
    > div > button {
      width: 240px;
    }
  }
`;

const GoogleAdsView = React.memo(() => {
  const { t } = useTranslation()
  const { customers, selectedCustomerId } = useGoogleAdsState();
  const { onGetCustomers, onSelectCustomer, onRefreshData } =
    useGoogleAdsActions();
  const [isCustomCampaign, setIsCustomCampaign] = useState<boolean>(true);

  const customersOptions = useMemo(() => {
    return customers.map((c) => ({ item: c.name, value: c.cust_id }));
  }, [customers]);

  useEffect(() => {
    onGetCustomers();
  }, []);

  return (
    <StyledCard>
      <StyledUpdateBtn onClick={onRefreshData}>
        <RefreshIcon />
      </StyledUpdateBtn>
      <CardHeader>
        <TitleStyled>{t("google_ads-title")}</TitleStyled>
        <Dropdown
          value={selectedCustomerId || 0}
          options={customersOptions}
          onSelect={onSelectCustomer}
          label={t("google_ads-customer_id")}
          placeholder={t("google_ads-customer_id")}
        />
      </CardHeader>
      {selectedCustomerId && (
        <>
          <CheckboxContainer>
            <Checkbox
              label={t("google_ads-custom")}
              isActive={isCustomCampaign}
              onChange={() => setIsCustomCampaign(true)}
            />
            <Checkbox
              label={t("google_ads-audience_campaign")}
              isActive={!isCustomCampaign}
              onChange={() => setIsCustomCampaign(false)}
            />
          </CheckboxContainer>
          {isCustomCampaign && (
            <StyledBox>
              <GoogleCampaignsComponent />
              <GoogleGroupsComponent />
              <GoogleAdsComponent />
            </StyledBox>
          )}
          {!isCustomCampaign && <AudienceCampaignComponent />}
        </>
      )}
    </StyledCard>
  );
});

export default withErrorBoundaryHOC(GoogleAdsView);
