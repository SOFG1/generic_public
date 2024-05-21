import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { CallCenter } from "../../api/callCenter";
import { appShowAlert, useAppActions } from "../../store/app";
import { useCallCenterState } from "../../store/callCenter";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Dropdown } from "../../UI/Dropdown";
import { Input } from "../../UI/Input";
import { HintText, StyledHint } from "../../UI/InputHint/InputHint";
import { InfoIcon } from "../../UI/Svg";
import { activityList } from "../../config/userActivityList";

const StyledDropdown = styled(Dropdown)`
  margin-bottom: 1.30vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 16px;
  }
`

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
  }
`;


const ButtonStyled = styled(Button)`
  padding: 0.57vw 1.77vw;
  margin: 15.63vw auto 0;
  @media screen and (max-width: ${desktopBp}) {
    padding: 7px 22px;
    margin: 196px auto 0;
  }
`;

const FBPageAudience = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { selectedFBAccount } = useCallCenterState();
  const { onShowAlert } = useAppActions()
  const [pagesOptions, setPagesOptions] = useState<
    { item: string; value: string }[]
  >([]);
  const [selectedPageId, setSelectedPageId] = useState<string>("");
  const [ratio, setRatio] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const onCreateAudienceHandler = useCallback(async () => {
    const audienceData = {
      acc_id: selectedFBAccount,
      page_id: selectedPageId,
      ratio: ratio / 100
    };
    if (token) {
      setIsFetching(true)
      const [dataRes, dataErr] = await handle(CallCenter.createFbPageAudeince(token, audienceData))
      setIsFetching(false)
      if (dataRes) {
        onShowAlert(true, `Audience ${dataRes[0].name} was successfully updated `)
      }
      if (dataErr) {
      const errText = dataErr?.error?.error_user_msg || dataErr.error || "Something went wrong! Try again later!"
        onShowAlert(false, errText)
      }
    }
  }, [selectedFBAccount, selectedPageId, ratio, token]);

  const fetchPagesIds = useCallback(async () => {
    if (token) {
      const [dataRes, dataErr] = await handle(
        CallCenter.getCreativesParams(token)
      );
      if (dataRes) {
        setPagesOptions(
          dataRes.pages.map((p: any) => ({ item: p.name, value: p.id }))
        );
      }
      if (dataErr) {
        const errText = dataErr?.error?.error_user_msg || dataErr.error || "Something went wrong! Try again later!"
        onShowAlert(false, errText)
        console.log(dataErr);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchPagesIds();
  }, [fetchPagesIds]);

  const ratioChangeHandler = (v: string) => {
    const num = parseInt(v, 10)
    if (num > 0 && num < 21) {
      setRatio(num)
    }
  }

  return (
    <>
      <StyledDropdown
        label="Page"
        placeholder="Page"
        value={selectedPageId}
        onSelect={setSelectedPageId}
        options={pagesOptions}
      />

      <InputBox>
        <Input
          label="Top %"
          type="number"
          name="ratio"
          value={ratio.toString()}
          onChange={ratioChangeHandler}
        />
        <StyledHint>
          <HintText>
            Top {ratio}% of original audience in the selected country.
          </HintText>
          <InfoIcon />
        </StyledHint>
      </InputBox>

      <ButtonStyled
        data-action={activityList["call-center-FB-audience_page_create"]}
        disabled={isFetching}
        onClick={onCreateAudienceHandler}
      >
        {t("audience_create")}
      </ButtonStyled>
    </>
  );
});

export default FBPageAudience;
