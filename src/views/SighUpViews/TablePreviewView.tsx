import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { desktopBp } from "../../styles/variables";

const TableStyled = styled.div<{ isEmpty: boolean }>`
  background: ${colors.white};
  border: 1px dashed
    ${({ isEmpty }) => (isEmpty ? colors.graphite_1 : colors.graphite_5)};
  box-sizing: border-box;
  border-radius: 1.04vw;
  width: 100%;
  min-height: 6.25vw;
  max-width: 24.58vw;
  overflow: hidden;
  @media screen and (max-width: ${desktopBp}) {
    border-radius: 13px;
    min-height: 78px;
    max-width: 308px;
  }
  @media screen and (max-width: 550px) {
    max-width: 300px;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  border-radius: 1.04vw;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 6.25vw;
  @media screen and (max-width: ${desktopBp}) {
    border-radius: 13px;
    min-height: 78px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
  }

  tr {
  }

  th,
  td {
    min-width: 100px;
    border: 1px solid #bababa;
    padding: 0.42vw;
    box-sizing: border-box;
    color: ${colors.graphite_6};
    @media screen and (max-width: ${desktopBp}) {
      padding: 5px;
    }
  }

  th {
    background-color: #e8e5e9;
  }

  td {
  }
`;

interface IProps {
  data: { [key: string]: string | number | boolean }[];
  columns?: string[];
  onChangeMatchColumns: (match: { [key: string]: string }) => void;
  registration: boolean;
  className?: string;
}

const TablePreviewView = React.memo(
  ({
    data,
    columns,
    onChangeMatchColumns,
    registration = false,
    className,
  }: IProps) => {
    const { t } = useTranslation();
    const [matchHeaders, setMatchHeaders] = useState<{ [key: string]: string }>(
      {}
    );
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
    const name_columns: string[] = useMemo(() => {
      if (data.length > 0) {
        return Object.keys(data[0]);
      }
      return [];
    }, [data]);

    //Auto select according
    useEffect(() => {
      const match: { [key: string]: string } = {};
      if (columns && columns.length > 0 && name_columns.length > 0) {
        for (const id in columns) {
          const key = name_columns[id];
          match[key] = "";
          const keyLower = key?.toLowerCase();
          columns.forEach((column) => {
            if (column.toLowerCase() === keyLower) match[key] = column;
          });
        }
        setMatchHeaders(match);
      }
    }, [name_columns, columns]);

    useEffect(() => {
      onChangeMatchColumns(matchHeaders);
    }, [matchHeaders, onChangeMatchColumns]);

    const onSelectMatch = useCallback(
      (column: string, value: string) => {
        setMatchHeaders((prevState) => {
          //Delete if one of the fields already have this value
          const prevCopy = {...prevState}
          Object.keys(prevCopy).forEach(key => {
            if(prevCopy[key] === value) prevCopy[key] = ""
          })
          return {
            ...prevCopy,
            [column]: value,
          };
        });
        setSelectedColumns((prevState) => {
          if (value === "" || value === "-") {
            return [
              ...prevState.filter((item) => item !== matchHeaders[column]),
            ];
          } else if (value !== matchHeaders[column]) {
            return [
              ...prevState.filter((item) => item !== matchHeaders[column]),
              value,
            ];
          } else {
            return [...prevState, value];
          }
        });
      },
      [matchHeaders]
    );

    console.log(matchHeaders);
    

    return (
      <TableStyled isEmpty={data.length === 0} className={className}>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                {registration
                  ? name_columns.map((column, id) => {
                      return (
                        <th key={`ColumnMatch-${id}`}>
                          <select
                            name={column}
                            onChange={(event) =>
                              onSelectMatch(column, event.target.value)
                            }
                            value={matchHeaders[column]}
                            defaultValue={matchHeaders[column] || ""}
                          >
                            <option value="">
                              {t("sign-up_table-select")}
                            </option>
                            {columns &&
                              columns.map((col, cid) => {
                                return (
                                  <option
                                    disabled={_.includes(selectedColumns, col)}
                                    value={col}
                                    key={`Match-${id}-${cid}`}
                                  >
                                    {col}
                                  </option>
                                );
                              })}
                          </select>
                        </th>
                      );
                    })
                  : null}
              </tr>
              <tr>
                {name_columns.map((column, id) => {
                  return <th key={`ColumnName-${id}`}>{column}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((row, id) => {
                return (
                  <tr key={`Row-${id}`}>
                    {name_columns.map((column, cid) => {
                      return (
                        <td key={`Cell-${id}-${cid}`}>{String(row[column])}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableWrapper>
      </TableStyled>
    );
  }
);

export default TablePreviewView;
