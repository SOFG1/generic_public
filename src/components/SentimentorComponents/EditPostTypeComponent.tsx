import React, { useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { DropdownWithSearch } from "../../UI/Dropdown"
import { Button } from "../../UI/Button"
import { useTranslation } from "react-i18next"
import { activityList } from "../../config/userActivityList"
import { useSelector } from "react-redux"
import { settingsPostTypesSelector, useSettingsActions } from "../../store/settings"


const StyledContent = styled.div`
    min-height: 300px;
`

const StyledTitle = styled.p`
    text-align: center;
    margin: 0 0 10px;
`

const StyledDropdown = styled(DropdownWithSearch)`
    margin-bottom: 25px;
    min-width: 300px;
    max-width: 100%;
`

const StyledBtn = styled(Button)`

`


interface IProps {
    post_type: Array<string | null>
    onChange: (t: string[]) => void
    onClose: () => void
    isFetching: boolean
}

const EditPostTypeComponent = React.memo(({ onChange, onClose, isFetching, post_type }: IProps) => {
    const { t } = useTranslation()
    const post_types = useSelector(settingsPostTypesSelector)
    const { onGetPostTypes } = useSettingsActions()
    const [value, setValue] = useState<string>("")




    const options = useMemo(() => {
        return post_types.map(t => ({ item: t, value: t }))
      }, [post_types])
    
    
      useEffect(() => {
        onGetPostTypes()
      }, [])

      useEffect(() => {
     //   setValue(post_type.join(", "))
      }, [post_type])


    const handleChange = useCallback(() => {
        onChange(value.split(", "))
        onClose()
    }, [value])



    return <StyledContent>
        <StyledTitle>{t("ranking_pub-type-title")}</StyledTitle>
        <StyledDropdown isMultiSelect={true} label={t("ranking_pub-type-label")} placeholder={t("ranking_pub-type-label")} value={value} onSelect={setValue} options={options} />
        <StyledBtn disabled={isFetching} onClick={handleChange} data-action={activityList["ranking-change-post_type"]}>{t("ranking_pub-type-btn")}</StyledBtn>
    </StyledContent>
})


export default EditPostTypeComponent