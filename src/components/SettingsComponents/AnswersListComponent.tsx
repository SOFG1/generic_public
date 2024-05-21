import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IAnswer } from "../../store/settings";
import { desktopBp } from "../../styles/variables";
import { ChevronLeftIcon, ChevronRightIcon } from "../../UI/Svg";
import { activityList } from "../../config/userActivityList";

const StyledWrapper = styled.div<{ opened: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  padding: 0.36vw 0;
  margin-bottom: 0.83vw;
  cursor: pointer;
  svg path {
    stroke: #000;
  }
  svg {
    width: 17px;
    height: 17px;
    ${({ opened }) => opened && "transform: rotate(90deg);"}
  }
  @media screen and (max-width: ${desktopBp}) {
    padding: 5px 0;
    margin-bottom: 10px;
    svg {
      width: 17px;
      height: 17px;
    }
  }
`;

const StyledTitle = styled.p`
  font-size: 0.73vw;
  line-height: 0.94vw;
  margin: 0;
  font-weight: 700;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 9px;
    line-height: 12px;
  }
`;

const StyledList = styled.div`
  margin-bottom: 1.56vw;
  padding-inline-start: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 20px;
    padding-inline-start: 20px;
  }
`;

const StyledAnswer = styled.p`
  margin: 0 0 0.52vw;
  text-align: start;
  font-size: 0.94vw;
  word-break: break-all;
  @media screen and (max-width: ${desktopBp}) {
    margin: 0 0 7px;
    font-size: 12px;
  }
`;

const NoAnswers = styled(StyledAnswer)`
  text-align: center;
`;

interface IProps {
  answers: IAnswer[];
}

const AnswersListComponent = React.memo(({ answers }: IProps) => {
  const { t } = useTranslation();
  const isRtl = document.body.dir === "rtl";
  const [opened, setOpened] = useState<boolean>(false);


  return (
    <>
      <StyledWrapper onClick={() => setOpened((p) => !p)} opened={opened} data-action={activityList["question-toggle-answers"]}>
        <StyledTitle>{t("settings_questionnaires-answers")}</StyledTitle>
        {isRtl ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </StyledWrapper>

      {opened && (
        <StyledList>
          {answers.map((a, i) => {
            return <StyledAnswer key={a.id}>{i + 1}. {a.answer_words}</StyledAnswer>;
          })}
        </StyledList>
      )}
      {opened && answers.length === 0 && (
        <NoAnswers>{t("settings_questionnaires-no_answers")}</NoAnswers>
      )}
    </>
  );
});

export default AnswersListComponent;
