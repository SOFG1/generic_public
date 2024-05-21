import React, { useCallback, useMemo } from "react"
import styled from "styled-components"
import { desktopBp } from "../../styles/variables"
import { useSettingsActions, useSettingsState } from "../../store/settings"
import { useTranslation } from "react-i18next"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { Settings } from "../../api/settings"
import { useAppActions } from "../../store/app"


const StyledTab = styled.div`
  position: relative;
  font-size: 0.94vw;
  font-weight: 700;
  min-width: 8.23vw;
  line-height: 1;
  padding: 0.52vw;
  text-align: center;
  border: 1px solid #000;
  &:hover {
    color: #fff;
    background-color: #000;
  }
  &:hover > div {
    display: block;
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    padding: 7px;
    min-width: 103px;
  }
`

const customQuestionnaireName = "Volunteer Questionnaire"

interface IProps {
  selectedUsers: number[]
}


const AssignCustomQuestionnaire = React.memo(({ selectedUsers }: IProps) => {
  const { t } = useTranslation()
  const { token } = useUserState()
  const { voterQuests } = useSettingsState()
  const { onGetVoterUsers } = useSettingsActions()
  const { onShowAlert } = useAppActions()


  const customQuestionnaire = useMemo(() => {
    return voterQuests.find(q => q.name === customQuestionnaireName)
  }, [voterQuests, customQuestionnaireName])

  const handleApply = useCallback(async () => {
    if (token && customQuestionnaire) {
      const [dataRes, dataErr] = await handle(Settings.setQuestionnaireUsers(token, customQuestionnaire.id, selectedUsers))
      if (!dataErr) {
        onShowAlert(true, t("settings_call-quests_users-success"))
        onGetVoterUsers()
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error)
      }
    }
  }, [token, customQuestionnaire, selectedUsers, t])



  if (!customQuestionnaire) return null
  return <StyledTab onClick={handleApply}>{t("settings_call-custom_quest-apply", { name: customQuestionnaire.name })}</StyledTab>
})

export default AssignCustomQuestionnaire
