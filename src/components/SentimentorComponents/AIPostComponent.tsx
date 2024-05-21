import React from "react"
import { IAIPost } from "../../store/sentimentor"
import styled from "styled-components"
import AIEditTextComponent from "./AIEditTextComponent"
import AIPictureEditorComponent from "./AIPictureEditorComponent"
import { desktopBp } from "../../styles/variables"


const StyledWrapper = styled.div<{isPreview?:boolean}>`
  ${props => props.isPreview ? `
    display: flex;
  justify-content: center;
    gap: 3.65vw;
    margin: 1.04vw 0 2.60vw;
    width: calc(100% - 20px);
    max-width: 100%;
    @media screen and (max-width: ${desktopBp}) {
        gap: 46px;
        margin: 13px 0 33px;     
    }
    @media screen and (max-width: 990px) {
        flex-direction: column;
        align-items: stretch;
        width: fit-content;
        margin: 0 auto 70px;
        gap: 10px;
    }
  ` : `
      display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        padding: 0 3.65vw;
      
      @media(max-width:${desktopBp}) {
        padding: 0 46px;
      }
  `}
}
`




interface IProps {
    post?: IAIPost,
    isPreview?:boolean
}

const AIPostComponent = React.memo(({ post, isPreview }: IProps) => {

    return <StyledWrapper isPreview = {isPreview}>
        {post && <AIEditTextComponent isPreview = {isPreview} post={post} />}
        <AIPictureEditorComponent isPreview={isPreview} post={post} />
    </StyledWrapper>
})

export default AIPostComponent
