import React, { useMemo, useState, useCallback } from "react";
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
  @media screen and (max-width: ${desktopBp}) {
    padding-inline-start: 31px;
    padding-top: 7px;
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
    padding: 0;
  }
`;

const StyledNumbersList = styled(AddressList)`
  max-width: 12.29vw;
  margin-bottom: 10px;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 154px;
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

const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2.45vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 31px;
  }
`;

const StyledInput = styled(FieldInput)`
  width: 100%;
  margin-bottom: 0.78vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 10px;
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

const translation:any = {
  "From Numbers":"settings_sms_from-numbers",
  "Test numbers":"settings_sms_test-numbers"
}

const EditNewSms = React.memo(({ services }: IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { onShowAlert } = useAppActions();
  const [selectedServiceId, setSelectedServiceId] = useState<number>(0);
  const [editData, setEditData] = useState<{ [key: string]: any }>({});

  const servicesOptions = useMemo(() => {
    return services.map((service) => {
      const serviceName =
        service.is_active === true ? `${service.name} - active` : service.name;
      return {
        item: serviceName,
        value: service.id,
      };
    });
  }, [services]);

  const selectedService = useMemo(() => {
    return services.find((s) => s.id === selectedServiceId);
  }, [services, selectedServiceId]);

  const handleAdd = useCallback(async () => {
    if (token) {
      const [dataRes, dataErr] = await handle(
        Settings.postSms(token, {
          ...editData,
          name: selectedService?.name,
          is_active: true,
        })
      );
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
      if (!dataErr) {
        onShowAlert(true, "Service updated successfully");
        //  onClose()
      }
      if (dataRes) {
        console.log(dataRes);
      }
    }
  }, [token, editData, selectedService]);

  return (
    <StyledWrapper>
      <ServiceTitle>{t("settings_sms-title2")}</ServiceTitle>
      <StyledDropdown
        label={t("settings_sms-new-label")}
        placeholder={t("settings_sms-new-label")}
        value={selectedServiceId}
        onSelect={(v) => setSelectedServiceId(v)}
        options={servicesOptions}
      />

      <StyledForm>
        {selectedService?.form.fields.map((f) => {
          if (f.slug === "permanent_recipients")
            return (
              <StyledNumbersList
                key={f.slug}
                options={[]}
                isValidNewOption={phoneNumberValidator}
                placeholder={t(translation[f.name]) || f.name}
                label={t(translation[f.name]) || f.name}
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
          if (f.slug === "from")
            return (
              <StyledNumbersList
                key={f.slug}
                options={[]}
                placeholder={t(translation[f.name]) || f.name}
                label={t(translation[f.name]) || f.name}
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
              key={f.slug}
              isForPreview={false}
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
      <StyledButton data-action={activityList["new-sms-save"]} onClick={handleAdd} disabled={!selectedServiceId}>{t("settings_sms-add")}</StyledButton>
    </StyledWrapper>
  );
});

export default EditNewSms;
