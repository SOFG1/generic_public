import React, { useCallback, useEffect } from "react";
import { useUserState } from "../../../store/user";
import { User, UserActivityType } from "../../../api/user";
import { useLocation } from "react-router";
import { createActivity } from "../../../utils/createActivity";
import { activityList } from "../../../config/userActivityList";

const UserActivityWatcher = React.memo(() => {
  const { token } = useUserState();
  const { pathname } = useLocation();

  const handleSendActivity = useCallback(
    async (activity: UserActivityType) => {
      if (token) {
        User.sendActivity(token, activity)
      }
    },
    [token]
  );

  const handleDocumentClick = useCallback(
    (e: any) => {
      const button = e.composedPath().find((e:any) => {
        return e?.hasAttribute && e?.hasAttribute("data-action")
      })

      if ( !button) return;
      const action = button?.getAttribute("data-action")
      const activity = createActivity(pathname === "/" ? "stats" : pathname, action)
      handleSendActivity(activity);
    },
    [handleSendActivity, pathname]
  );

  useEffect(() => {
    const activity = createActivity(pathname === "/" ? "stats" : pathname, activityList["open-app"])
    handleSendActivity(activity);
  }, [handleSendActivity]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick)
    return () => {
        document.removeEventListener("click", handleDocumentClick)
    }
  }, [handleDocumentClick])

  return <></>;
});

export default UserActivityWatcher;
