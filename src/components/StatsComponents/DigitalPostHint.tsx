import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useUserState } from "../../store/user";
import { HintComponent } from "../../UI/HintComponent";
const StyledWrapper = styled.div`
  position: relative;
`;

const StyledHint = styled(HintComponent)`
  margin: 0 10px;
`;

const StyledHintText = styled.p`
  margin: 0;
  white-space: pre-wrap;
`;

const DigitalPostHint = React.memo(() => {
  const { t } = useTranslation();
  const { userInfo } = useUserState();
  const [matchesMQuery500px, setMatchesMQuery500px] = useState<boolean>(false);

  const userConnectedFacebook = useMemo(() => {
    return !!userInfo?.group.facebook.length;
  }, [userInfo]);

  const mQuery500px = useMemo(() => {
    return window.matchMedia("(max-width: 500px)");
  }, []);

  const handleSetMQuery500px = useCallback(() => {
    setMatchesMQuery500px(mQuery500px.matches);
  }, [mQuery500px]);

  useEffect(() => {
    setMatchesMQuery500px(mQuery500px.matches)
    mQuery500px?.addEventListener("change", handleSetMQuery500px);
    return () =>
      mQuery500px.removeEventListener("change", handleSetMQuery500px);
  }, [mQuery500px, handleSetMQuery500px]);

  const offlineScoreHintPosition = useMemo(() => {
    return matchesMQuery500px ? "top" : "end";
  }, [matchesMQuery500px]);

  return (
    <StyledWrapper>
      <StyledHint
        position={offlineScoreHintPosition}
        currentHint={userConnectedFacebook ? undefined : 'digital-post1'}
        arrowHintTarget={userConnectedFacebook ? undefined : 'Menu-Settings'}
        items={
          userConnectedFacebook
            ? [
                <StyledHintText>{t("stats_post-hint1")}</StyledHintText>,
                <StyledHintText>{t("stats_post-hint2")}</StyledHintText>,
              ]
            : [<StyledHintText>{t("stats_post-hint3")}</StyledHintText>]
        }
      />
    </StyledWrapper>
  );
});

export default DigitalPostHint;
