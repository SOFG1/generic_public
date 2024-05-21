import React, { useMemo, useState, useCallback, useEffect } from "react";
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
import { phoneNumberValidator } from "../../utils";
import { FieldInput } from "../common/FieldInput";
import { activityList } from "../../config/userActivityList";

const StyledWrapper = styled.div`
  box-sizing: border-box;
  padding-top: 0.57vw;
  margin-bottom: 3.13vw;
  @media screen and (max-width: ${desktopBp}) {
    padding-top: 7px;
    padding-inline-end: 29px;
  margin-bottom: 39px;
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

const StyledNumbersList = styled(AddressList)`
  max-width: 12.29vw;
  margin-bottom: 10px;
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

const EditExistingSms = React.memo(({ services }: IProps) => {
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


  console.log(selectedService)


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


  const handleEdit = useCallback(async () => {
    if (token) {
      const [dataRes, dataErr] = await handle(
        Settings.editSms(token, selectedServiceId, {
          ...editData,
          is_active: true,
        })
      );
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
      if (!dataErr) {
        onShowAlert(true, "Service updated successfully");
        // onClose()
      }
      if (dataRes) {
        console.log(dataRes);
      }
    }
  }, [token, selectedServiceId, editData]);

  return (
    <StyledWrapper>
      <ServiceTitle>{t("settings_sms-title1")}</ServiceTitle>
      <StyledDropdown
        label={t("settings_sms-exst-label")}
        placeholder={t("settings_sms-exst-label")}
        value={selectedServiceId}
        onSelect={(v) => setSelectedServiceId(v)}
        options={existingOptions}
      />

      <StyledForm>
        {selectedService?.form.fields.map((f) => {
          if (f.slug === "permanent_recipients")
            return (
              <StyledNumbersList
                key={f.slug}
                options={[]}
                isValidNewOption={phoneNumberValidator}
                placeholder={f.name}
                label={f.name}
                value={
                  editData[f.slug]
                    ? editData[f.slug].map((v: number) => ({
                      value: String(v),
                      label: String(v),
                    }))
                    : []
                }
                onChange={(v: any) =>
                  setEditData((prev) => ({
                    ...prev,
                    [f.slug]: v.map((v: any) => v.value),
                  }))
                }
              />
            );
          if (f.slug === "from")
            return (
              <StyledNumbersList
                key={f.slug}
                options={[]}
                placeholder={f.name}
                label={f.name}
                value={
                  editData[f.slug]
                    ? editData[f.slug].map((v: number) => ({
                      value: String(v),
                      label: String(v),
                    }))
                    : []
                }
                onChange={(v: any) =>
                  setEditData((prev) => ({
                    ...prev,
                    [f.slug]: v.map((v: any) => v.value),
                  }))
                }
              />
            );
          if (f.slug === "port") {
            return (
              <StyledInput
                key={f.slug}
                as={Input}
                name="port"
                type="number"
                label={f.name}
                value={editData[f.slug] ? editData[f.slug] : ""}
                onChange={(v: any) =>
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
                type: f.type,
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
        onClick={handleEdit}
        disabled={!selectedServiceId}
        data-action={activityList["existing-sms-save"]}
      >
        {t("settings_sms-save")}
      </StyledButton>
    </StyledWrapper>
  );
});

export default EditExistingSms;
