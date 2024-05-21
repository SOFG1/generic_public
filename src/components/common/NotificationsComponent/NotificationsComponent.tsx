import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { useAppActions, useAppState } from "../../../store/app";
import { NotificationsIcon } from "../../../UI/Svg";
import { desktopBp } from "../../../styles/variables";
import { useTranslation } from "react-i18next";
import NotificationComponent from "./NotificationComponent";

const Wrapper = styled.div`
  position: relative;
  z-index: 30;
`;

const StyledBtn = styled.button`
  position: relative;
  padding: 0;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  width: 1.93vw;
  height: 2.34vw;
  svg {
    height: 100%;
    width: 100%;
  }
  @media screen and (max-width: ${desktopBp}) {
    width: 24px;
    height: 29px;
  }
`;

const BtnCircle = styled.span`
  position: absolute;
  height: 0.68vw;
  width: 0.68vw;
  border-radius: 50%;
  background-color: #FF3232;
  bottom: 19px;
  inset-inline-end: 4px;
  @media screen and (max-width: ${desktopBp}) {
    height: 8px;
    width: 8px;
  }
`;

const StyledList = styled.div`
  position: absolute;
  top: 100%;
  max-width: 550px;
  inset-inline-end: -50px;
  max-height: 400px;
  background-color: white;
  padding: 1.04vw;
  border-radius: 0.54vw;
  overflow-y: auto;
  box-shadow: 0 4px 6px #949494;
  @media screen and (max-width: ${desktopBp}) {
    padding: 13px;
    border-radius: 7px;
  }
`;

const StyledEmptyMes = styled.p`
  margin: 0;
`


const NotificationsComponent = React.memo(() => {
  const { t } = useTranslation()
  const { notifications } = useAppState();
  const { onGetNotifications } =
    useAppActions();
  const [opened, setOpened] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: any) => {
      if (!e.composedPath().includes(wrapperRef.current)) setOpened(false);
    },
    [wrapperRef]
  );

  //Get notifications initially
  useEffect(() => {
    onGetNotifications();
  }, []);

  //set interval for updating notifications
  useEffect(() => {
    const notifactionObserver = setInterval(() => {
      onGetNotifications();
    }, 30000);
    return () => {
      clearInterval(notifactionObserver);
    };
  }, []);

  //Add/remove eventListener for handleClickOutside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);


  return (
    <Wrapper ref={wrapperRef}>
      <StyledBtn onClick={() => setOpened((p) => !p)}>
        <NotificationsIcon />
        {notifications.length > 0 && <BtnCircle />}
      </StyledBtn>
      {opened && (
        <StyledList>
          {notifications.map((n) => {
            return <NotificationComponent notification={n} key={n.id} />
          })}
          {notifications.length === 0 && (
            <StyledEmptyMes>{t("notification-empty")}</StyledEmptyMes>
          )}
        </StyledList>
      )}
    </Wrapper>
  );
});

export default NotificationsComponent;
