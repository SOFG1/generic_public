import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  IOpponents,
  OpponentOrderType,
  useOpponentsActions,
} from "../../store/opponents";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Modal } from "../../UI/Modal";
import { FacebookIcon } from "../../UI/Svg";
import { activityList } from "../../config/userActivityList";

const OpponentsBox = styled.div`
  padding: 0 2.08vw;
  height: 18.23vw;
  overflow-y: auto;
  margin-bottom: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 0 26px;
    height: 229px;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 600px) {
    padding: 5px;
  }
`;

const StyledMessage = styled.h2`
  text-align: center;
  max-width: 36.46vw;
  margin: 0 auto;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 458px;
  }
`;

const StyledOpponent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.04vw;
  border: 1px solid #000;
  padding: 0.52vw 5px;
  margin-bottom: 0.52vw;
  cursor: pointer;
  transition: 300ms;
  &:hover {
    box-shadow: 0 1px 5px #000;
  }
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
    padding: 7px 3px;
    margin-bottom: 7px;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    padding: 5px 10px;
  }
`;

const PreferredOpponent = styled(StyledOpponent)`
  padding: 0.78vw 1.56vw;
  margin-bottom: 1.56vw;
  p {
    font-size: 1.25vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    padding: 10px 20px;
    margin-bottom: 20px;
    p {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 600px) {
    padding: 10px 15px;
  }
`;

const OpponentName = styled.p`
  margin: 0;
  font-size: 1.15vw;
  font-weight: 700;
  padding: 5px 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 14px;
    padding: 3px 7px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 20px;
  }
`;

const StyledButton = styled(Button)`
  max-width: 13.02vw;
  font-size: 1.35vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 163px;
    font-size: 17px;
  }
`;

const SmallButton = styled(Button)`
  padding: 0.36vw 0.78vw;
  max-width: 8.85vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 111px;
    padding: 5px 10px;
  }
`;

interface IProps {
  order: OpponentOrderType;
  opponents: IOpponents;
  onSelect: (opponent: any) => void;
  onClose: () => void;
}

const SelectOpponentComponent = React.memo(
  ({ onClose, opponents, onSelect, order }: IProps) => {
    const { t } = useTranslation();
    const { onResetSelected } = useOpponentsActions();
    const [showPreffered, setShowPreferred] = useState<boolean>(false);

    useEffect(() => {
      if (opponents.preferred) setShowPreferred(true);
    }, [opponents]);

    const handleSelect = useCallback(
      (opponent: any) => {
        onClose();
        onSelect(opponent);
      },
      [onSelect, onClose]
    );

    //This funciton closes the modal but also fetches GTrends data
    const handleClose = useCallback(() => {
      onClose();
    }, [onSelect, onClose]);

    const handleCloseAndReset = useCallback(() => {
      onResetSelected(order);
      onClose();
    }, [onClose, order]);

    return (
      <Modal show={true} onClose={handleClose}>
        <h1>{t("opponents-select_title")}</h1>
        {showPreffered && (
          <>
            <StyledMessage>{t("opponents-select_subtitle")}</StyledMessage>
            <PreferredOpponent
              data-action={activityList["opponents-select_preferred"]}
              key={opponents.preferred.id}
              onClick={() => handleSelect(opponents.preferred)}
            >
              <OpponentName>{opponents.preferred.page_name}</OpponentName>
              {opponents.preferred.page_id && (
                <a
                  onClick={(e) => e.stopPropagation()}
                  href={`https://www.facebook.com/${opponents.preferred.page_id}/`}
                  target="_blank"
                >
                  <FacebookIcon />
                </a>
              )}
            </PreferredOpponent>
            <ButtonBox>
              <StyledButton onClick={() => setShowPreferred(false)} data-action={activityList["opponents-preferred_no"]}>
                {t("opponents-select_no")}
              </StyledButton>
              <StyledButton onClick={() => handleSelect(opponents.preferred)} data-action={activityList["opponents-preferred_no"]}>
                {t("opponents-select_yes")}
              </StyledButton>
            </ButtonBox>
          </>
        )}

        {!showPreffered && (
          <>
            <h2>{t("opponents-select_title")}:</h2>
            <OpponentsBox>
              {opponents.all.map((o) => {
                return (
                  <StyledOpponent key={o.id} onClick={() => handleSelect(o)}  data-action={activityList["opponents-select-not_preferred"]}>
                    <OpponentName>{o.page_name}</OpponentName>
                    {o.page_id && (
                      <a
                        onClick={(e) => e.stopPropagation()}
                        href={`https://www.facebook.com/${o.page_id}/`}
                        target="_blank"
                      >
                        <FacebookIcon />
                      </a>
                    )}
                  </StyledOpponent>
                );
              })}
            </OpponentsBox>
            <StyledMessage>{t("opponents-select_no-other")}</StyledMessage>
            <ButtonBox>
              <SmallButton onClick={handleCloseAndReset} data-action={activityList["opponents-search-no"]}>
                {t("opponents-select_no")}
              </SmallButton>
              <SmallButton onClick={handleClose} data-action={activityList["opponents-search-yes"]}>
                {t("opponents-select_yes")}
              </SmallButton>
            </ButtonBox>
          </>
        )}
      </Modal>
    );
  }
);

export default SelectOpponentComponent;
