import {memo} from "react";
import {Modal} from "../../UI/Modal";
import {ChoosePlatformView} from "../../views/CallCenterHistoryViews";
import styled from "styled-components";
import {desktopBp} from "../../styles/variables";

interface IProps{
    isOpen:boolean,
    onClose:()=>void,
}


const ReportsComponent = memo(({isOpen, onClose}:IProps)=>{
    return (
        <StyledModal show={isOpen} onClose={onClose}>
            <Container>
                <ChoosePlatformView/>
            </Container>
        </StyledModal>
    )
})

export default ReportsComponent;


const Container = styled.div`
    width: 100%;
  height: 100%;
`

const StyledModal = styled(Modal)`
  padding: 2.60vw;

  @media(max-width: ${desktopBp}){
    padding: 33px;
  }
`
