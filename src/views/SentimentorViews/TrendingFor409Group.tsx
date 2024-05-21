import React, {useState} from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { desktopBp } from "../../styles/variables"
import { TrendingPostsComponent } from "../../components/SentimentorComponents"


const StyledWrapper = styled.div`
      margin-bottom: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 20px;
  }
`


const TrendingFor409Group = React.memo(() => {
    const { t } = useTranslation()


    return <StyledWrapper>
        <TrendingPostsComponent title={t("ranking_trending-title(409)")} />
    </StyledWrapper>
})

export default TrendingFor409Group
