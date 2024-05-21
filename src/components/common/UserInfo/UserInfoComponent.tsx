import React from "react";
import styled from "styled-components";
import { LogoutIcon, UserAvatar } from "../../../UI/Svg";
import { useTranslation } from "react-i18next";
import { IProps } from "./types";
import { useAppActions } from "../../../store/app";
import { colors } from "../../../styles/colors";
import { desktopBp } from "../../../styles/variables";
import { activityList } from "../../../config/userActivityList";

const StyledBlock = styled.div<{ isClose: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.59vw;
  padding: ${props => props.isClose ? "1.1vw" : "1.35vw 1.18vw 1.35vw 2.07vw"};
  border-bottom: 2px solid #3CC6C1;
  @media screen and (max-width: ${desktopBp}) {
    padding: ${props => props.isClose ? "16px" : "17px 15px 17px 26px"};
    gap: 7px;
  }
  @media screen and (max-width: 740px) {
    ${({ isClose }) => isClose && "display: none"}
  }
`;

const StyledAvatar = styled.img`
  height: 1.72vw;
  width: 1.72vw;
  object-fit: cover;
  border-radius: 50%;
  @media screen and (max-width: ${desktopBp}) {
    height: 22px;
    width: 22px;
  }
`;

const StyledInfo = styled.div``;

const StyledName = styled.p`
  font-weight: 700;
  
  color: ${colors.cyan_7};
  margin: 0;
  font-size: ${props => props.theme.fontSize.primary.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.primary.px};
  }
`;

const StyledGroup = styled.p`
  font-weight: 400;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  color: ${colors.cyan_7};
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }
`;

const ButtonLogout = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-inline-start: auto;
`;

const UserInfoComponent = React.memo(
  ({ userLogin, groupId, userAvatar, className, isClose }: IProps) => {
    const { t } = useTranslation();
    const { onLogout } = useAppActions();

    return (
      <StyledBlock className={className} isClose={isClose}>
        {userAvatar ? (
          <StyledAvatar src={`https://cms.stoi.co${userAvatar}`} />
        ) : (
          <UserAvatar />
        )}
        {!isClose && (
          <>
            <StyledInfo>
              <StyledName>{userLogin}</StyledName>
              <StyledGroup>
                {t("user_info-group")} <span>#{groupId}</span>
              </StyledGroup>
            </StyledInfo>
            {/* Call with timeout in order to call activity too */}
            <ButtonLogout onClick={() => setTimeout(onLogout, 200)} data-action={activityList["logout"]}>
              <LogoutIcon />
            </ButtonLogout>
          </>
        )}
      </StyledBlock>
    );
  }
);

export default UserInfoComponent;
