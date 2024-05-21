import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ISentimentorFilters, useSentimentorActions } from "../../store/sentimentor";
import { useSelector } from "react-redux";
import { sentimentorIsFetchingDefamatorySelector } from "../../store/sentimentor/selectors";
import { activityList } from "../../config/userActivityList";
import { DefamatoryReportIcon } from "../../UI/Svg";
import { ToolbarButton } from "../../UI/ToolbarButton";


interface IProps {
  filters: ISentimentorFilters
}

const DefamatoryReportComponent = React.memo(({ filters }: IProps) => {
  const { t } = useTranslation();
  const isFetching = useSelector(sentimentorIsFetchingDefamatorySelector);
  const { onDownloadDefamatory } = useSentimentorActions();
  

  return (
    <ToolbarButton
      onClick={() => onDownloadDefamatory(filters)}
      disabled={isFetching}
      opened={false}
      data-action={activityList["defamatory-report"]}
    >
      <p>{t("ranking_defamatory-popup")}</p>
      <DefamatoryReportIcon />
    </ToolbarButton>
  );
});

export default DefamatoryReportComponent;
