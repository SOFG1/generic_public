import {desktopBp} from "../../styles/variables";
import styled from "styled-components";
import React, {useEffect, useMemo} from "react";
import {useCallCenterActions, useCallCenterState} from "../../store/callCenter";
import {useUserState} from "../../store/user";
import {useTranslation} from "react-i18next";
import {Dropdown} from "../../UI/Dropdown";


const FacebookAdsCreateParametersComponent = ()=>{
    const {
        selectedFBAccount,
        FBAccountList,

        isFetching,
    } = useCallCenterState();

    const {t} = useTranslation();
    const { onSelectFBAccount,onGetFBAccountList } = useCallCenterActions();
    const {userInfo} = useUserState()
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

    useEffect(() => {
        onGetFBAccountList()
    }, [])

    return(
        <Container>
            <Group>
                <StyledItem>
                    <Label>Accounts</Label>
                    <DropdownStyled
                        value={selectedFBAccount}
                        placeholder={t("call-center_fb-select")}
                        onSelect={onSelectFBAccount}
                        options={options}
                        label={t("call-center_fb-select")}
                        isReversed={true}
                        isFetching={options.length === 0}
                    />
                </StyledItem>
            </Group>
        </Container>
    )
}

export default FacebookAdsCreateParametersComponent;

const Container = styled.div`
    display: flex;
  gap:1.17vw;
  padding: 0 0.52vw;
  gap:3.33vw;
    
  @media screen and (max-width: ${desktopBp}) {
    padding: 0 7px;
    gap:42px;
  }
`

const Group = styled.div``
const Label = styled.p`
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`
const StyledItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.68vw;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  @media screen and (max-width: ${desktopBp}) {
    gap:8px;
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
