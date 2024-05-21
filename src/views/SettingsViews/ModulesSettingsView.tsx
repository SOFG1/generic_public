import React, { useRef, useState } from "react"
import { SettingsButton, SettingsCard, SettingsModal, SettingsTitle } from "../../components/SettingsComponents"
import AddVoterView from "./AddVoterView";
import FacebookView from "./FacebookView";
import GoogleView from "./GoogleView";
import ConnectVolunteersView from "./ConnectVolunteersView";
import ConnectElectionDayView from "./ConnectElectionDayView";
import { usePermissions } from "../../store/user";
import EditSmsView from "./EditSmsView";
import EditEmailView from "./EditEmailView";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { useTranslation } from "react-i18next";
import { activityList } from "../../config/userActivityList";
import { useAppState } from "../../store/app";
import { SettingsCardHint } from "../../UI/SettingsCardHint/SettingsCardHint";
import { useHint } from "../../hooks/useHint";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledList = styled.div`
  margin-inline-start: 1.77vw;
  margin-inline-end: 2.14vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 22px;
    margin-inline-end: 27px;
  }
`;


const ModulesSettingsView = React.memo(() => {
    const { t } = useTranslation()
    const { hint } = useAppState()
    const settingsPermissions = usePermissions("Settings");
    const cardRef = useRef<HTMLDivElement>(null)
    const [showModal, setShowModal] = useState<boolean>(false);

    
    useHint("digital-post1", "digital-post2")



    return <SettingsCard ref={cardRef}>
        {hint === "digital-post2" && <SettingsCardHint />}
        <SettingsTitle>{t("settings_modules")}</SettingsTitle>
        <SettingsButton
            as="div"
            data-action={activityList["settings-modules-open"]}
            onClick={() => setShowModal(true)}
        >
            {showModal && (
                <SettingsModal title={t("settings_modules")} onClose={() => setShowModal(false)}>
                    <StyledList>
                        {settingsPermissions.app_connection && <AddVoterView onClose={() => setShowModal(false)} />}
                        {settingsPermissions.facebook && <FacebookView />}
                        {settingsPermissions.google && <GoogleView />}
                        {settingsPermissions.election_day && <ConnectElectionDayView />}
                        {settingsPermissions.volunteers_module && <ConnectVolunteersView />}
                    </StyledList>
                    {settingsPermissions.sms_service && <EditSmsView />}
                    {settingsPermissions.email_service && <EditEmailView />}
                </SettingsModal>
            )}
            {t("settings_modules-edit")}
        </SettingsButton>
    </SettingsCard>
})

export default withErrorBoundaryHOC(ModulesSettingsView)