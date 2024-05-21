import React, { useRef, useState, useEffect, useMemo } from "react"
import { SettingsButton, SettingsCard, SettingsModal, SettingsTitle } from "../../components/SettingsComponents"
import { useTranslation } from "react-i18next";
import { activityList } from "../../config/userActivityList";
import { usePermissions, useUserState } from "../../store/user";
import EditFieldsView from "./EditFieldsView";
import EditStatusView from "./EditStatusView";
import EditInstitutionsView from "./EditInstitutionsView";
import { useAppState } from "../../store/app";
import { SettingsCardHint } from "../../UI/SettingsCardHint/SettingsCardHint";
import { useHint } from "../../hooks/useHint";
import EditPagesView from "./EditPagesView";
import { useSearchParams } from "react-router-dom";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";
import {EditSentimentScoreDefinitionView} from "./index";



const GeneralSettingsView = React.memo(() => {
    const { t } = useTranslation()
    const { userInfo } = useUserState()
    const { hint } = useAppState()
    const [searchParams] = useSearchParams();
    const settingsPermissions = usePermissions("Settings");
    const cardRef = useRef<HTMLDivElement>(null)
    const [showModal, setShowModal] = useState<boolean>(false);

    const isConnected = useMemo(() => {
        return userInfo?.group?.facebook.length !== 0;
    }, [userInfo]);

    useHint("filters-hint1", "filters-hint2", cardRef)
    useHint("status-chart1", "status-chart2", cardRef)

    useEffect(() => {
        const modal = searchParams.get("modal");
        if (modal === "general") {
            setShowModal(true);
        }
    }, [searchParams]);




    return <SettingsCard>
        {hint === "filters-hint2" && <SettingsCardHint />}
        {hint === "status-chart2" && <SettingsCardHint />}
        <SettingsTitle>{t("settings_general")}</SettingsTitle>
        <SettingsButton
            as="div"
            data-action={activityList["settings-general-open"]}
            onClick={() => setShowModal(true)}
        >
            {showModal && (
                <SettingsModal title={"General setting"} onClose={() => setShowModal(false)}>
                    {settingsPermissions.fields && <EditFieldsView />}
                    {settingsPermissions.statuses && <EditStatusView />}
                    {settingsPermissions.institutions && <EditInstitutionsView />}
                    <EditSentimentScoreDefinitionView/>
                    {!settingsPermissions.facebook_pages && isConnected && <EditPagesView />}
                </SettingsModal>
            )}
            {t("settings_general-edit")}
        </SettingsButton>
    </SettingsCard>
})

export default withErrorBoundaryHOC(GeneralSettingsView)
