import React, { useCallback, useEffect, useState } from "react"
import { SettingsButton, SettingsCard, SettingsModal, SettingsTitle } from "../../components/SettingsComponents"
import { activityList } from "../../config/userActivityList";
import { CreateableDropdown } from "../../UI/CreateableDropdown";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button } from "../../UI/Button";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import { settingsPostTypesFetchingSelector, settingsPostTypesSelector, useSettingsActions } from "../../store/settings";
import { useSelector } from "react-redux";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";



const StyledBtn = styled(Button)`
    margin: 10px auto 0;
`


const PostTypesView = React.memo(() => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const post_types = useSelector(settingsPostTypesSelector)
    const isFetchingTypes = useSelector(settingsPostTypesFetchingSelector)
    const { onGetPostTypes } = useSettingsActions()
    const { onShowAlert } = useAppActions()
    const [types, setTypes] = useState<string[]>([])
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false)



    const handleSave = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Settings.savePostTypes(token, types))
            setIsFetching(false)
            if (dataRes) {
                onShowAlert(true, t("settings_post-types_success"))
                onGetPostTypes()
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
                console.log(dataErr)
            }
        }
    }, [token, types, t])


    useEffect(() => {
        onGetPostTypes()
    }, [])

    useEffect(() => {
        setTypes(post_types)
    }, [post_types])




    return <SettingsCard>
        <SettingsTitle>{t("settings_post-types")}</SettingsTitle>
        <SettingsButton
            as="div"
            data-action={activityList["settings-post_types-open"]}
            onClick={() => setShowModal(true)}
        >
            {showModal && (
                <SettingsModal title={t("settings_post-types")} onClose={() => setShowModal(false)}>
                    <CreateableDropdown label={t("settings_post--types_label")} options={[]} value={types.map(t => ({ label: t, value: t }))} onChange={(v) => setTypes(v.map(v => v.value))} />
                    <StyledBtn onClick={handleSave} disabled={isFetching || isFetchingTypes} data-action={activityList["settings-post_types-save"]}>{t("settings_post--types_save")}</StyledBtn>
                </SettingsModal>
            )}
            {t("settings_post--types_edit")}
        </SettingsButton>
    </SettingsCard>
})

export default withErrorBoundaryHOC(PostTypesView)
