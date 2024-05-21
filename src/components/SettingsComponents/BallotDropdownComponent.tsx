import React, { useState, useCallback, useEffect } from "react"
import styled from "styled-components"
import { DropdownSearchFetch, DropdownWithSearch } from "../../UI/Dropdown"
import { desktopBp } from "../../styles/variables"
import { useTranslation } from "react-i18next"
import { onlyNumbersValidator } from "../../utils"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { RawData } from "../../api/rawData"

const StyledDopdown = styled(DropdownWithSearch)`
    max-width: 15.63vw;
    width: 52.08vw;
    @media screen and (max-width: ${desktopBp}) {
        max-width: 196px;
        width: 654px;
    }
`


interface IProps {
    value: string
    onChange: (v: string) => void
}

const BallotDropdownComponent = React.memo(({ value, onChange }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const [options, setOptions] = useState<any[]>([])


    const handleFetchOptions = useCallback(async (v?: string) => {
        if (token) {
            const params: any = {
                filter_name: "ballot_id"
            }
            if (v) params.option = v
            const [dataRes, dataErr] = await handle(RawData.getFilterData(params, token))
            if (dataRes) {
                const opts = dataRes.filter((o: any) => o[0]).map((o: any) => ({ item: String(o[0]), value: String(o[0]) }))
                setOptions(opts)
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }
    }, [token])




    useEffect(() => {
        handleFetchOptions()
    }, [handleFetchOptions])





    return <StyledDopdown
        label={t("settings_app-ballot_label")}
        placeholder={t("settings_app-ballot_label")}
        //validator={onlyNumbersValidator}
        options={options}
        value={value}
        onSelect={onChange}
    //  onSearch={handleFetchOptions}
    />
})

export default BallotDropdownComponent