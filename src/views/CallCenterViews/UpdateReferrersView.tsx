import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { desktopBp } from "../../styles/variables";
import { UpdateReferrersModal } from "../../components/CallCenterComponents";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div`
  width: 100%;
  margin-top: 1.04vw;
  display: flex;
  gap: 10px;
  align-items: center;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;
  }
`;

const StyledBtn = styled(Button)`
  font-size: 0.94vw;
  padding: 5px;
  width: auto;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 13px;
  }
`;

const StyledInput = styled(Input)``;

const UpdateReferrersView = React.memo(() => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <StyledWrapper>
      <StyledInput
        name="search"
        type="text"
        label={t("referrer_search")}
        placeholder={t("referrer_search")}
        value={search}
        onChange={setSearch}
      />
      <StyledBtn disabled={!search} onClick={() => setShowModal(true)}>
        {t("referrer_search-btn")}
      </StyledBtn>
      <UpdateReferrersModal
        searchQuery={search}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </StyledWrapper>
  );
});

export default UpdateReferrersView;
