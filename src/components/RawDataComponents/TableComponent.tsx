import React, {useState} from "react";
import DatabaseTable from "./DatabaseTable";
import styled from "styled-components";
import Tab from "../../UI/Tabs/Tab";
import Tabs from "../../UI/Tabs/Tabs";
import {useTranslation} from "react-i18next";
import {desktopBp} from "../../styles/variables";
import {DigitalCampaignView, OfflineCampaignView} from "../../views/RawDataViews";
import {usePermissions, useUserState} from "../../store/user";


const TableComponent = React.memo(() => {
    const {t} = useTranslation();
    const [tab, setTab] = useState(0);
    const {userInfo} = useUserState();
    return (
        <Container>
            <StyledTabs value={tab} onChange={setTab}>
                <Tab>{t("raw-data_tab-database")}</Tab>
                {!!userInfo?.permissions.Volunteer.access ? <Tab>{t("raw-data_tab-task-volunteers")}</Tab> : <></>}
                {!!userInfo?.permissions.CallCenter.access ?  <Tab>{t("raw-data_tab-campaigns")}</Tab>  : <></>}
            </StyledTabs>
            {tab === 0 &&  <DatabaseTable/>}
            {tab === 2 && (
               <>
                   <DigitalCampaignView/>
                   <OfflineCampaignView/>
               </>
            )}
        </Container>
    )
});

export default TableComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledTabs = styled(Tabs)`
  margin-bottom: 0.88vw;
  gap: 2.34vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 20px;
    gap: 25px;
  }
`


