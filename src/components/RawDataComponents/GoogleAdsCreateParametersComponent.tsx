import React, {memo, useMemo} from "react";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {Dropdown} from "../../UI/Dropdown";
import {useGoogleAdsActions, useGoogleAdsState} from "../../store/googleAds";
import {useTranslation} from "react-i18next";

const GoogleAdsCreateParametersComponent = memo(()=>{
    const {selectedCustomerId, customers } = useGoogleAdsState();
    const {t} = useTranslation();

    const {onSelectCustomer } =
        useGoogleAdsActions();

    const customersOptions = useMemo(() => {
        return customers.map((c) => ({ item: c.name, value: c.cust_id }));
    }, [customers]);


    return (
        <Container>
            <Label>Customer ID</Label>
            <DropdownStyled
                value={selectedCustomerId || 0}
                options={customersOptions}
                onSelect={onSelectCustomer}
                label={t("google_ads-customer_id")}
                placeholder={t("google_ads-customer_id")}
            />
        </Container>
    )
})

export default GoogleAdsCreateParametersComponent;


const Container = styled.div`
  display: flex;
  gap:1.17vw;
  
  @media screen and (max-width: ${desktopBp}) {
    gap:15px;
  }
`

const Label = styled.p`
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`

const DropdownStyled = styled(Dropdown)`
  width: 9.48vw;
  color:rgba(254, 89, 18, 1);
  
  @media screen and (max-width: ${desktopBp}) {
    width: 119px;
  }
`;
