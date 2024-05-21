import React, { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Dropdown, DropdownWithSearch } from "../../UI/Dropdown"
import styled from "styled-components"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { User } from "../../api/user"


const StyledDropdown = styled(DropdownWithSearch)`
    max-width: 300px;
    margin: 10px auto;
`



interface IProps {
    value: number[]
    onChange: (v: number[]) => void
    countryId: number
}


const CitiesDropdownComponent = React.memo(({ value, onChange, countryId }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const [options, setOptions] = useState<{item: string, value: number}[]>([])
    const handleChange = useCallback((v: string) => {
        const arr = v.split(", ").filter(v => v).map(v => Number(v))
        onChange(arr)
    }, [])

    const fetchOptions = useCallback(async () => {
        if(token && countryId) {
            const [dataRes, dataErr] = await handle(User.getCitiesOptions(token, countryId))
            if(dataRes) {
                const opts = dataRes.map((c: any) => ({item: c.city_name, value: c.city_code}))
                setOptions(opts)
            }
            if(dataErr) {
                console.log(dataErr)
            }
        }

    }, [token, countryId])

    useEffect(() => {
        fetchOptions()
    }, [fetchOptions])

    useEffect(() => {
        onChange([])
    }, [countryId])

    return <StyledDropdown isReversed={true} label={t("sign-up_step2-city")} placeholder={t("sign-up_step2-city")} value={value.join(", ")} onSelect={handleChange} options={options} isMultiSelect={true} />
})


export default CitiesDropdownComponent