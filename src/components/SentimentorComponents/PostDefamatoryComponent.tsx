import React, { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { activityList } from "../../config/userActivityList";
import { usePermissions, useUserState } from "../../store/user";
import { handle } from "../../api";
import { Sentimentor } from "../../api/sentimentor";
import { Loader } from "../../UI/Spinners";
import { DefamatoryFalseIcon, DefamatoryTrueIcon } from "../../UI/Svg";
import { useAppActions } from "../../store/app";


const StyledWrapper = styled.div`
position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px solid #000;
  background: #FFF;
  padding: 3px 5px;
  flex-shrink: 0;
  svg {
    margin-inline-start: 10px;
  }
`

const StyledLabel = styled.p`
  color: #000;
  font-size: 12px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 2px;
  text-decoration: underline;
`;

const StypedText = styled.p`
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 19px;
    width: 86px;
    border: 1px solid #000;
    background-color: #fff;
    z-index: 1;
    border-radius: 10px;
    margin: 0;
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: 50ms;
    div:hover > & {
        opacity: 1;
    }
`


const StyledLoader = styled(Loader)`
    height: 12px;
    width: 12px;
    margin-inline-start: 5px;
`

interface IProps {
    id: string
    defamatory?: boolean | null
    table: string
    onChangeDefamatory: () => void
    onSetProcessed: (p: boolean) => void
}

const PostDefamatoryComponent = React.memo(({ id, defamatory, table, onChangeDefamatory, onSetProcessed }: IProps) => {
    const { t } = useTranslation()
    const { token, userInfo } = useUserState()
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const changeDefamatoryPermission = usePermissions("Ranking").defamatory


    const is409Group = useMemo(() => {
        return userInfo?.group.id === 409
    }, [userInfo?.group.id])


    const handleChange = useCallback(async () => {
        if (token) {
            if (!is409Group) onSetProcessed(true)
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.changePostDefamatory(token, table, id, !defamatory))
            setIsFetching(false)
            if (!dataErr) {
                onChangeDefamatory()
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }
    }, [token, id, defamatory, table, is409Group, t])

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        handleChange()
    }, [handleChange])



    if(changeDefamatoryPermission) return null

    return <>
        <StyledWrapper onClick={handleClick} data-action={activityList["monitoring-change-defamatory"]}>
            <StyledLabel>
                {t("ranking_pub-defamatory")}
            </StyledLabel>
            <StypedText>{t("ranking_pub-defamatory_hover")}</StypedText>
            {!isFetching && defamatory && (
                <DefamatoryTrueIcon />
            )}
            {!isFetching && !defamatory && (
                <DefamatoryFalseIcon />
            )}
            {isFetching && <StyledLoader />}
        </StyledWrapper>
    </>
})


export default PostDefamatoryComponent