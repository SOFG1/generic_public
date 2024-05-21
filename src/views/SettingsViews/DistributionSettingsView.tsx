import React, { useState, useRef } from "react"
import { SettingsButton, SettingsCard, SettingsModal, SettingsTitle } from "../../components/SettingsComponents"
import { useTranslation } from "react-i18next"
import { activityList } from "../../config/userActivityList"
import EditQuestionnairesView from "./EditQuestionnairesView"
import { usePermissions } from "../../store/user"
import EditCallCenterView from "./EditCallCenterView"
import AppSettingsView from "./AppSettingsView"
import { useAppState } from "../../store/app"
import { SettingsCardHint } from "../../UI/SettingsCardHint/SettingsCardHint"
import { useHint } from "../../hooks/useHint"
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC"



const DistributionSettingsView = React.memo(() => {
    const { t } = useTranslation()
    const { hint } = useAppState()
    const cardRef = useRef<HTMLDivElement>(null)
    const permissions = usePermissions("Settings");
    const [showModal, setShowModal] = useState<boolean>(false);

    useHint("call-center1", "call-center2", cardRef)


    return <SettingsCard ref={cardRef}>
        {hint === "call-center2" && <SettingsCardHint />}
        <SettingsTitle>{t("settings_call-center")}</SettingsTitle>
        <SettingsButton
            as="div"
            data-action={activityList["settings-distribution-open"]}
            className="call-center_settings"
            onClick={() => setShowModal(true)}
        >
            {showModal && (
                <SettingsModal title={t("settings_call-center")} onClose={() => setShowModal(false)}>
                    {permissions.call_center && <EditQuestionnairesView />}
                    {permissions.call_center && <EditCallCenterView />}
                    {permissions.VoterUsers && <AppSettingsView />}
                </SettingsModal>
            )}
            {t("settings_call-edit")}
        </SettingsButton>
    </SettingsCard>
})

export default withErrorBoundaryHOC(DistributionSettingsView)