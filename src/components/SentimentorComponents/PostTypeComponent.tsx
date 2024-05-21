import React, { useState, useCallback } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { EditIcon } from "../../UI/Svg";
import { Modal } from "../../UI/Modal";
import EditPostTypeComponent from "./EditPostTypeComponent";


const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.57vw;
  padding-bottom: 0.89vw;
  border-bottom: 1px solid #AAA;
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
    padding-bottom: 11px;
    border-bottom: 1px solid #AAA;
    margin-bottom: 13px;
  }
`;

const StyledSubText = styled.p`
  font-size: 0.94vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
  }
`;

const EditBtn = styled.button`
    cursor: pointer;
    background-color: transparent;
    padding: 0;
    border: 0;
`

interface IProps {
    post_type: Array<string | null>
    onChange: (type: string[]) => void
    isFetching: boolean
}

const PostTypeComponent = React.memo(({ post_type, onChange, isFetching }: IProps) => {
    const { t } = useTranslation()
    const [opened, setOpened] = useState<boolean>(false)




    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setOpened(true)
    }, [])


    return <>
        <Modal show={opened} onClose={() => setOpened(false)} stopBubbling={true}>
            <EditPostTypeComponent isFetching={isFetching} post_type={post_type} onChange={onChange} onClose={() => setOpened(false)} />
        </Modal>
        <StyledWrapper>
            <StyledSubText>{t("ranking_pub-type")}</StyledSubText>
            <StyledSubText>{post_type && post_type?.join(", ")}</StyledSubText>
            <EditBtn onClick={handleClick}><EditIcon /></EditBtn>
        </StyledWrapper>
    </>
})

export default PostTypeComponent