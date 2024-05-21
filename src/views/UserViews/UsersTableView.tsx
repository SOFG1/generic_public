import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  //@ts-ignore
  useDeferredValue,
} from "react";
import styled from "styled-components";
import { Button } from "../../UI/Button";
import { Card } from "../../components/common/Card";
import { Title } from "../../components/common/Title";
import { colors } from "../../styles/colors";
import {
  AccessIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
  NoAccessIcon,
  SortIcon,
} from "../../UI/Svg";
import { Modal } from "../../UI/Modal";
import CreateOrEditUserView from "./CreateOrEditUserView";
import { ConfirmDeleteFull } from "../../components/common/ConfirmDeleteFull";
import { useUsersActions, useUsersState } from "../../store/users/hooks";
import { initialUserInfo, IUserInfo } from "../../store/user/types";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { User } from "../../api/user";
import { usePermissions } from "../../store/user/hooks";
import { useAppActions } from "../../store/app";
import { useTranslation } from "react-i18next";
import { Loader } from "../../UI/Spinners";
import {
  StyledScrollBtn,
  StyledTable,
  StyledTableAction,
  StyledTableActions,
  TableWrapper,
} from "../../UI/StyledTable";
import { Input } from "../../UI/Input";
import { desktopBp } from "../../styles/variables";
import { escapeRegExp } from "../../utils";
import { activityList } from "../../config/userActivityList";
import { useSettingsActions } from "../../store/settings";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const CardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.04vw;
  padding-bottom: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
    padding-bottom: 20px;
  }
`;

const CardTitle = styled(Title)`
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.51vw;
  margin: 0;
  width: fit-content;
  display: flex;
  align-content: center;
  align-items: center;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 19px;
  }
`;

const StyledSearchInput = styled(Input)`
  max-width: 15.63vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 196px;
  }
`;

const ButtonsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.04vw;
  margin-inline-start: auto;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
  }
`;

const StyledButton = styled(Button)`
  max-width: 18.23vw;
  white-space: nowrap;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 229px;
  }
`;

const StyledSortBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  border: 0;
  background-color: transparent;
  margin-inline-start: 0.52vw;
  cursor: pointer;
  transition: opacity 200ms linear;
  &:hover {
    opacity: 0.6;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 7px;
  }
`;

const HiddenTableHeader = styled.th`
  opacity: 0;
  border: none !important;
`;

const CardContent = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0;
`;

const CellWithIcon = styled.td`
  text-align: center;

  svg {
    margin: 0 2px;
  }
`;

const StyledRow = styled.tr<{ isActive: boolean }>`
  cursor: pointer;
  ${({ isActive }) => isActive && "background-color: #000; color: #fff;"}
`;

const StyledLoader = styled(Loader)`
  height: 13.02vw;
  width: 13.02vw;
  margin-bottom: 1.56vw;
  margin: 0 auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 163px;
    width: 163px;
    margin-bottom: 20px;
  }
`;

const LoadingText = styled.p`
  font-size: 1.04vw;
  line-height: 1.25vw;
  font-weight: normal;
  text-align: center;
  color: ${colors.graphite_6};
  @media screen and (max-width: ${desktopBp}) {
    font-size: 13px;
    line-height: 16px;
  }
`;

const UsersTableView = React.memo(() => {
  const { t, i18n } = useTranslation();
  const { token } = useUserState();
  const { users, defaultPermissions, isFetchingUsers } = useUsersState();
  const { onGetUsers, onGetDefaultPerms } = useUsersActions();
  const { onGetInstitutions } = useSettingsActions();
  const { onShowAlert } = useAppActions();
  const permissions = usePermissions("Users");
  const TableWrapperRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<number | null>(
    null
  );
  const [showConfirmBulkDelete, setShowConfirmBulkDelete] =
    useState<boolean>(false);
  const [dataField, setDataField] = useState<IUserInfo | null>(null);
  const [isCreated, setIsCreated] = useState<boolean>(true);
  const [usersSorting, setUsersSorting] = useState<null | boolean>(null);
  const [selectedUsersIds, setSelectedUsersIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const emptyData = useMemo(() => {
    return { ...initialUserInfo, permissions: { ...defaultPermissions } };
  }, [defaultPermissions]);

  useEffect(() => {
    setDataField(emptyData);
  }, [emptyData]);


  useEffect(() => {
    onGetUsers();
    onGetInstitutions()
  }, []);

  useEffect(() => {
    onGetDefaultPerms()
  }, [i18n.language]);

  const headers = useMemo(() => {
    return Object.keys(defaultPermissions);
  }, [defaultPermissions]);

  const sortedUsers = useMemo(() => {
    const sorted = users.slice().sort((a, b) => {
      let aLow = a.login.toLowerCase(),
        bLow = b.login.toLowerCase();
      if (aLow < bLow) return -1;
      if (aLow > bLow) return 1;
      return 0;
    });
    if (usersSorting === true) return sorted;
    if (usersSorting === false) return sorted.reverse();
    return users;
  }, [users, usersSorting]);

  const isRtl = useMemo(() => {
    return i18n.dir() === "rtl"
  }, [i18n])

  const searchFilteredUsers = useMemo(() => {
    const pattern = escapeRegExp(deferredSearchQuery);
    return sortedUsers.filter((u) => u.login?.match(pattern));
  }, [sortedUsers, deferredSearchQuery]);

  const handleSetSorting = () => {
    setUsersSorting((prev) => !prev);
  };

  const onDeleteUser = useCallback(
    async (id: number | null) => {
      if (!permissions["delete"]) {
        onShowAlert(false, "You dont have access for delete!");
        return;
      }
      if (token && id) {
        const [delRes, delErr]: any[] = await handle(
          User.deleteUser(id, token)
        );
        if (!delErr) {
          onShowAlert(true, "User was successfully deleted");
          setShowConfirmDelete(null);
          onGetUsers();
        }
        if (delErr) {
          onShowAlert(false, delErr.error);
        }
      }
    },
    [token, onGetUsers, permissions, onShowAlert]
  );

  const onEditUser = useCallback(
    (item: any) => {
      let perms = JSON.parse(JSON.stringify(item.permissions));
      Object.keys(perms).forEach((page) => {
        //Delete page if it doesn't exist in defaultPermissions
        if (!defaultPermissions.hasOwnProperty(page)) {
          delete perms[page];
          return;
        }
        //Delete action if it doesn't exist in defaultPermissions
        const actionsObj = defaultPermissions[page].actions;
        Object.keys(perms[page].actions).forEach((action) => {
          if (!actionsObj.hasOwnProperty(action)) {
            delete perms[page].actions[action];
          }
        });
      });
      setDataField({ ...item, permissions: perms });
    },
    [defaultPermissions]
  );

  const handleSelectUser = useCallback(
    (id: number) => {
      if (selectedUsersIds.includes(id)) {
        const filtered = selectedUsersIds.filter((i) => i !== id);
        setSelectedUsersIds(filtered);
        return;
      }
      setSelectedUsersIds((p) => [...p, id]);
    },
    [selectedUsersIds]
  );

  const handleEditClick = useCallback(
    (e: React.MouseEvent, item: IUserInfo) => {
      //Stop propagation to prevent row(tr) selecting
      e.stopPropagation();
      if (!permissions["edit"]) {
        onShowAlert(false, t("user_access-edit"));
        return;
      }
      setShowModal(true);
      setIsCreated(false);
      onEditUser(item);
    },
    [onEditUser, permissions]
  );

  const handleDeleteClick = useCallback(
    (e: React.MouseEvent, id: number) => {
      //Stop propagation to prevent row(tr) selecting
      e.stopPropagation();
      if (!permissions["delete"]) {
        onShowAlert(false, t("user_access-del"));
        return;
      }
      setShowConfirmDelete(id);
    },
    [permissions]
  );

  const handleBulkDelete = useCallback(async () => {
    if (!permissions["delete"]) {
      onShowAlert(false, "You dont have access for delete!");
      return;
    }
    if (token) {
      const [dataRes, dataErr] = await handle(
        User.bulkDeleteUsers(token, selectedUsersIds)
      );
      if (!dataErr) {
        onShowAlert(
          true,
          `${selectedUsersIds.length} users were deleted successfully`
        );
        setShowConfirmBulkDelete(false);
        setSelectedUsersIds([]);
        onGetUsers();
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token, selectedUsersIds, permissions]);

  const handleScrollTable = useCallback(
    (dir: "left" | "right") => {
      let scrollValue = dir === "right" ? 300 : -300;
      TableWrapperRef?.current?.scrollBy(scrollValue, 0);
    },
    [TableWrapperRef]
  );

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <CreateOrEditUserView isCreated={isCreated} data={dataField} />
      </Modal>
      {/* Single delete waning */}
      {typeof showConfirmDelete === "number" && (
        <ConfirmDeleteFull
          show={typeof showConfirmDelete === "number"}
          onClose={() => setShowConfirmDelete(null)}
          onDelete={() => onDeleteUser(showConfirmDelete)}
          title={t("users_confirm-delete")}
          text={t("users_confirm")}
        />
      )}
      {/* Bulk delete warning */}
      {showConfirmBulkDelete && (
        <ConfirmDeleteFull
          show={showConfirmBulkDelete}
          onClose={() => setShowConfirmBulkDelete(false)}
          onDelete={handleBulkDelete}
          title={`Are you sure you want to delete ${selectedUsersIds.length} users`}
          text={t("users_confirm")}
        />
      )}
      <Card>
        <CardHeader>
          <CardTitle>
            {t("user_card-title")}
            <StyledSortBtn
              onClick={handleSetSorting}
              data-action={activityList["users-sort-table"]}
            >
              <SortIcon />
              A-Z
            </StyledSortBtn>
          </CardTitle>
          <StyledSearchInput
            type="text"
            name="search"
            label={t("user_card-search")}
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <ButtonsBox>
            {selectedUsersIds.length > 0 && (
              <StyledButton
                onClick={() => setShowConfirmBulkDelete(true)}
                data-action={activityList["users-bulk-delete"]}
              >
                {eval(t("user_del-btn"))(selectedUsersIds.length)}
              </StyledButton>
            )}
            <StyledButton
              data-action={activityList["users-create-modal"]}
              onClick={() => {
                if (!permissions["create"]) {
                  onShowAlert(false, "You dont have access for create!");
                  return;
                }
                setShowModal(true);
                setIsCreated(true);
                setDataField(emptyData);
              }}
            >
              {t("user_add-btn")}
            </StyledButton>
          </ButtonsBox>
        </CardHeader>
        {isFetchingUsers && (
          <>
            <LoadingText>Refreshing your data</LoadingText>
            <StyledLoader />
          </>
        )}

        {!isFetchingUsers && (
          <CardContent>
            <TableWrapper ref={TableWrapperRef}>
              <StyledTable>
                <thead>
                  <tr>
                    <HiddenTableHeader></HiddenTableHeader>
                    <HiddenTableHeader></HiddenTableHeader>
                    <th>{t("user_perms-name")}</th>
                    <th>{t("user_perms-email")}</th>
                    {headers.map((header, id) => {
                      return (
                        <th key={`Table header-${id}`}>
                          {defaultPermissions[header].viewName}{" "}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {searchFilteredUsers.map((item) => {
                    return (
                      <StyledRow
                        data-action={activityList["users-change-selected"]}
                        isActive={selectedUsersIds.includes(item.id)}
                        key={item.id}
                        onClick={() => handleSelectUser(item.id)}
                      >
                        <StyledTableAction
                          data-action={activityList["users-edit-modal"]}
                          onClick={(e) => handleEditClick(e, item)}
                        >
                          <span>Edit user</span>
                          <EditIcon />
                        </StyledTableAction>

                        <StyledTableAction
                          data-action={activityList["users-delete-user"]}
                          onClick={(e) => handleDeleteClick(e, item.id)}
                        >
                          <span>Delete user</span>
                          <DeleteIcon />
                        </StyledTableAction>
                        <td>{item.login}</td>
                        <td>{item.email}</td>
                        {headers.map((header, elId) => {
                          const el = item.permissions[header];
                          if (el && el.access) {
                            return (
                              <CellWithIcon key={`Cell-${item.login}-${elId}`}>
                                {Object.values(el.actions).map(
                                  (cell, cid: number) => {
                                    return (
                                      <span
                                        key={`Cell-${item.login}-${elId}-${cid}`}
                                      >
                                        {cell ? (
                                          <AccessIcon
                                            key={`Cell-${item.login}-${elId}-${cid}`}
                                          />
                                        ) : (
                                          <NoAccessIcon
                                            key={`Cell-${item.login}-${elId}-${cid}`}
                                          />
                                        )}
                                      </span>
                                    );
                                  }
                                )}
                              </CellWithIcon>
                            );
                          } else {
                            return (
                              <CellWithIcon key={`Cell-${item.login}-${elId}`}>
                                <NoAccessIcon />
                              </CellWithIcon>
                            );
                          }
                        })}
                      </StyledRow>
                    );
                  })}
                </tbody>
              </StyledTable>
            </TableWrapper>
            <StyledTableActions>
              <StyledScrollBtn
                data-action={activityList["users-scroll-table"]}
                onClick={() => handleScrollTable(isRtl ? "right" : "left")}
              >
                {isRtl ? (
                  <ChevronRightIcon height="16px" />
                ) : (
                  <ChevronLeftIcon height="16px" />
                )}
              </StyledScrollBtn>

              <StyledScrollBtn
                data-action={activityList["users-scroll-table"]}
                onClick={() => handleScrollTable(isRtl ? "left" : "right")}
              >
                {isRtl ? (
                  <ChevronLeftIcon height="16px" />
                ) : (
                  <ChevronRightIcon height="16px" />
                )}
              </StyledScrollBtn>
            </StyledTableActions>
          </CardContent>
        )}
      </Card>
    </>
  );
});

export default withErrorBoundaryHOC(UsersTableView);
