import {Modal} from "../../UI/Modal";
import {DropdownWithSearch} from "../../UI/Dropdown";
import React, {useCallback, useEffect, useState} from "react";
import {useSequenceActions} from "../../store/sequence";
import {useAppActions} from "../../store/app";
import {useSelector} from "react-redux";
import {sequenceSelectAudience, sequenceSelectCampaigns} from "../../store/sequence/selectors";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";
import picPlaceholder from "../../assets/images/picture-placeholder.jpg";
import {useTranslation} from "react-i18next";
import {handle} from "../../api";
import {Input} from "../../UI/Input";
import {Sequence} from "../../api/sequence";
import {Sentimentor} from "../../api/sentimentor";
const Container = styled.div`
    min-width: 320px;
`

const StyledContainer = styled.div`
    border-radius: 10px;
    border: 1px solid #000;
    width: 100%;
    overflow: hidden;
`

const StyledInput = styled(Input)`

`;
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

const StyledPicture = styled.img`
  background-image: url(${picPlaceholder});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  object-fit: contain;
  height: 320px;
  width: calc(100% - 20px);
  padding: 10px;
`;
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

interface IProps{
    image:string,
    onClose:()=>void,
    isOpen:boolean
}
const UploadImageToBotfarmComponent = React.memo(({isOpen, onClose, image}:IProps)=>{
    const [selectedCampaigns, setSelectedCampaigns] = useState<string>("");
    const [selectedAudience, setSelectedAudience] = useState<string>("");
    const [fileName, setFileName] = useState("");

    const { t } = useTranslation();
    const {onGetCampaigns, onGetAudience} = useSequenceActions();
    const { onShowAlert } = useAppActions()
    const campaigns = useSelector(sequenceSelectCampaigns);
    const audience = useSelector(sequenceSelectAudience);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(()=>{
        onGetCampaigns();
        onGetAudience();
    },[]);

    const handleSubmit = useCallback(async ()=>{
        const formattedCampaigns = selectedCampaigns.split(",").map(el => el.trim())
        const formattedAudience = selectedAudience.split(",").map(el => el.trim());
        setIsFetching(true);

        const [result, error] = await handle(Sentimentor.downloadAiImage(image));
        if(error) onShowAlert(false,  "Unexpected error");
        const extension = result.type.split("/")[1];
        if(!extension) onShowAlert(false,  "Unexpected error");

        const type = result.type;
        if(!type) onShowAlert(false,  "Unexpected error");

        const file = new File([result], fileName + `.${extension}`, {type});

        const [res, err] = await handle(Sequence.postSequenceMedia({campaign:formattedCampaigns, audience:formattedAudience, type:"image", file}));
        if(err) onShowAlert(false, err.detail || "Unexpected error");
        if(res) onShowAlert(true, t("ranking_ai-image_upload"));

        setIsFetching(false);
    }, [selectedAudience, selectedCampaigns, image, fileName]);

    const doesSubmitDisabled = useCallback(()=>{
        return !fileName || !audience.length || !campaigns.length || isFetching;
    },[fileName, audience, campaigns, isFetching]);

    return(
        <Modal show={isOpen} onClose={onClose}>
            <Container>
                <StyledInput onChange={setFileName} label={t("ranking_ai-tab_file_name")} type={"text"} name={t("ranking_ai-tab_file_name")} value={fileName}/>
                <DropdownWithSearch isMultiSelect value={selectedCampaigns} placeholder={t("ranking_ai-campaigns")} onSelect={setSelectedCampaigns} label={t("ranking_ai-campaigns")} options={campaigns.map(value => ({item:value, value}))}/>
                <DropdownWithSearch  isMultiSelect value={selectedAudience} placeholder={t("ranking_ai-audience")} onSelect={setSelectedAudience} label={t("ranking_ai-audience")} options={audience.map(value => ({item:value, value}))}/>
                <StyledHeader>
                    <StyledLabel>{t("ranking_ai-tab_image")}</StyledLabel>
                </StyledHeader>
                <StyledContainer>
                    <StyledPicture src={image}/>
                </StyledContainer>
                <Center>
                    <StyledModeBtn disabled={doesSubmitDisabled()} onClick = {handleSubmit}>Upload</StyledModeBtn>
                </Center>
            </Container>
        </Modal>
    )
})

export default UploadImageToBotfarmComponent;
