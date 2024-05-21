import React, { useState, useMemo } from "react";
import styled from "styled-components";
import {
  IColumns,
  useSettingsActions,
  useSettingsState,
} from "../../store/settings";
import { useTranslation } from "react-i18next";
import {
  CreateFieldComponent,
  EditFieldComponent,
} from "../../components/SettingsComponents";
import { desktopBp } from "../../styles/variables";
import { HintComponent } from "../../UI/HintComponent";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { escapeRegExp } from "../../utils";
import { Reorder } from "framer-motion";
import {createPortal} from "react-dom";

const FormBlock = styled.div`
  max-width: 100%;
  width: 10000px;
`;

const StyledTitle = styled.h2`
  font-size: 1.67vw;
  line-height: 2.19vw;
  font-weight: 400;
  text-transform: capitalize;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  margin-bottom: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 20px;
  }
`;

const StyledTitles = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25vw;
  max-width: 75%;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 16px;
  }
`

const StyledSubtitle = styled.p`
  font-size: 0.83vw;
  margin: 0;
  text-align: center;
  text-decoration: underline;
  min-width: 8.75vw;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 110px;
    font-size: 10px;
  }
`

const FieldsBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHintText = styled.p`
  margin: 0;
  white-space: pre-wrap;
`;

const StyledInput = styled(Input)`
  max-width: 300px;
  margin-bottom: 10px;
`;

const StyledBtn = styled(Button)`
  width: fit-content;
  min-width: 7.03vw;
  border-radius: 100px;
  margin: 3.39vw auto 0;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 88px;
    margin-top: 42px;
  }
`;

const EditFieldsContent = React.memo(() => {
  const { t } = useTranslation();
  const { columns } = useSettingsState();
  const { onChangeColumnOrder } = useSettingsActions()
  const [search, setSearch] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [items, setItems] = useState(columns)

  const columnsFiltered = useMemo(() => {
    const pattern = escapeRegExp(search);
    return columns?.filter(
      (c) => c.name?.match(pattern) || c.slug?.match(pattern)
    );
  }, [search, columns]);


  const handleDragEnd = (item: IColumns) => {
    const newOrder = items.indexOf(item) + 1
    if (item.order !== newOrder) onChangeColumnOrder(item.id, newOrder)
  }

  return (
    <FormBlock>
      <StyledBox>
        <StyledTitle>{t("settings_fields-title")}</StyledTitle>
        <HintComponent
          position="end"
          items={[
            <StyledHintText>{t("settings_fields-hint1")}</StyledHintText>,
            <StyledHintText>{t("settings_fields-hint2")}</StyledHintText>,
          ]}
        />
      </StyledBox>
      <StyledInput
        type="text"
        name="search"
        label={t("settings_fields-search")}
        placeholder={t("settings_fields-search")}
        value={search}
        onChange={setSearch}
      />
      <StyledTitles>
        <StyledSubtitle>{t("settings_fields-subtitle1")}</StyledSubtitle>
        <StyledSubtitle>{t("settings_fields-subtitle2")}</StyledSubtitle>
        <StyledSubtitle>{t("settings_fields-subtitle3")}</StyledSubtitle>
      </StyledTitles>
      {search ? (
        <FieldsBlock>
          {columnsFiltered.map((column) => (
            <EditFieldComponent
              showOrderButtons={false}
              key={column.slug}
              isLast={columns.length === column.order}
              column={column}
            />
          ))}
        </FieldsBlock>
      ) : (
        <Reorder.Group values={items} onReorder={setItems} style={{ paddingInlineStart: "0" }}>
          {items.map((item) => (
            <Reorder.Item key={item.id} value={item} style={{ listStyle: "none" }} onDragEnd={() => handleDragEnd(item)}>
              <EditFieldComponent
                showOrderButtons={true}
                isLast={columns.length === item.order}
                column={item}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
      <StyledBtn onClick={() => setShowCreateModal(true)}>{t("settings_fields-add")}</StyledBtn>
        {createPortal(<CreateFieldComponent show={showCreateModal} onClose={() => setShowCreateModal(false)} />, document.querySelector(".App")!)}
    </FormBlock>
  );
});

export default EditFieldsContent;
