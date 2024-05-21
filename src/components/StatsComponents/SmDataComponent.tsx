import React from "react";
import styled from "styled-components";
import { IPreviewPost } from "../../store/smStats";
import SmComments from "../../assets/images/SmComments.png";
import SmLoves from "../../assets/images/SmLoves.png";
import SmLikes from "../../assets/images/SmLikes.png";
import SmAngers from "../../assets/images/SmAngers.png";
import SmShares from "../../assets/images/SmShares.png";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { desktopBp } from "../../styles/variables";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding: 1.25vw 1.35vw 0;
  @media screen and (max-width: ${desktopBp}) {
    padding: 16px 17px 0;
  }
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledPic = styled.img`
  object-fit: contain;
  height: 1.25vw;
  width: 1.25vw;
  margin-bottom: 0.47vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 16px;
    width: 16px;
    margin-bottom: 6px;
  }
`;

const StyledValue = styled.p`
  font-weight: 700;
  font-size: 0.73vw;
  line-height: 0.94vw;
  color: #000;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 9px;
    line-height: 12px;
  }
`;

interface IProps {
  previewPost: IPreviewPost;
  className?: string;
}

const SmDataComponent = React.memo(({ previewPost, className }: IProps) => {
  return (
    <StyledWrapper className={className}>
      <StyledItem>
        <StyledPic src={SmComments} />
        <StyledValue>
          {previewPost.activity_comments &&
            numberWithCommas(previewPost.activity_comments)}
        </StyledValue>
      </StyledItem>
      <StyledItem>
        <StyledPic src={SmLoves} />
        <StyledValue>
          {previewPost.reactions_loves &&
            numberWithCommas(previewPost.reactions_loves)}
        </StyledValue>
      </StyledItem>
      <StyledItem>
        <StyledPic src={SmLikes} />
        <StyledValue>
          {previewPost.reactions_likes &&
            numberWithCommas(previewPost.reactions_likes)}
        </StyledValue>
      </StyledItem>
      <StyledItem>
        <StyledPic src={SmAngers} />
        <StyledValue>
          {previewPost.reactions_angers &&
            numberWithCommas(previewPost.reactions_angers)}
        </StyledValue>
      </StyledItem>
      <StyledItem>
        <StyledPic src={SmShares} />
        <StyledValue>
          {previewPost.activity_shares &&
            numberWithCommas(previewPost.activity_shares)}
        </StyledValue>
      </StyledItem>
    </StyledWrapper>
  );
});

export default SmDataComponent;
