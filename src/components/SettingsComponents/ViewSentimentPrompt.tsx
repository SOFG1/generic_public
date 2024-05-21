import {memo} from "react";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import {useTranslation} from "react-i18next";
import {useSettingsState} from "../../store/settings";
import {Loader} from "../../UI/Spinners";

const ViewSentimentPrompt = memo(()=>{
    const {t} = useTranslation();
    const {isFetchingSentimentPrompt, sentimentPrompt} = useSettingsState();

    return (
        <Container>
            <CardTitle>{t("settings_sentiment-definition-view-sentiment-prompt-title")}</CardTitle>
            {isFetchingSentimentPrompt && <Loader/>}
            {!isFetchingSentimentPrompt && (
                <>
                    <StyledItem>
                        <Label>{t("settings_sentiment-definition-view-sentiment-topic")}:</Label>
                        <Value>{sentimentPrompt.topic}</Value>
                    </StyledItem>
                    <StyledItem>
                        <Label>{t("settings_sentiment-definition-view-sentiment-positive")}:</Label>
                        <Value>{sentimentPrompt.positive}</Value>
                    </StyledItem>
                    <StyledItem>
                        <Label>{t("settings_sentiment-definition-view-sentiment-negative")}:</Label>
                        <Value>{sentimentPrompt.negative}</Value>
                    </StyledItem>
                </>
            )}
        </Container>
    )
})


export default ViewSentimentPrompt;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  margin: 1.04vw 0;
  @media(max-width: ${desktopBp}){
    margin: 13px 0;
  }
  
`

const CardTitle = styled.p`
  font-size: 1.67vw;
  line-height: 2.19vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;

const StyledItem = styled.div`
    display: flex;
  justify-content: flex-start;
  margin: 5px 0;
  gap: 5px;
  align-items: center;
`

const Label  = styled.p`

  margin-block-start: 0;
  margin-block-end: 0;
  font-size: ${props => props.theme.fontSize.headerSecondary.vw};
  @media(max-width: ${desktopBp}){
    font-size: ${props => props.theme.fontSize.headerSecondary.px};
  }
`;
const Value = styled.p`
  margin-block-start: 0;
  margin-block-end: 0;
  font-size: ${props => props.theme.fontSize.primary.vw};
  @media(max-width: ${desktopBp}){
    font-size: ${props => props.theme.fontSize.primary.px};
  }
`;
