import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Title } from "../../components/common/Title";
import {
  IDefaultPage,
  useSettingsActions,
  useSettingsState,
} from "../../store/settings";
import { useSMStatsState } from "../../store/smStats";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Checkbox } from "../../UI/Input";
import { activityList } from "../../config/userActivityList";

const CardTitle = styled(Title)`
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.51vw;
  margin: 0 0 1.3vw;
  text-align: center;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 19px;
    margin: 0 0 16px;
  }
`;

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
`;

const StyledName = styled.p`
width: 200px;
`;

const StyledBtn = styled(Button)`
  width: 5.21vw;
  margin: 0 auto;
  @media screen and (max-width: ${desktopBp}) {
    width: 65px;
  }
`;

const EditPagesContent = React.memo(() => {
  const { t } = useTranslation();
  const {userInfo} = useUserState()
  const {pages} = useSMStatsState()
  const { defaultPages } = useSettingsState();
  const { onGetDefaultPages, onEditDefaullPages } = useSettingsActions();
  const [items, setItems] = useState<{[k: string]: IDefaultPage}>({});


  useEffect(() => {
    onGetDefaultPages();
  }, []);

  useEffect(() => {
    const newVal: {[key: string]: IDefaultPage} = {}
    defaultPages.forEach(p => {
        newVal[p.page_id] = p
    })
    setItems(newVal);
  }, [defaultPages]);

  const handleChange = useCallback((page_id: string, val: boolean) => {
    setItems((p) => {
        return {
            ...p,
            [page_id]: {...p[page_id], viewed: val}
        }
    })
  }, [])


  const handleSave = useCallback(() => {
    const arr = Object.values(items)
    onEditDefaullPages(arr)
  }, [items])


  const isTestUser = useMemo(() => {
    if(userInfo?.login === 'Test_user_H') return true
    if(userInfo?.login === 'Test_user_E') return true
    return false
  }, [userInfo])

  


  return (
    <>
      <CardTitle>{t("settings_pages-title")}</CardTitle>
      {Object.values(items).map((page) => {
        const assetName = pages.find(p => p.id === page.page_id)?.name
        return (
          <StyledItem key={page.page_id}>
            <StyledName>{page.name}</StyledName>
            {assetName && isTestUser && <StyledName>{assetName}</StyledName>}
            <Checkbox label="" isActive={page.viewed} onChange={(v) => handleChange(page.page_id, v)} />
          </StyledItem>
        );
      })}
      <StyledBtn onClick={handleSave} data-action={activityList["settings-pages-save"]}>{t("settings_pages-save")}</StyledBtn>
    </>
  );
});

export default EditPagesContent;
