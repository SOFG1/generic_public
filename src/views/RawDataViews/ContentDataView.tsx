import React, {useMemo} from "react";
import {StatisticComponent, TableComponent} from "../../components/RawDataComponents";
import styled from "styled-components";
import {Card} from "../../components/common/Card";
import {desktopBp} from "../../styles/variables";
import {useUserState} from "../../store/user";

const StyledCard = styled(Card)`
  position: relative;
  padding-inline-end: 3.49vw;
  padding-left: 3.33vw;
  @media screen and (max-width: ${desktopBp}) {
    padding-inline-end: 44px;
    padding-left: 42px;
  }
`;

const ContentDataView = React.memo(()=>{
    const { userInfo } = useUserState()
    const is528Group = useMemo(() => {
        return userInfo?.group.id === 528
    }, [userInfo])
    return(
        <StyledCard>
            {!is528Group && <StatisticComponent/>}
            <TableComponent/>
        </StyledCard>
    )
})

export default ContentDataView;
