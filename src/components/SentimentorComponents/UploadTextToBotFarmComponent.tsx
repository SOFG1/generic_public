import {Modal} from "../../UI/Modal";
import styled from "styled-components";
import {DropdownWithSearch} from "../../UI/Dropdown";
import {desktopBp} from "../../styles/variables"
import {useTranslation} from "react-i18next";
import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Sequence} from "../../api/sequence";
import {handle} from "../../api";
import {useAppActions} from "../../store/app";
import {useSequenceActions} from "../../store/sequence";
import {sequenceSelectAudience, sequenceSelectCampaigns} from "../../store/sequence/selectors";

const Textarea = styled.textarea`
    resize: none;
    font-family: inherit;
    outline: none;
    font-size: 0.73vw;
    border: 0;
    height: 16.20vw;
    padding: 1.46vw 2.08vw;
    box-sizing: border-box;
    width: 100%;
    ::-webkit-scrollbar {
        width: 12px;
        border: 0;
        border-inline-start: 1px solid #000;
    }
    @media screen and (max-width: ${desktopBp}) {
        font-size: 9px;
        border: 0;
        height: 203px;
        padding: 18px 26px;
    }
`
const StyledContainer = styled.div`
    border-radius: 10px;
    border: 1px solid #000;
    width: 100%;
    overflow: hidden;
`
const StyledLabel = styled.button`
    white-space: nowrap;
    font-size: 0.63vw;
    height: 1.25vw;
    width: 7.03vw;
    border-radius: 100px;
    border: 1px solid #000;
    background: #FFF;
    cursor: pointer;
    transition: 150ms;
    :disabled {
        cursor: not-allowed;
    }
    :hover:not(:disabled) {
        background-color: #000;
        color: #fff;
    }
    @media screen and (max-width: ${desktopBp}) {
        font-size: 8px;
        height: 16px;
        width: 88px;
    }
`

const StyledHeader = styled.div`
    padding: 0 1.72vw;
    display: flex;
    align-items: center;
    gap: 0.52vw;
    transform: translateY(50%);
    @media screen and (max-width: ${desktopBp}) {
        padding: 0 22px;
        gap: 7px;
    }
`
const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const StyledModeBtn = styled.button`
    white-space: nowrap;
    font-size: 0.63vw;
    height: 1.25vw;
    width: 7.03vw;
    border-radius: 100px;
    border: 1px solid #000;
    background: #FFF;
    cursor: pointer;
    transform: translateY(-50%);
    transition: 150ms;
    :disabled {
        cursor: not-allowed;
    }
    :hover:not(:disabled) {
        background-color: #000;
        color: #fff;
    }
    @media screen and (max-width: ${desktopBp}) {
        font-size: 8px;
        height: 16px;
        width: 88px;
    }
`

const Container = styled.div`
    min-width: 400px;
`

interface IProps{
    isOpen:boolean,
    onClose:()=>void,
    postText:string,
}
const UploadTextToBotFarmComponent = React.memo(({isOpen, onClose, postText}:IProps)=>{
    const { t } = useTranslation();
    const [text, setText] = useState(postText);
    const [selectedCampaigns, setSelectedCampaigns] = useState<string>("");
    const [selectedAudience, setSelectedAudience] = useState<string>("");
    const {onGetCampaigns, onGetAudience} = useSequenceActions();
    const [isFetching, setIsFetching] = useState(false);
    const { onShowAlert } = useAppActions()
    const campaigns = useSelector(sequenceSelectCampaigns);
    const audience = useSelector(sequenceSelectAudience);

    useEffect(()=>{
        onGetCampaigns();
        onGetAudience();
    },[]);

    useEffect(()=>{
        setText(postText);
    }, [postText])

    const addTextToUpload = useCallback(async ()=>{
        const formattedCampaigns = selectedCampaigns.split(",").map(el => el.trim())
        const formattedAudience = selectedAudience.split(",").map(el => el.trim());
        setIsFetching(true);
        const [res, err] = await handle(Sequence.postSequenceText({text, type:"post", campaign:formattedCampaigns, audience:formattedAudience}))
        if(err) onShowAlert(false, err.detail || "Unexpected error");
        if(res) onShowAlert(true, t("ranking_ai-post_upload"));
        onClose();
        setIsFetching(false);
    },[text, selectedCampaigns, selectedAudience]);

    const isSubmitDisabled = useCallback(()=>{
        return !text.length || !selectedCampaigns.length || !selectedAudience.length || isFetching
    },[text, selectedCampaigns, selectedAudience, isFetching]);

    return(
        <Modal show={isOpen} onClose={onClose}>
            <Container>
                <DropdownWithSearch isMultiSelect value={selectedCampaigns} placeholder={t("ranking_ai-campaigns")} onSelect={setSelectedCampaigns} label={t("ranking_ai-campaigns")} options={campaigns.map(value => ({item:value, value}))}/>
                <DropdownWithSearch  isMultiSelect value={selectedAudience} placeholder={t("ranking_ai-audience")} onSelect={setSelectedAudience} label={t("ranking_ai-audience")} options={audience.map(value => ({item:value, value}))}/>
                <StyledHeader>
                    <StyledLabel>{t("ranking_ai-tab_text")}</StyledLabel>
                </StyledHeader>
                <StyledContainer>
                    <Textarea disabled={isFetching} value={text} onChange={e => setText(e.target.value)}/>
                </StyledContainer>
                <Center>
                    <StyledModeBtn disabled={isSubmitDisabled()} onClick = {addTextToUpload}>Upload</StyledModeBtn>
                </Center>
            </Container>
        </Modal>
    )
})

export default UploadTextToBotFarmComponent;
