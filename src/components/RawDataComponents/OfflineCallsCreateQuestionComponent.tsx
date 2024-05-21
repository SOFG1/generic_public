import React, {memo, useMemo} from "react";
import styled from "styled-components";
import {IQuestionaries, useCallCenterState} from "../../store/callCenter";
import {desktopBp} from "../../styles/variables";
import {QuestionComponent} from "../CallCenterComponents";

interface IProps{
    data: {[key: string]: {[key: string]:any}},
    setData: React.Dispatch<React.SetStateAction<{[p: string]: {[p: string]: any}}>>,
}

const OfflineCallsCreateQuestionComponent = memo(({data, setData}:IProps)=>{
    const {
        questionariesList,
        selectedQuestionarieId,
    } = useCallCenterState();

    const selectQuestionarie: IQuestionaries | null = useMemo(() => {
        return (
            questionariesList.find(
                (item) => item.id === selectedQuestionarieId
            ) || null
        );
    }, [questionariesList, selectedQuestionarieId]);

    //Questions that are depended of answers
    const dependedQuestions = useMemo(() => {
        const ids: any = [];
        selectQuestionarie?.questions.forEach((q) => {
            q.answers_options.forEach((a) => {
                if (a.related_question) {
                    ids.push(a.related_question.id);
                }
            });
        });
        return ids;
    }, [selectQuestionarie?.questions]);

    if(!selectQuestionarie) return null;
    return(
        <Container>
            <Header>{selectQuestionarie.name}</Header>
            <QuestionsContainer>
                {selectQuestionarie.questions.map((question) => {
                    //Don't show this question if it's dependent of an answer
                    if (dependedQuestions.includes(question.id)) return null;
                    return (
                        <StyledQuestionComponent
                            key={question.id}
                            question={question}
                            data={data}
                            setData={setData}
                        />
                    );
                })}
            </QuestionsContainer>
        </Container>
    )
})

export default OfflineCallsCreateQuestionComponent;

const Container = styled.div`
    display: flex;
  flex-direction: column;
  padding: 0 5px;
  max-height: 26.04vw;
  overflow-y: auto;
  overflow-x: hidden;
  @media(max-width: ${desktopBp}){
    max-height: 327px;

  }
`

const QuestionsContainer = styled.div`
    display: flex;
  width: 100%;
  flex-direction: column;
`

const StyledQuestionComponent = styled(QuestionComponent)`
    & *{
      font-size: ${props => props.theme.fontSize.small.vw};
      @media screen and (max-width: ${desktopBp}) {
        font-size: ${props => props.theme.fontSize.small.px};
      }
    }
    p{
      margin-block-start: 0;
      margin-block-end: 0;
    }
    & .styled_input{
    color:rgba(254, 89, 18, 1);
    min-height: 6.25vw;
    font-size: ${props => props.theme.fontSize.small.vw};
      
    @media screen and (max-width: ${desktopBp}) {
      font-size: 7px;
      min-height: 78px;  
      font-size: ${props => props.theme.fontSize.small.px};
    }
  }
  
  & .styled_dropdown_label{
    
    color:rgba(188, 188, 188, 1);
    font-size: ${props => props.theme.fontSize.small.vw};
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.small.px};
    }
  }
  & .styled_input_label{
    color:rgba(188, 188, 188, 1);
    font-size: ${props => props.theme.fontSize.small.vw};
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.small.px};
    }
  }
  
  & .styled_search_input{
    font-size: ${props => props.theme.fontSize.small.vw};
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.small.px};
    }
  }
  & .styled_search_input_container{
    padding-left: 0.36vw;
    padding-right: 0.36vw;
    width: calc(100% - 0.36vw * 2);
    max-width: calc(100% - 0.36vw * 2);
    font-size: ${props => props.theme.fontSize.small.vw};
    @media screen and (max-width: ${desktopBp}) {
      padding-left: 5px;
      font-size: ${props => props.theme.fontSize.small.px};
      width: calc(100% - 5px * 2);
      max-width: calc(100% - 5px * 2);
    }
  }
  & .styled_dropdown_item{
    transition:background-color .2s ease;
    padding-left: 3px;
    width: calc(100% - 3px);
    font-size: ${props => props.theme.fontSize.small.vw};
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.small.px};
    }
  }
  & .styled_dropdown_option{
    width: calc(100% - 6px);
    &:hover{
      background-color: #fff;
    }
    &:hover .styled_dropdown_item{
      background-color: rgba(220, 220, 220, 1);
      border-radius: 3px;
    }
  }
  & .styled_dropdown_option-selected{
    background-color: #fff;
    color:#000;
  }
  & .styled_dropdown_item-selected{
    background-color: rgba(220, 220, 220, 1);
    border-radius: 3px;
  }
`


const Header = styled.div`
  font-size: ${props => props.theme.fontSize.primary.vw};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.primary.px};
  }
`
