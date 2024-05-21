import React, {memo} from "react";
import styled from "styled-components";
import {DigitalCampaignView, OfflineCampaignView} from "../../views/RawDataViews";
import {Modal} from "../../UI/Modal";


interface IProps{
    onClose:()=>void,
    isOpen:boolean,
}
const StyledSettingsModal = styled(Modal)`
  * .js-modal-content{
    overflow-x:hidden;
  }
`
const CreateCampaignModal = memo(({onClose, isOpen}:IProps)=>{
    return (
        <StyledSettingsModal show={isOpen} onClose={onClose}>
            <DigitalCampaignView/>
            <OfflineCampaignView/>
        </StyledSettingsModal>
    )
})

export default CreateCampaignModal;
