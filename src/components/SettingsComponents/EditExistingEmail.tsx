import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import { ISmsService } from "../../store/settings";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Dropdown } from "../../UI/Dropdown";
import { Input } from "../../UI/Input";
import { AddressList } from "../../UI/AddressList";
import { emailValidator } from "../../utils";
import { FieldInput } from "../common/FieldInput";
import { activityList } from "../../config/userActivityList";

const StyledWrapper = styled.div`
  box-sizing: border-box;
  padding-top: 0.57vw;
  margin-bottom: 3.13vw;
  @media screen and (max-width: ${desktopBp}) {
  margin-bottom: 39px;
    padding-top: 7px;
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
    padding: 0;
    border-inline-end: 0;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #000;
  }
`;

const ServiceTitle = styled.p`
  font-size: 1.35vw;
  line-height: 1.41vw;
  margin: 0 0 2.6vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 17px;
    line-height: 18px;
    margin: 0 0 33px;
  }
`;

const StyledDropdown = styled(Dropdown)`
  margin-bottom: 2.29vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 29px;
  }
`;

const StyledInput = styled(FieldInput)`
  width: 100%;
  margin-bottom: 0.78vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 10px;
  }
`;

const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2.45vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 31px;
  }
`;

const StyledEmailsList = styled(AddressList)`
  max-width: 12.29vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 154px;
  }
`;

const StyledButton = styled(Button)`
  width: fit-content;
  min-width: 10.83vw;
  height: 4.64vw;
  font-weight: 500;
  font-size: 0.94vw;
  line-height: 1.2vw;
  margin: 0 auto;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
    min-width: 136px;
    height: 58px;
  }
`;

interface IProps {
  services: ISmsService[];
}

const EditExistingEmail = React.memo(({ services }: IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { onShowAlert } = useAppActions();
  const [selectedServiceId, setSelectedServiceId] = useState<number>(0);
  const [editData, setEditData] = useState<{ [key: string]: any }>({});

  const existingOptions = useMemo(() => {
    return services.map((service) => {
      const serviceName = service.view_name ? service.view_name : service.name;
      return {
        item:
          service.is_active === true
            ? `${serviceName} - active`
            : `${serviceName}`,
        value: service.id,
      };
    });
  }, [services]);

  const selectedService = useMemo(() => {
    return services.find((s) => s.id === selectedServiceId);
  }, [services, selectedServiceId]);

  const hasViewNameField = useMemo(() => {
    return selectedService
      ? selectedService?.form.fields.some((f) => f.slug === "view_name")
      : false;
  }, [selectedService]);

  const handleEdit = useCallback(async () => {
    if (token) {
      const [dataRes, dataErr] = await handle(
        Settings.editEmailService(token, selectedServiceId, {
          ...editData,
          is_active: true,
        })
      );
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
      if (!dataErr) {
        onShowAlert(true, "Service updated successfully");
      }
    }
  }, [token, selectedServiceId, editData]);

  //Fill form according selected service
  useEffect(() => {
    if (!selectedService) setEditData({});
    if (selectedService) {
      const data: { [key: string]: any } = {};
      selectedService.form.fields.forEach((field) => {
        data[field.slug] = field.value;
      });
      if (selectedService?.view_name) {
        data.view_name = selectedService?.view_name;
      }
      setEditData(data);
    }
  }, [selectedService]);

  return (
    <StyledWrapper>
      <ServiceTitle>{t("settings_email-title1")}</ServiceTitle>
      <StyledDropdown
        label={t("settings_email-exst-label")}
        placeholder={t("settings_email-exst-label")}
        value={selectedServiceId}
        onSelect={(v) => setSelectedServiceId(v)}
        options={existingOptions}
      />
      {selectedService && <p>{selectedService?.form.description}</p>}
      <StyledForm>
        {/* Made this to place 'View name' input on top  */}
        {!hasViewNameField && selectedService && (
          <StyledInput
            as={Input}
            type="text"
            name="view_name"
            label="View name"
            value={editData.view_name || ""}
            onChange={(v: string) =>
              setEditData((p) => ({ ...p, view_name: v }))
            }
          />
        )}

        {selectedService?.form.fields.map((f) => {
          if (f.slug === "view_name") return;
          if (f.slug === "permanent_recipients") {
            return (
              <StyledEmailsList
                key={f.slug}
                options={[]}
                placeholder={f.name}
                label={f.name}
                isValidNewOption={emailValidator}
                value={
                  editData[f.slug]
                    ? editData[f.slug].map((v: number) => ({
                      value: String(v),
                      label: String(v),
                    }))
                    : []
                }
                onChange={(v) =>
                  setEditData((prev) => ({
                    ...prev,
                    [f.slug]: v.map((v) => v.value),
                  }))
                }
              />
            );
          }
          if (f.slug === "from") {
            return (
              <StyledEmailsList
                key={f.slug}
                options={[]}
                placeholder={f.name}
                isValidNewOption={emailValidator}
                label={f.name}
                value={
                  editData[f.slug]
                    ? editData[f.slug].map((v: number) => ({
                      value: String(v),
                      label: String(v),
                    }))
                    : []
                }
                onChange={(v) =>
                  setEditData((prev) => ({
                    ...prev,
                    [f.slug]: v.map((v) => v.value),
                  }))
                }
              />
            );
          }
          if (f.slug === "port") {
            return (
              <Input
                key={f.slug}
                name="port"
                type="number"
                label={f.name}
                value={editData[f.slug] ? editData[f.slug] : ""}
                onChange={(v) =>
                  setEditData((prev) => ({ ...prev, [f.slug]: v }))
                }
              />
            );
          }

          return (
            <StyledInput
              isForPreview={false}
              key={f.slug}
              value={editData[f.slug] ? editData[f.slug] : ""}
              filter={{
                type: f.slug === "password" ? "password" : f.type,
                name: f.slug,
                label: f.name,
                required: f.required,
              }}
              onChange={(s, v) => setEditData((prev) => ({ ...prev, [s]: v }))}
            />
          );
        })}
      </StyledForm>
      <StyledButton
        data-action={activityList["existing-email-save"]}
        onClick={handleEdit}
        disabled={!selectedServiceId}
      >
        {t("settings_email-save")}
      </StyledButton>
    </StyledWrapper>
  );
});

export default EditExistingEmail;
