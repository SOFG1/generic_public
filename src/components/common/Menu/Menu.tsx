import React, { useCallback, useMemo, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../../../styles/colors";
import Logo from "../../../assets/images/Logo.png";
import LogoClose from "../../../assets/images/LogoClose.png";
import { OpenMenuIcon, SvgProps } from "../../../UI/Svg";
import * as IconModule from "../../../UI/Svg";
import { Link, useLocation } from "react-router-dom";
import { useUserState } from "../../../store/user";
import { UserInfoComponent } from "../UserInfo";
import { desktopBp } from "../../../styles/variables";
import { fixedMenuBP, useMenu } from "../../../config/menu";
import { useAppState } from "../../../store/app";
import { FillingBorderAnim } from "../../../UI/FillingBorderAnim";
import { activityList } from "../../../config/userActivityList";
import ReportBugComponent from "../ReportBugComponent/ReportBugComponent";
import { withErrorBoundaryHOC } from "../../../utils/withErrorBoundaryHOC";

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

const MenuStyled = styled.div<{ isClose: boolean }>`
  display: flex;
  position: relative;
  z-index: 16;
  flex-direction: column;
  background-color: ${colors.menu};
  min-height: 100vh;
  transition: all 0.25s ease;
  @media screen and (max-width: ${fixedMenuBP}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    ${({ isClose }) => isClose && "min-height: auto;"}
  }
`;

const MenuWrapper = styled.div<{isClose: boolean}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: sticky;
  top: 0;
  @media screen and (max-width: ${fixedMenuBP}) {
    ${({isClose}) => isClose && 'min-height: 0;'}
  }
`;

const MenuHeader = styled.div<{ isClose: boolean }>`
  padding: ${({ isClose }) => (isClose ? "1.04vw" : "2.13vw 2.80vw 2.27vw 2.07vw")};
  display: flex;
  flex-direction: ${({ isClose }) => (isClose ? "column" : "row")};
  align-content: center;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #3cc6c1;
  @media screen and (max-width: ${desktopBp}) {
    padding: ${({ isClose }) => (isClose ? "10px" : "27px 35px 28px 26px")};
  }
  @media screen and (max-width: 740px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    & svg {
      margin-bottom: 0;
    }
  }
`;

const LogoStyled = styled.img`
  cursor: pointer;
  height: 3.09vw;
  width: 11.51vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 39px;
    width: 144px;
  }
`;

const LogoCloseStyled = styled.img`
  cursor: pointer;
  width: 2.6vw;
  object-fit: contain;
  @media screen and (max-width: ${desktopBp}) {
    width: 33px;
  }
`;

const MenuBody = styled.div<{ isClose: boolean }>`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding-top: 0.64vw;
  @media screen and (max-width: ${desktopBp}) {
    padding-top: 8px;
  }
  @media screen and (max-width: 740px) {
    ${({ isClose }) => isClose && "display: none;"}
  }
`;

const MenuItemAnim = keyframes`
  0% {
    margin-inline-start: 0;
  }
  100% {
    margin-inline-start: 10px;
  }
`;

const MenuItemWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  animation: ${MenuItemAnim} 500ms 1700ms forwards;
`;

const MenuItem = styled(Link)<{
  "data-active": boolean;
  "data-isclose": boolean;
}>`
  position: relative;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  background-color: ${colors.menu};
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: ${props => props.theme.fontSize.medium.vw};
  text-transform: capitalize;
  color: ${(s) => (s["data-active"] ? s.theme.color.red : s.theme.color.lightBlue)};
  padding: 0.89vw 0;
  padding-left: ${(s) => (s["data-isclose"] ? "1.3vw" : "2.07vw")};
  box-sizing: border-box;
  text-decoration: none;
  transition: all 0.25s ease;
  border-radius: 0.52vw;
  svg {
    margin-inline-end: ${(s) => (s["data-isclose"] ? "0" : "0.88vw")};
    height: 1.77vw;
    width: 1.77vw;
    path {
      fill: ${(s) => (s["data-active"] ? s.theme.color.red : s.theme.color.lightBlue)};
    }
  }

  span {
    display: ${(s) => (s["data-isclose"] ? "none" : "unset")};
  }

  // &::before {
  //   ${(s) => !s["data-active"] && "display: none;"}
  //   content: '';
  //   position: absolute;
  //   inset-inline-start: 0;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   height: 2.5vw;
  //   width: 0.31vw;
  //   background-color: ${colors.orange};
  //   border-start-end-radius: 0.26vw;
  //   border-end-end-radius: 0.26vw;
  // }

  @media screen and (max-width: ${desktopBp}) {
    padding: 11px 0;
    padding-left: ${(s) => (s["data-isclose"] ? "19.3px" : "26px")};
    font-size: ${props => props.theme.fontSize.medium.px};
    border-radius: 7px;
    svg {
      height: 22px;
      width: 22px;
      margin-inline-end: ${(s) => (s["data-isclose"] ? "0" : "11px")};
    }
    &::before {
      ${(s) => s["data-active"] && "display: none;"}
      height: 31px;
      width: 4px;
      border-start-end-radius: 3px;
      border-end-end-radius: 3px;
    }
  }
  
  @media(max-width: 750px){
    padding-left: 26px;
  }
`;

const ButtonOpenMenu = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 0.78vw;
  margin-inline-end: 0.26vw;
  ${({ isMobile }) => isMobile && "margin-top: 0;"}
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 10px;
    margin-inline-end: 3px;
  }
  @media screen and (max-width: 740px) {
    ${({ isMobile }) => !isMobile && "display: none;"}
  }
  @media screen and (min-width: 740px) {
    ${({ isMobile }) => isMobile && "display: none;"}
  }
`;

const Menu = React.memo(() => {
  const { userInfo } = useUserState();
  const { hint } = useAppState();
  const menu = useMenu();

  const isRtl = useMemo(() => {
    return document.body.dir === "rtl";
  }, [document.body.dir]);

  const permissions: { [page: string]: boolean } = useMemo(() => {
    const pages: { [page: string]: boolean } = {};
    if (userInfo) {
      for (const page in userInfo.permissions) {
        const permsission = userInfo.permissions[page];
        pages[page.replace("_", " ")] = permsission.access;
      }
    }
    return pages;
  }, [userInfo]);

  const showSettingsHint = useMemo(() => {
    if (hint === "digital-post1") return true;
    if (hint === "filters-hint1") return true;
    if (hint === "status-chart1") return true;
    if (hint === "call-center1") return true;
    return false;
  }, [hint]);

  const { pathname } = useLocation();
  //Initially closed on mobile
  const [isClose, setIsClose] = useState<boolean>(
    window.innerWidth < 740 ? true : false
  );

  const handleLinkClick = useCallback(() => {
    if (window.innerWidth < 740) {
      setIsClose(true);
    }
  }, []);

  return (
    <MenuStyled isClose={isClose}>
      <MenuWrapper isClose={isClose}>
        <MenuHeader isClose={isClose}>
          {isClose ? (
            <>
              <LogoCloseStyled
                src={LogoClose}
                data-action={activityList["unfold-menu"]}
                onClick={() => setIsClose(false)}
              />
              <ButtonOpenMenu
                isMobile={true}
                data-action={activityList["unfold-menu"]}
                onClick={() => setIsClose(false)}
              >
                <OpenMenuIcon />
              </ButtonOpenMenu>
            </>
          ) : (
            <LogoStyled
              src={Logo}
              onClick={() => setIsClose(true)}
              data-action={activityList["fold-menu"]}
            />
          )}
        </MenuHeader>
        <UserInfoComponent
          userAvatar={userInfo?.pic}
          groupId={userInfo?.group?.id}
          userLogin={userInfo?.login}
          isClose={isClose}
        />
        {isClose && (
          <ButtonOpenMenu
            isMobile={false}
            onClick={() => setIsClose(false)}
            data-action={activityList["unfold-menu"]}
          >
            <OpenMenuIcon />
          </ButtonOpenMenu>
        )}
        <MenuBody isClose={isClose}>
          {menu.map((item, index) => {
            const key = item.key.replace("_", " ");
            if (!permissions[key]) return null;
            const isActive = pathname === item.link;
            const Icon = Icons[item.icon];
            if (showSettingsHint && key === "Settings") {
              return (
                <MenuItemWrapper
                  key={index}
                  //@ts-ignore
                  data-action={activityList[`menu-${item.key}`]}
                >
                  <FillingBorderAnim
                    duration={1000}
                    delay={2000}
                    startPoint={isRtl ? "left" : "right"}
                  />
                  <MenuItem
                    onClick={handleLinkClick}
                    data-isclose={isClose}
                    to={item.link}
                    data-active={isActive}
                    //We've added this ID to help animated arrow find this menu item in DOM. Don't remove it
                    id={`Menu-${key}`}
                  >
                    <Icon />
                    <span>{item.name}</span>
                  </MenuItem>
                </MenuItemWrapper>
              );
            }
            return (
              <MenuItem
                //@ts-ignore
                data-action={activityList[`menu-${item.key}`]}
                onClick={handleLinkClick}
                data-isclose={isClose}
                to={item.link}
                data-active={isActive}
                key={index}
                //We've added this ID to help animated arrow find this menu item in DOM. Don't remove it
                id={`Menu-${key}`}
              >
                <Icon />
                <span>{item.name}</span>
              </MenuItem>
            );
          })}
        </MenuBody>

      <ReportBugComponent opened={!isClose} />
      </MenuWrapper>
    </MenuStyled>
  );
});

export default withErrorBoundaryHOC(Menu);
