import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  ITableColumn,
  useRawDataActions,
  useRawDataState,
} from "../../store/rawData";
import { StyledIdTD, StyledTable, TableWrapper } from "../../UI/StyledTable";
import { useUserState } from "../../store/user";
import { Button } from "../../UI/Button";
import { useTranslation } from "react-i18next";

const StyledTR = styled.tr<{ selected: boolean }>`
  cursor: pointer;
  ${({ selected }) => selected && "background-color: #000; color: #fff;"}
`;

interface IProps {
  rows: ITableColumn[];
  onUpdateRows: (rowsIds: string[]) => void;
}

const UpdateReferrersComponent = React.memo(
  ({ rows, onUpdateRows }: IProps) => {
    const { t } = useTranslation();
    const { statusCoors } = useUserState();
    const { tableColumns } = useRawDataState();
    const { onGetTableColumns } = useRawDataActions();
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const handleSelect = useCallback(
      (id: any) => {
        const selected = selectedRows.includes(id);
        if (selected) {
          setSelectedRows((p) => p.filter((rId) => rId !== id));
        }
        if (!selected) {
          setSelectedRows([...selectedRows, id]);
        }
      },
      [selectedRows]
    );

    useEffect(() => {
      const ids = rows.map((r) => r.id);
      setSelectedRows(ids as string[]);
    }, [rows]);

    useEffect(() => {
      onGetTableColumns();
    }, []);

    return (
      <>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                {rows[0] &&
                  Object.keys(rows[0]).map((key) => {
                    return (
                      <th>
                        {tableColumns.find((c) => c.slug === key)?.name || key}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                return (
                  <StyledTR
                    onClick={() => handleSelect(row.id)}
                    selected={selectedRows.includes(row.id as string)}
                    key={index}
                  >
                    {Object.keys(row).map((key) => {
                      if (key === "id") {
                        return (
                          <StyledIdTD
                            color={
                              statusCoors?.find((s) => s.status === row.status)
                                ?.color
                            }
                          >
                            {row.id}
                          </StyledIdTD>
                        );
                      }
                      return <td>{row[key]}</td>;
                    })}
                  </StyledTR>
                );
              })}
            </tbody>
          </StyledTable>
        </TableWrapper>
        {rows.length === 0 && <p>{t("referrer_not-found")}</p>}
        <Button onClick={() => onUpdateRows(selectedRows)}>
          {t("referrer_update", { rows: selectedRows.length })}
        </Button>
      </>
    );
  }
);

export default UpdateReferrersComponent;
