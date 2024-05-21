import React, {useCallback, useState} from "react";
import {Button} from "../../UI/Button";
import {useTranslation} from "react-i18next";
import {ITableColumn} from "../../store/rawData";
import {useCallCenterState} from "../../store/callCenter";
import {CreateRowComponent} from "../RawDataComponents";

const CreateReferrerRow = React.memo(() => {
  const { t } = useTranslation();
  const { interviewees } = useCallCenterState();
  const [creatingRowData, setCreatingRowData] = useState<ITableColumn | null>(
    null
  );

  const handleCreate = useCallback(() => {
    setCreatingRowData({ referal: interviewees?.id || "" });
  }, []);

  return (
    <>
      <Button onClick={handleCreate}>{t("referrer_create")}</Button>
      <CreateRowComponent
        initialData={creatingRowData}
        onClose={() => setCreatingRowData(null)}
      />
    </>
  );
});

export default CreateReferrerRow;
