import React, { useCallback, useMemo } from "react";
import success from "../../../assets/images/success.svg";
import { useAppActions, useAppState } from "../../../store/app";
import { useUserActions } from "../../../store/user";
import { useLocation } from "react-router-dom";
import { createActivity } from "../../../utils/createActivity";
import { activityList } from "../../../config/userActivityList";
import { Modal } from "../../../UI/Modal";
import { Button } from "../../../UI/Button";
import { ErrorIcon, FileErrorIcon } from "../../../UI/Svg";
import { useTranslation } from "react-i18next";
import { withErrorBoundaryHOC } from "../../../utils/withErrorBoundaryHOC";



const AlertComponent = React.memo(() => {
  const { t } = useTranslation()
  const { alert } = useAppState();
  const { onSendActivity } = useUserActions();
  const { onCloseAlert } = useAppActions();
  const { pathname } = useLocation();

  const handleButtonClick = useCallback(
    (e: any) => {
      e.stopPropagation(); //Prevent other modals closing
      const activity = createActivity(pathname, activityList["close-alert"]);
      onSendActivity(activity);
      onCloseAlert();
    },
    [onCloseAlert, pathname]
  );

  const text = useMemo(() => {
    return alert?.text?.toString() || String(alert?.text)
  }, [alert?.text])


  //Invalid file format alert
  if (text?.match("Unknown file format") && !alert?.isSuccess) {
    return <Modal show={!!alert} onClose={onCloseAlert}>
      <div className="modalSuccess">
        <FileErrorIcon />
        <div className="modalSuccess__text">{text}</div>
        <Button
          onClick={handleButtonClick}
        >
          {t("alert_close")}
        </Button>
      </div>
    </Modal>
  }

  return (
    <Modal show={!!alert} onClose={onCloseAlert}>
      <div className="modalSuccess">
        {alert?.isSuccess && (
          <img src={success} alt="alert img" />
        )}
        {!alert?.isSuccess && (
          <ErrorIcon />
        )}

        <div className="modalSuccess__text">{text}</div>
        <Button
          onClick={handleButtonClick}
        >
          {t("alert_close")}
        </Button>
      </div>
    </Modal>
  );
});


export default withErrorBoundaryHOC(AlertComponent)