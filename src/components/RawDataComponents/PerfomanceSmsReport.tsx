import styled from "styled-components";
import {memo, useCallback, useState} from "react";
import {SquareCheckbox} from "../../UI/Input";
import {desktopBp} from "../../styles/variables";
import PerfomanceSmsIncomingReport from "./PerfomanceSmsIncomingReport";
import {SmsSubtype} from "./PerformancePanelComponent";
import PerfomanceSmsOutgoingReport from "./PerfomanceSmsOutgoingReport";
import {InputValueType} from "../../types";

interface IProps{
    panel:SmsSubtype | null,
    setPanel:(value:SmsSubtype | null)=>void
    filterParams:any,
    setFilterParams:any,
}

const PerfomanceSmsReport = memo(({panel, setPanel, filterParams, setFilterParams}:IProps)=>{


    return (
        <Container>
            <CheckboxContainer>
                <StyledItem>
                    <StyledCheckbox active={panel === "incoming"} onChange={()=>setPanel("incoming")}/>
                    <Label>Incoming Sms</Label>
                </StyledItem>
                <StyledItem>
                    <StyledCheckbox active = {panel === "outgoing"} onChange={()=>{setPanel("outgoing")}}/>
                    <Label>Outgoing Sms</Label>
                </StyledItem>
            </CheckboxContainer>
            <Content>
                {panel === "incoming" && <PerfomanceSmsIncomingReport filterParams={filterParams} setFilterParams={setFilterParams}/>}
                {panel === "outgoing" && <PerfomanceSmsOutgoingReport filterParams={filterParams} setFilterParams={setFilterParams} />}
            </Content>
        </Container>
    )
})

export default PerfomanceSmsReport;


const Container = styled.div`
    display: flex;
  flex-direction: column;
`

const CheckboxContainer = styled.div`
    display: flex;
  gap: 1.33vw;
  @media(max-width: ${desktopBp}){
    gap: 17px;
  }
`

const StyledCheckbox = styled(SquareCheckbox)`
    width:0.67vw;
    height:0.67vw;
  & .sq-checkbox-active{
    width: 0.40vw;
    height: 0.40vw;
    @media(max-width:${desktopBp}){
      width: 5px;
      height: 5px;
    }
  }

  @media(max-width:${desktopBp}){
    width: 8px;
    height: 8px;
  }
`

const StyledItem = styled.div`
    display: flex;
  align-items: center;
  gap: 5px;
`

const Label = styled.p`
  width: fit-content;
  white-space: nowrap;
  font-weight: 500;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  
  @media(max-width: ${desktopBp}){
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }  
`



const Content = styled.div`
    width: 100%;
`
