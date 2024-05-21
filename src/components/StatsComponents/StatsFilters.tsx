import React, { useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDateOptions } from "../../config";
import { useSMStatsActions, useSMStatsState } from "../../store/smStats";
import { desktopBp } from "../../styles/variables";
import { Dropdown } from "../../UI/Dropdown";
import { jsPDF } from "jspdf";
import "../../utils/canvasDrawingBuffer";
import { activityList } from "../../config/userActivityList";
import { useUserState } from "../../store/user";
import { CameraIcon } from "../../UI/Svg";
import { ToolbarButton } from "../../UI/ToolbarButton";
const { useScreenshot } = require("use-react-screenshot");

const StyledScreenBtn = styled(ToolbarButton)`
  margin-inline-end: auto;
`;

const DropdownBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.63vw;
  margin-inline-start: 2.08vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 26px;
    gap: 8px;
  }
`;

const LabelStyled = styled.p`
  font-size: 0.83vw;
  line-height: 0.94vw;
  margin: 0 auto;
  white-space: nowrap;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    line-height: 12px;
  }
`;

const DropdownStyled = styled(Dropdown)`
  width: 10.68vw;
  flex-grow: 1;
  margin-bottom: 0;
  label {
    display: none;
  }
  @media screen and (max-width: ${desktopBp}) {
    width: 134px;
  }
`;

const StatsFilters = React.memo(() => {
  const { t } = useTranslation();
  const { userInfo } = useUserState()
  const {
    daysFilter: statsDaysFilter,
    pageFilter,
    pages,
    groupsFilter,
    isFetchingStats,
  } = useSMStatsState();
  const { onSetDayFilter: onSetStatsDayFilter, onSetPageFilter, onGetPages, onSetGroupsFilter } =
    useSMStatsActions();
  const dateOptions = useDateOptions();
  const [image, takeScreenshot] = useScreenshot();

  const pagesOptions: Array<{ item: string; value: string | number }> =
    useMemo(() => {
      return [
        {
          item: "All",
          value: "",
        },
        ...pages.map((page) => {
          return {
            item: page.name,
            value: page.id,
          };
        }),
      ];
    }, [pages]);


  const groupsOptions = useMemo(() => {
    return userInfo?.group_connect?.map(g => ({ item: String(g), value: g })) || []
  }, [userInfo?.group_connect])

  const handleTakeScreenShot = async () => {
    const statsPage = document.getElementById("stats-page");
    //shadows cause problems in screenshot so we remove remove them
    document.body.classList.add("no-shadows");
    const img = await takeScreenshot(statsPage);
    document.body.classList.remove("no-shadows"); //bring shadows back
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(img, "png", 5, 10, 200, 250);
    pdf.save();
  };


  useEffect(() => {
    if (userInfo?.login) {
      onGetPages()
    }
  }, [userInfo?.login])

  return (
    <>
      {!isFetchingStats && (
        <StyledScreenBtn
          onClick={handleTakeScreenShot}
          opened={false}
          data-action={activityList["stats-sreenshot"]}
        >
          <p>{t("stats_screenshot")}</p>
          <CameraIcon />
        </StyledScreenBtn>
      )}
      <DropdownBox>
        <LabelStyled>{t("stats_assets-dropdown")}</LabelStyled>
        <DropdownStyled
          label={t("stats_assets-dropdown")}
          value={pageFilter}
          placeholder={t("stats_assets-dropdown")}
          onSelect={(val) => onSetPageFilter(val)}
          options={pagesOptions}
        />
      </DropdownBox>
      <DropdownBox>
        <LabelStyled>{t("stats_date-dropdown")}</LabelStyled>
        <DropdownStyled
          label={t("stats_date-dropdown")}
          value={statsDaysFilter}
          placeholder={t("stats_date-dropdown")}
          onSelect={(val) => onSetStatsDayFilter(val)}
          options={dateOptions}
        />
      </DropdownBox>
      {userInfo?.group_connect && (
        <DropdownBox>
          <LabelStyled>{t("stats_groups-dropdown")}</LabelStyled>
          <DropdownStyled
            label={t("stats_groups-dropdown")}
            value={groupsFilter}
            placeholder={t("stats_groups-dropdown")}
            isMultiSelect={true}
            onSelect={(val) => onSetGroupsFilter(val)}
            options={groupsOptions}
          />
        </DropdownBox>
      )}
    </>
  );
});

export default StatsFilters;
