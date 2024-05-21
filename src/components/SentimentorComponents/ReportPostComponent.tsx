import React from "react";
import styled from "styled-components";
import { LocationIcon } from "../../UI/Svg";
import LikeIcon from "../../assets/images/SmLikes.png";
import CommentIcon from "../../assets/images/SmComments.png";
import ShareIcon from "../../assets/images/SmShares.png";

const StyledWrapper = styled.div`
  margin-top: 25px;
  padding-bottom: 25px;
  border-bottom: 2px solid #000;
  &:last-child {
    padding-bottom: 0;
    border: 0;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
`;

const StyledAvatar = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: #000;
`;

const StyledInfo = styled.div`
  margin-inline-end: auto;
`;

const StyledName = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 5px;
`;

const StyledBox = styled.div`
  display: flex;
`;

const StyledDate = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding-inline-end: 15px;
  margin-inline-end: 15px;
  border-inline-end: 2px solid #000;
  &:last-child {
    border: 0;
  }
  svg {
    width: 12px;
    height: 16px;
    margin-inline-end: 3px;
  }
`;

const StyledStats = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledStat = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  gap: 15px;
  padding: 8px 15px 8px;
  border-radius: 50px;
  border: 2px solid #000;
  img {
    height: 20px;
    width: 20px;
  }
`;

const StyledText = styled.p`
  margin: 0;
  font-size: 14px;
`;

const StyledKeywords = styled.p`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`;

const StyledSegment = styled.span`
  margin: 0;
  font-weight: 400;
  padding-inline-end: 10px;
  margin-inline-end: 10px;
  border-inline-end: 2px solid #000;
  &:last-child {
    border: 0;
  }
`;

const ReportPostComponent = React.memo(() => {
  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledAvatar src="" />
        <StyledInfo>
          <StyledName>User Name</StyledName>
          <StyledBox>
            <StyledDate>11/05/23</StyledDate>
            <StyledDate>14:45</StyledDate>
            <StyledDate>
              <LocationIcon />
              London
            </StyledDate>
          </StyledBox>
        </StyledInfo>
        <StyledStats>
          <StyledStat>
            <img src={LikeIcon} />
            13K
          </StyledStat>
          <StyledStat>
            <img src={CommentIcon} />
            13.5K
          </StyledStat>
          <StyledStat>
            <img src={ShareIcon} />
            10.2K
          </StyledStat>
        </StyledStats>
      </StyledHeader>
      <StyledText>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda eum
        ducimus maiores rem saepe, facilis voluptatibus qui nihil laboriosam et
        voluptates, ex a. Mollitia minima error vitae sequi commodi sapiente,
        officiis dolorum tenetur quasi officia optio necessitatibus quas,
        distinctio saepe laborum iusto quae quibusdam aperiam similique. Id
        nihil sed non nobis rerum obcaecati! Minus optio atque vero, dolore ad
        voluptatem magnam dolorum eveniet rerum aspernatur quisquam! Esse sint
        quaerat odit omnis sequi magni molestias natus explicabo, praesentium
        veniam minima voluptas similique aliquam distinctio aperiam quos eius
        delectus inventore tempora modi, consectetur numquam. Eligendi incidunt
        ipsum dolores sunt dignissimos fugit dolorum?
      </StyledText>
      <StyledKeywords>
        <span>Keywords: </span>
        Antisemitism, Radicalism, Hate
      </StyledKeywords>
      <StyledKeywords>
        <span>Segments: </span>
        <StyledSegment>Radical Right</StyledSegment>
        <StyledSegment>Blue Collar</StyledSegment>
        <StyledSegment>Ural Erea</StyledSegment>
      </StyledKeywords>
    </StyledWrapper>
  );
});

export default ReportPostComponent;
