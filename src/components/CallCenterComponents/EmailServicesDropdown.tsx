import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { DropdownWithSearch } from "../../UI/Dropdown";
import { desktopBp } from "../../styles/variables";
import { useTranslation } from "react-i18next";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { CallCenter } from "../../api/callCenter";


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
    value?: number
    onChange: (v: number) => void
}


const EmailServicesDropdown = React.memo(({ value, onChange }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const [options, setOptions] = useState<{ item: string, value: number }[]>([])

    const fetchServicesOptions = useCallback(async () => {
        if (token) {
            const [dataRes, dataErr] = await handle(CallCenter.getEmailServices(token))
            if (dataRes) {
                console.log(dataRes)
                const opts = dataRes.map((s: any) => ({ item: s.view_name, value: s.id }))
                setOptions(opts)
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }
    }, [token])

    useEffect(() => {
        fetchServicesOptions()
    }, [fetchServicesOptions])



    return <DropdownStyled
        value={value || ""}
        label={t("call-center_email-service")}
        placeholder={t("call-center_email-service")}
        onSelect={onChange}
        options={options}
    />
})

export default EmailServicesDropdown