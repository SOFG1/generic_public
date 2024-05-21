import React, { useEffect, useMemo } from "react"
import styled from "styled-components";
import { DropdownWithSearch } from "../../UI/Dropdown";
import { desktopBp } from "../../styles/variables";
import { useCallCenterActions, useCallCenterState } from "../../store/callCenter";
import { useTranslation } from "react-i18next";

const DropdownStyled = styled(DropdownWithSearch)`
  width: 11.98vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 150px;
  }
  @media screen and (max-width: 850px) {
    width: 150px;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;

interface IProps {
  selected: string[]
  onChange: (v: string[]) => void
}


const SmsCampaignComponent = React.memo(({ selected, onChange }: IProps) => {
  const { t } = useTranslation()
  const { campaigns } = useCallCenterState()
  const { onGetCampaigns } = useCallCenterActions()

  const options = useMemo(() => {
    return campaigns.map(c => ({ item: c, value: c }))
  }, [campaigns])


  useEffect(() => {
    onGetCampaigns()
  }, [onGetCampaigns])

  return <DropdownStyled label={t("call-center_sms-campaigns")} placeholder={t("call-center_sms-campaigns")} value={selected.join(", ")} onSelect={(v) => onChange(v.split(", "))} options={options} isMultiSelect={true} />
})

export default SmsCampaignComponent