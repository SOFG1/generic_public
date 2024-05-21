import React, { useMemo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { colorsChart } from "../../config";
import { IStatus, useSettingsActions } from "../../store/settings";
import { useUserState } from "../../store/user";
import { useUserActions } from "../../store/user/hooks"; 
import { desktopBp } from "../../styles/variables";
import { AddressList } from "../../UI/AddressList";
import { Dropdown } from "../../UI/Dropdown";
import Radio from "../../UI/Input/Radio";
import { Loader } from "../../UI/Spinners";
import { ChevronLeftIcon, ChevronRightIcon, EditIcon } from "../../UI/Svg";
import { ConfirmDeleteFull } from "../common/ConfirmDeleteFull";
import { activityList } from "../../config/userActivityList";
import { Button } from "../../UI/Button";

const scoreOptions = [
  { item: "Very positive", value: 10 },
  { item: "Positive", value: 5 },
  { item: "Neutral", value: 0 },
  { item: "Negative", value: -5 },
  { item: "Very negative", value: -10 },
  { item: "Not relevant", value: "not relevant" },
];

const StyledHeader = styled.div<{ opened: boolean }>`
  display: flex;
  padding-bottom: 3px;
  border-bottom: 1px solid #AAAAAA;
  margin-bottom: 10px;
  > svg {
    width: 1.3vw;
    height: 1.3vw;
    margin-inline-start: auto;
    ${({ opened }) => opened && "transform: rotate(90deg);"}
  }
  > svg path {
    stroke: #000;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 16px;
    > svg {
      height: 16px;
      width: 16px;
    }
  }
`

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  width: 20%;
  padding-inline-end: 32px;
  box-sizing: border-box;
  &:first-child {
    width: 45%;
  }
  @media screen and (max-width: 700px) {
    font-size: 12px;
    width: fit-content !important;
  }
`

const EditBtn = styled.button`
  height: 20px;
  width: 20px;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-inline-start: -27px;
  padding: 0;
  svg {
    margin: 0;
    height: 10px;
    width: 10px;
  }
`

const StyledTitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  text-align: start;
  @media screen and (max-width: 700px) {
    font-size: 12px;
  }
`

const StyledColor = styled.div<{ color: string }>`
  border-radius: 100px;
  border: 1px solid #000;
  background: ${({ color }) => color};
  height: 17px;
  flex-grow: 1;
  min-width: 60px;
`

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2.60vw;
  margin-bottom: 2.60vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 33px;
  margin-bottom: 33px;
  }
  @media screen and (max-width: 700px) {
  grid-template-columns: 1fr;
  }
`

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledRadio = styled(Radio)`
  margin-top: 2.60vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 33px;
  }
`

const StyledLoader = styled(Loader)`
  height: 1.3vw;
  width: 1.3vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 16px;
    width: 16px;
  }
`;

const StyledLabel = styled.p`
font-size: 0.94vw;
font-weight: 700;
text-decoration: underline;
  margin: 0 0 1.04vw;
  text-align: start;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
  margin: 0 0 13px;
  }
`

const StyledDropdown = styled(Dropdown)`
label {
  display: none;
}
margin-bottom: 0;
`;

const WordsDropdown = styled(AddressList)`
  margin-bottom: 0.52vw;
  label {
    display: none;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 10px;
  }
`;

const ColorOption = styled.div<{ color: string }>`
  padding: 4px;
  min-width: 5.21vw;
  border: 1px solid #000;
  width: 100%;
  display: flex;
  height: 1.04vw;
  box-sizing: border-box;
  background-color: ${({ color }) => color};
  @media screen and (max-width: ${desktopBp}) {
    min-width: 65px;
    height: 13px;
  }
`;


const StyledBtn = styled(Button)`
  width: fit-content;
  min-width: 7.03vw;
  border-radius: 100px;
  margin-top: auto;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 88px;
  }
`;

interface IProps {
  status: IStatus;
  onChange: (field: string, value: any) => void;
}

const EditStatusComponent = React.memo(({ status, onChange }: IProps) => {
  const { t, i18n } = useTranslation();
  const { token } = useUserState();
  const { onGetStatuses } = useSettingsActions();
  const { onUpdateUserStatus } = useUserActions();
  const [opened, setOpened] = useState<boolean>(false)
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const colorOptions: Array<{
    item: string | JSX.Element;
    value: string | number;
  }> = useMemo(() => {
    const opts = colorsChart.map((color) => {
      return {
        item: <ColorOption color={color} />,
        value: color,
      };
    });
    return [{ item: t("settings_status-option"), value: "" }, ...opts];
  }, [t]);

  const handleDelete = useCallback(async () => {
    if (token) {
      setIsDeleting(true);
      const [dataRes, dataErr] = await handle(
        Settings.deleteStatus(token, status.id)
      );
      setIsDeleting(false);
      if (!dataErr) {
        onUpdateUserStatus();
        onGetStatuses();
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
  }, [token, status.id]);


  return (
    <div>
      <ConfirmDeleteFull
        show={confirmDelete}
        title={t("settings_status-warn")}
        onClose={() => setConfirmDelete(false)}
        onDelete={handleDelete}
      />
      <StyledHeader onClick={() => setOpened(p => !p)} opened={opened}>
        <StyledBox>
          <StyledTitle>{status.status}</StyledTitle>
        </StyledBox>
        <StyledBox onClick={(e) => { if (opened) e.stopPropagation() }}>
          {opened ? (

            <StyledDropdown
              value={typeof status.score === "number" ? status.score : "not relevant"}
              placeholder={""}
              onSelect={(score) =>
                onChange("score", score !== "not relevant" ? score : null)
              }
              options={scoreOptions}
              label={t("settings_status-score")}
            />
          ) : (
            <>
              <EditBtn><EditIcon /></EditBtn>
              <StyledTitle>{scoreOptions.find(s => s.value === status.score)?.item}</StyledTitle>
            </>
          )}

        </StyledBox>
        <StyledBox onClick={(e) => { if (opened) e.stopPropagation() }}>
          {opened ? (

            <StyledDropdown
              value={status.color}
              placeholder={t("settings_status-placeholder")}
              onSelect={(color) => onChange("color", color)}
              options={colorOptions}
              label={t("settings_status-color")}
              isCustomColor={true}
            />
          ) : (
            <>
              <EditBtn><EditIcon /></EditBtn>
              <StyledColor color={status.color} />
            </>
          )}

        </StyledBox>
        {i18n.dir() ? < ChevronRightIcon /> : <ChevronLeftIcon />}
      </StyledHeader>
      {opened && (
        <StyledWrapper>
          <StyledColumn>
            <StyledLabel>{t("settings_status-include")}</StyledLabel>
            <WordsDropdown
              label={t("settings_status-include")}
              options={[]}
              value={status.include_words.map((v: string) => ({
                value: v,
                label: v,
              }))}
              onChange={(v) =>
                onChange(
                  "include_words",
                  v.map((v) => v.value)
                )
              }
            />
          </StyledColumn>


          <StyledColumn>
            <StyledLabel>{t("settings_status-exclude")}</StyledLabel>
            <WordsDropdown
              label={t("settings_status-exclude")}
              options={[]}
              value={status.exclude_words.map((v: string) => ({
                value: v,
                label: v,
              }))}
              onChange={(v) =>
                onChange(
                  "exclude_words",
                  v.map((v) => v.value)
                )
              }
            />

          </StyledColumn>

          <StyledColumn>
            <StyledRadio
              isActive={status.is_default}
              id={status.id}
              label={t("settings_status-def")}
              onChange={(id) => onChange("default", id)}
            />
            {isDeleting && (
              <StyledLoader />
            )}

            <StyledBtn onClick={() => setConfirmDelete(true)} data-action={activityList["settings-delete-status"]}>{t("settings_status-del")}</StyledBtn>
          </StyledColumn>
        </StyledWrapper>
      )}
    </div>
  );
});

export default EditStatusComponent;
