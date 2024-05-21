import React, { useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { desktopBp } from "../../styles/variables";
import { PlusIcon } from "../../UI/Svg";
import { Modal } from "../../UI/Modal";
import { Title } from "../common/Title";
import { useSelector } from "react-redux";
import { sentimentorKeywordsSelector } from "../../store/sentimentor/selectors";
import {Dropdown, DropdownWithSearch} from "../../UI/Dropdown";
import { Button } from "../../UI/Button";
import { SentimentorKeyword } from "../../store/sentimentor";
import { useTranslation } from "react-i18next";
import { activityList } from "../../config/userActivityList";




const StyledBtn = styled.button<{ disabled?: boolean }>`
  position: relative;
  border-radius: 50%;
  flex-shrink: 0;
  font-size: 1.15vw;
  line-height: 0.5;
  font-weight: 800;
  width: 20px;
    height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 1px solid #000;
  cursor: pointer;
  :hover:not(:disabled) svg {
    opacity: 0.65;
  }
  :hover > div {
    display: block;
  }
  img {
    height: 1.04vw;
    width: 1.04vw;
  }
  svg {
    position: static;
  height: auto;
  transform: none;
  }
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #000;
    cursor: not-allowed;
    svg path {
      fill: #fff;
    }
  `}


  @media screen and (max-width: ${desktopBp}) {
    width: 20px;
    height: 20px;
    font-size: 14px;
    img {
      height: 13px;
      width: 13px;
    }
  }
`;


const StyledContent = styled.div`
    min-height: 400px;
    display: flex;
    flex-direction: column;
`

const AddBtn = styled(Button)`
    margin-top: auto;
`



interface IProps {
  onAddKeyword: (k: SentimentorKeyword) => void
  isFetching: boolean
  addedKeywords: SentimentorKeyword[]
}

const AddPostKeywordComponent = React.memo(({ onAddKeyword, isFetching, addedKeywords }: IProps) => {
  const { t } = useTranslation()
  const keywords = useSelector(sentimentorKeywordsSelector)
  const [opened, setOpened] = useState<boolean>(false)
  const [selectedKeywordId, setSelectedKeywordId] = useState<number>(0)




  const keywordsOptions = useMemo(() => {
    return keywords
      .filter(keyword => !addedKeywords.some(k => k.id === keyword.id)) //Don't show existing keywords
      .map(k => ({ item: k.word, value: k.id }))
  }, [keywords, addedKeywords])




  const handleAdd = useCallback(() => {
    const keyword = keywords.find(k => k.id === selectedKeywordId) as SentimentorKeyword
    onAddKeyword(keyword)
    setOpened(false)
  }, [keywords, selectedKeywordId, onAddKeyword])




  return <>
    <Modal show={opened} onClose={() => setOpened(false)}>
      <StyledContent>
        <Title>{t("ranking_pub-keywords-add")}</Title>
        <DropdownWithSearch label={t("ranking_pub-keywords-label")} placeholder={t("ranking_pub-keywords-label")} value={selectedKeywordId} onSelect={setSelectedKeywordId} options={keywordsOptions} />
        <AddBtn disabled={isFetching} onClick={handleAdd} data-action={activityList["ranking-add-keyword-to-post"]}>{t("ranking_pub-keywords-btn")}</AddBtn>
      </StyledContent>
    </Modal >
    <StyledBtn onClick={() => setOpened(true)}><PlusIcon /></StyledBtn>
  </>
})


export default AddPostKeywordComponent
