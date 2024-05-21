import React, {memo, useMemo} from "react";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {Button} from "../../UI/Button";
import {FbSelect} from "../CallCenterComponents";
import {IFacebookAdsCreateInitialState} from "./FacebookAdsCreateComponent";
import {FbNodeType, useCallCenterActions, useCallCenterState} from "../../store/callCenter";
import {useTranslation} from "react-i18next";
import {Dropdown} from "../../UI/Dropdown";

interface IProps{
    data:IFacebookAdsCreateInitialState,
    onChangeHandler:(key:keyof IFacebookAdsCreateInitialState, data:any)=>void,
    setCurrentModal:(modal:FbNodeType)=>void,
}

const FacebookAdsContentCreateComponent = memo(({data, onChangeHandler, setCurrentModal}:IProps)=>{
    const {t} = useTranslation();
    const {
        FBCampaings,
        FBSets,
        FBAudiences,
        FBCreatives,
        isFetching,
        FBAds,
    } = useCallCenterState();
    const {onDeleteNode } = useCallCenterActions();
    const adOptions: { item: string; value: number }[] = useMemo(() => {
        return FBAds.map((item) => {
            return {
                item: item.name,
                value: item.id,
            };
        });
    }, [FBAds]);
    return (
        <Container>
            <Group>
                <StyledItem>
                    <Label>{t("campaing")}</Label>
                    <DropdownStyled
                        value={data.selectedCampaign}
                        onSelect={(d) => onChangeHandler("selectedCampaign", d)}
                        options={FBCampaings}
                        label={t("campaing")}
                        onCreateAction={() => setCurrentModal("campaings")}
                        onDeleteAction={() =>
                            onDeleteNode({ node: "campaings", id: data.selectedCampaign })
                        }
                        isFetching={isFetching === "campaings"}
                    />
                </StyledItem>
                <StyledItem>
                    <Label>{t("audience")}</Label>
                    <DropdownStyled
                        value={data.selectedAudiences}
                        onSelect={(d) => onChangeHandler("selectedAudiences", d)}
                        options={FBAudiences}
                        label={t("audience")}
                        onCreateAction={() => setCurrentModal("customaudience")}
                        onDeleteAction={() =>
                            onDeleteNode({ node: "customaudience", id: data.selectedAudiences })
                        }
                        isFetching={isFetching === "customaudience"}
                    />
                </StyledItem>
                <StyledItem>
                    <Label>{t("sets")}</Label>
                    <DropdownStyled
                        value={data.selectedSet}
                        onSelect={(d) => onChangeHandler("selectedSet", d)}
                        options={FBSets}
                        label={t("audience")}
                        onCreateAction={() => setCurrentModal("sets")}
                        onDeleteAction={() =>
                            onDeleteNode({ node: "sets", id: data.selectedSet })
                        }
                        isFetching={isFetching === "sets"}
                    />
                </StyledItem>
                <StyledItem>
                    <Label>{t("creative")}</Label>
                    <DropdownStyled
                        value={data.selectedCreative}
                        onSelect={(d) => onChangeHandler("selectedCreative", d)}
                        options={FBCreatives}
                        label={t("creative")}
                        onCreateAction={() => setCurrentModal("creatives")}
                        onDeleteAction={() =>
                            onDeleteNode({ node: "creatives", id: data.selectedCreative })
                        }
                        isFetching={isFetching === "creatives"}
                    />
                </StyledItem>
                <StyledItem>
                    <Label>{t("call-center_ad-select")}</Label>
                    <DropdownInputStyled
                        value={data.selectedAd}
                        placeholder={t("call-center_ad-select")}
                        onSelect={(v)=>onChangeHandler("selectedAd", v)}
                        options={adOptions}
                        label={t("call-center_ad-label")}
                        isReversed={true}
                    />
                </StyledItem>
            </Group>
        </Container>
    )
})

export default FacebookAdsContentCreateComponent;

const Container = styled.div`
    display: flex;
  gap:3.33vw;
  padding: 0 0.52vw;
  
  @media screen and (max-width: ${desktopBp}) {
    gap:42px;
    padding: 0 7px;
  }
`


const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const Label = styled.p`
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  width:2.60vw;
  margin-right: 5px;

  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
    width: 33px;
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


const DropdownStyled = styled(FbSelect)`
  display: flex;
  gap: 5px;
  max-width: 100%;
  align-items: center;
  @media screen and (max-width: ${desktopBp}) {
    width: 119px;
  }
`;

const DropdownInputStyled = styled(Dropdown)`
  width: 9.48vw;
  color:rgba(254, 89, 18, 1);
  
  @media screen and (max-width: ${desktopBp}) {
    width: 119px;
  }
`;
