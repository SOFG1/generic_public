import React, { useMemo } from "react";
import styled from "styled-components";
import {
  DynamicStatsComponent,
  GendersBarsComponent,
  StatusChartComponent,
} from "./index";
import {usePermissions, useUserState} from "../../store/user";
import { useTranslation } from "react-i18next";
import { desktopBp } from "../../styles/variables";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const RowStatistics = styled.div`
  display: flex;
  align-content: center;
  align-items: stretch;
  & > div{
    margin-right: auto;
    margin-left: auto;
  }
  @media screen and (max-width: ${desktopBp}) {
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-evenly;
    > div {
      width: 310px;
    }
  }
  @media screen and (max-width: 920px) {
    flex-direction: column;
  }

`;

const StatisticsComponent = React.memo(() => {
  const { t } = useTranslation();
  const { userInfo } = useUserState();
  const permissions = usePermissions("Raw_Data")

  console.log(permissions)


  const noPermissions = useMemo(() => {
    return !permissions.age_stat && !permissions.city_stat && !permissions.gender_stat && !permissions.status_stat
  }, [permissions])

  const userGroupIs270 = useMemo(() => {
    return userInfo?.group?.id === 270;
  }, [userInfo]);


  if (noPermissions) return null

  return (
    <RowStatistics>
      {permissions.city_stat && (
          <>
            <DynamicStatsComponent
                sortFunction={(a, b) => b.value - a.value}
                title={t("raw-data_members")}
                dataKey="city_stat"
                labelKey="city"
            />
            <Divider/>
          </>
      )}
      {!userGroupIs270 && permissions.gender_stat &&
          (
              <>
                <GendersBarsComponent />
                <Divider/>
              </>
          )
      }
      {!userGroupIs270 && permissions.age_stat && (
        <>
            <DynamicStatsComponent
                sortFunction={(a, b) => a.name.localeCompare(b.name)}
                title={t("raw-data_age")}
                dataKey="age_stat"
                labelKey="age_group"
            />
            <Divider/>
        </>
      )}
      {userGroupIs270 && (
        <>
            <DynamicStatsComponent
                sortFunction={(a, b) => a.value - b.value}
                title=" 2013 Support"
                dataKey="2013_support"
                labelKey="2013_support"
            />
            <Divider/>
        </>
      )}
      {userGroupIs270 && (
        <>
            <DynamicStatsComponent
                sortFunction={(a, b) => a.value - b.value}
                title=" 2009 Support"
                dataKey="2009_support"
                labelKey="2009_support"
            />
            <Divider/>
        </>
      )}
      {permissions.status_stat && <StatusChartComponent />}
    </RowStatistics>
  );
});

export default withErrorBoundaryHOC(StatisticsComponent);



const Divider = styled.div`
  width: 1px;
  height: 13.13vw;
  background: #000;
  position: relative;
  top: 1.67vw;
  @media(max-width:${desktopBp}){
    display: none;
    width: 0;
    height: 0;
  }
`
