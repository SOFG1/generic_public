import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Title } from "../../components/common/Title";
import { colors } from "../../styles/colors";
import { AccessIcon, NoAccessIcon } from "../../UI/Svg";
import { Button } from "../../UI/Button";
import { initialUserInfo, IUserInfo } from "../../store/user/types";
import { useUsersState } from "../../store/users";
import { handle } from "../../api";
import { User } from "../../api/user";
import { useUserState } from "../../store/user";
import _ from "lodash";
import { useUsersActions } from "../../store/users/hooks";
import { useTranslation } from "react-i18next";
import { Loader } from "../../UI/Spinners";
import { useAppActions } from "../../store/app";
import { desktopBp } from "../../styles/variables";
import { Checkbox, Input, InputPassword } from "../../UI/Input";
import { DropdownWithSearch } from "../../UI/Dropdown";
import { activityList } from "../../config/userActivityList";
import { useSettingsState } from "../../store/settings";

const FormBlock = styled.div`
  width: 100%;
`;

const CardTitle = styled(Title)`
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.51vw;
  margin: 0;
  text-align: center;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 19px;
  }
`;

const AccessTitle = styled(Title)`
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.51vw;
  text-align: center;
  width: 100%;
  margin-top: 1.04vw;
  margin-bottom: 0;
  color: ${colors.graphite_5};
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 19px;
    margin-top: 13px;
  }
`;

const InputBlock = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  margin-top: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 20px;
  }
`;

const StyledInput = styled(Input)`
  max-width: 22.5vw;
  margin: 0 0.78vw 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 282px;
    margin: 0 10px 13px;
  }
`;

const StyledPassInput = styled(InputPassword)`
  max-width: 22.5vw;
  margin: 0 0.78vw 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 282px;
    margin: 0 10px 13px;
  }
`

const StyledDropdown = styled(DropdownWithSearch)`
  max-width: 22.5vw;
  margin: 0 0.78vw 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 282px;
    margin: 0 10px 13px;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  max-width: 22.5vw;
  margin: 0 0.78vw 1.04vw;
  flex-grow: 1;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 282px;
    margin: 0 10px 13px;
  }
`;

const AccessBlock = styled.div`
  display: flex;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;
  }
`;

const AccessRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 1.56vw;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 20px;
  }
  @media screen and (max-width: 1050px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 55px;
  }
`;

const AccessName = styled.button<{ disabled?: boolean }>`
  cursor: pointer;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  font-weight: 500;
  font-size: 0.94vw;
  line-height: 1.15vw;
  color: ${colors.graphite_6};
  border: 0;
  padding: 0;
  background-color: transparent;

  ${({ disabled }) =>
    disabled
      ? `
    cursor: not-allowed;
    svg path {
      fill: ${colors.graphite_2};
    }`
      : ""}

  svg {
    margin-left: 0.52vw;
  }

  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 14px;

    svg {
      margin-left: 7px;
    }
  }
`;

const AccessValues = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.78vw 1.56vw;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
  margin-inline-start: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 10px 20px;
    margin-inline-start: 20px;
  }
  @media screen and (max-width: 1150px) {
    margin-inline-start: 0px;
  }
`;

const AccessValue = styled.button<{ disabled: boolean }>`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  cursor: pointer;
  border: 0;
  padding: 0;
  background-color: transparent;
  ${({ disabled }) =>
    disabled
      ? `
    cursor: not-allowed;
    svg path {
      fill: ${colors.graphite_2};
    }`
      : ""}

  @media screen and (max-width: 1150px) {
    min-width: 108px;
  }
`;

const AccessValueName = styled.div`
  font-weight: 500;
  font-size: 0.83vw;
  line-height: 0.89vw;
  color: ${colors.graphite_4};
  margin-bottom: 0.52vw;
  text-transform: capitalize;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    line-height: 11px;
    margin-bottom: 7px;
  }
`;

const ButtonBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 20px;
  }
`;

const keys = [
  "login",
  "full_name",
  "uid",
  "password",
  "email",
  "pages",
  "permissions",
  "is_active",
  "is_caller",
  "access_countrys",
  "use_referal_filter",
  "segments"
];


const CreateOrEditUserView = React.memo(
  ({ data, isCreated }: { data: IUserInfo | null; isCreated: boolean }) => {
    const { t } = useTranslation();
    const { token, userInfo } = useUserState();
    const { defaultPermissions } = useUsersState();
    const { institutions } = useSettingsState()
    const { onGetUsers } = useUsersActions();
    const { onShowAlert } = useAppActions();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>(
      data
        ? { ...data, uid: data.uid ? data.uid : "", is_caller: data?.role?.id === 3, password: "", segments: data?.segments?.map(s => s.inst_code) || [] }
        : {
          ...initialUserInfo,
          permissions: { ...defaultPermissions },
          password: "",
        }
    );




    useEffect(() => {
      if (userData.is_caller) {
        const permissions = JSON.parse(JSON.stringify(defaultPermissions))
        permissions.CallCenter.access = true
        permissions.CallCenter.actions.calls = true
        setUserData((p: any) => ({ ...p, permissions }))
      }
    }, [userData.is_caller, defaultPermissions])


    const is409Group = useMemo(() => {
      return userInfo?.group.id === 409
    }, [userInfo?.group.id]);

    const institutionsOptions = useMemo(() => {
      return institutions.map(i => ({ value: i.inst_code, item: i.inst_name }))
    }, [institutions])


    const handleChangeInstitutions = useCallback((v: string) => {
      const arr = v.split(", ").filter(v => v).map(v => Number(v))
      setUserData((p: any) => ({ ...p, segments: arr }))
    }, [])

    const onToggleNameAccess = useCallback((access: string, val: boolean) => {
      setUserData((prevState: any) => {
        return {
          ...prevState,
          permissions: {
            ...prevState.permissions,
            [access]: {
              ...prevState.permissions[access],
              access: val,
            },
          },
        };
      });
    }, []);

    const onToggleAccessValues = useCallback(
      (page: string, action: string, val: boolean) => {
        setUserData((prevState: any) => {
          return {
            ...prevState,
            permissions: {
              ...prevState.permissions,
              [page]: {
                ...prevState.permissions[page],
                actions: {
                  ...prevState.permissions[page].actions,
                  [action]: val,
                },
              },
            },
          };
        });
      },
      []
    );

    const onSave = useCallback(async () => {
      if (token) {
        const data: { [key: string]: any } = {};
        for (const key in userData) {
          if (_.includes(keys, key)) {
            if (!isCreated && key === "password" && userData[key] === "")
              continue;
            // @ts-ignore
            data[key] = userData[key];
          }
        }
        if (isCreated) {
          setIsFetching(true);
          const [dataRes, dataErr]: any = await handle(
            User.createUsers(data, token)
          );
          setIsFetching(false);
          if (dataRes !== undefined) {
            onShowAlert(true, t("users_success"));
            onGetUsers();
          }
          if (dataErr) {
            onShowAlert(false, dataErr.error);
          }
        } else {
          setIsFetching(true);
          const [dataRes, dataErr]: any = await handle(
            User.editUsers(userData.id, data, token)
          );
          setIsFetching(false);
          if (dataRes !== undefined) {
            onShowAlert(true, t("users_success"));
            onGetUsers();
          }
          if (dataErr) {
            onShowAlert(false, dataErr.error);
          }
        }
      }
    }, [userData, isCreated, onGetUsers, token]);

    const errorMsgs = useMemo(() => {
      const errs: { [key: string]: string } = {};
      if (isCreated) {
        if (userData.password.length < 5) {
          errs["password"] = "Min length 5";
        } else {
          errs["password"] = "";
        }
        if (userData.password === "") {
          errs["password"] = "Field is required";
        }
      }
      if (userData.login === "") {
        errs["login"] = "Field is required";
      } else {
        errs["login"] = "";
      }
      if (userData.email === "") {
        errs["email"] = "Field is required";
      } else {
        errs["email"] = "";
      }
      if (userData.full_name === "") {
        errs["full_name"] = "Field is required";
      } else {
        errs["full_name"] = "";
      }
      return errs;
    }, [isCreated, userData]);

    return (
      <FormBlock>
        <CardTitle>
          {isCreated ? "Add new user" : `Edit user ${userData.id}`}
        </CardTitle>
        <InputBlock>
          <StyledInput
            type="text"
            name="login"
            isRequired={isCreated}
            errorMessage={errorMsgs.login || ""}
            label={t("users_user-name-label")}
            value={userData.login || ""}
            onChange={(v) => setUserData((p: any) => ({ ...p, login: v }))}
          />

          <StyledInput
            type="text"
            name="full_name"
            isRequired={isCreated}
            errorMessage={errorMsgs.full_name || ""}
            label={t("users_full-name-label")}
            value={userData.full_name || ""}
            onChange={(v) => setUserData((p: any) => ({ ...p, full_name: v }))}
          />

          <StyledInput
            type="type"
            name="email"
            isRequired={isCreated}
            errorMessage={errorMsgs.email || ""}
            label={t("users_email-label")}
            value={userData.email || ""}
            onChange={(v) => setUserData((p: any) => ({ ...p, email: v }))}
          />

          <StyledPassInput
            name="password"
            isRequired={isCreated}
            errorMessage={errorMsgs.password || ""}
            label={t("users_pass-label")}
            value={userData.password || ""}
            onChange={(v) => setUserData((p: any) => ({ ...p, password: v }))}
          />

          <StyledInput
            type="int"
            name="uid"
            isRequired={false}
            errorMessage={errorMsgs.uid || ""}
            label={t("users_create-id")}
            value={userData.uid || ""}
            onChange={(v) => setUserData((p: any) => ({ ...p, uid: v }))}
          />

          <StyledDropdown
            label={is409Group ? t("users_create-segments(409)") : t("users_create-segments")}
            placeholder={is409Group ? t("users_create-segments(409)") : t("users_create-segments")}
            value={userData.segments?.join(", ") || ""}
            onSelect={handleChangeInstitutions}
            options={institutionsOptions}
            isMultiSelect={true}
          />

          {/* {is409Group && (
            <StyledDropdown
              label={is409Group ? t("users_create-country(409)") : t("users_create-country")}
              placeholder={is409Group ? t("users_create-country(409)") : t("users_create-country")}
              value={userData.access_countrys?.join(", ") || ""}
              onSelect={(v) => {
                const access_countrys = v.split(", ").filter((v: string) => v)
                setUserData((p: any) => ({ ...p, access_countrys }))
              }

              }
              options={countriesOptions}
              isMultiSelect={true}
            />
          )} */}

          <StyledCheckbox
            label={t("users_is_active")}
            isActive={userData.is_active}
            onChange={(v: boolean) => setUserData((p: any) => ({ ...p, is_active: v }))}
            required={isCreated}
          />

          <StyledCheckbox
            label={t("users_referal_filter")}
            isActive={!!userData.use_referal_filter}
            onChange={(v: boolean) =>
              setUserData((p: any) => ({ ...p, use_referal_filter: v }))
            }
            required={isCreated}
          />

          <StyledCheckbox
            label={t("users_referal_is-caller")}
            isActive={!!userData.is_caller}
            onChange={(v: boolean) =>
              setUserData((p: any) => ({ ...p, is_caller: v }))
            }
            required={isCreated}
          />
        </InputBlock>
        <AccessTitle>{t("users_accesses-title")}</AccessTitle>
        <AccessBlock>
          {Object.keys(userData.permissions).map((page) => {
            const currentAccess = userData.permissions[page];            
            if (!defaultPermissions[page]) return null;
            let pageActionsKeys = Object.keys(currentAccess.actions);
            //Change 'facebook' action order to be the last in settings
            if (pageActionsKeys.includes("facebook")) {
              const indexOfFB = pageActionsKeys.indexOf("facebook");
              pageActionsKeys.splice(indexOfFB, 1);
              pageActionsKeys = [...pageActionsKeys, "facebook"]; // make FB last in the oreder
            }
            return (
              <AccessRow key={page}>
                <AccessName
                  disabled={(page !== "CallCenter" && userData.is_caller)}
                  onClick={() =>
                    onToggleNameAccess(page, !currentAccess.access)
                  }
                >
                  {t(`users_page-${page}`)}{" "}
                  {currentAccess.access ? <AccessIcon /> : <NoAccessIcon />}
                </AccessName>
                <AccessValues>
                  {pageActionsKeys.map((action, id) => {
                    let label = `${page}-${action}`
                    if(is409Group && label === "Settings-institutions") {
                      label = "Settings-institutions(409)"
                    }
                    return (
                      <AccessValue
                        onClick={() => onToggleAccessValues(
                          page,
                          action,
                          !currentAccess.actions[action]
                        )}
                        key={`${page}-${id}`}
                        disabled={!currentAccess.access}
                      >
                        <AccessValueName>
                          {t(label)}
                        </AccessValueName>
                        {currentAccess.actions[action] ? (
                          <AccessIcon />
                        ) : (
                          <NoAccessIcon />
                        )}
                      </AccessValue>
                    );
                  })}
                </AccessValues>
              </AccessRow>
            );
          })}
        </AccessBlock>
        <ButtonBlock>
          {isFetching ? (
            <Loader />
          ) : (
            <Button
              data-action={activityList["users-save-user"]}
              disabled={
                Object.values(errorMsgs).filter((err) => err !== "").length > 0
              }
              onClick={onSave}
            >
              {t("users_page-save")}
            </Button>
          )}
        </ButtonBlock>
      </FormBlock>
    );
  }
);

export default CreateOrEditUserView;
