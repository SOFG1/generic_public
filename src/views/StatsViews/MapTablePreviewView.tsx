import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import {colors} from "../../styles/colors";
import _ from "lodash";

const TableStyled = styled.div<{ isEmpty: boolean }>`
  background: ${colors.white};
  border: 1px dashed ${({isEmpty}) => isEmpty ? colors.graphite_1 : colors.graphite_5};
  box-sizing: border-box;
  border-radius: 20px;
  width: 100%;
  min-height: 120px;
  max-width: 472px;
  overflow: hidden;
`

const TableWrapper = styled.div`
  width: 100%;
  border-radius: 20px;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 120px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {

  }

  tr {

  }

  th, td {
    min-width: 100px;
    border: 1px solid #bababa;
    padding: 8px;
    box-sizing: border-box;
    color: ${colors.graphite_6};
  }

  th {
    background-color: #E8E5E9;
  }

  td {

  }
`

const MapTablePreviewView = React.memo(({data, columns, onChangeMatchColumns, onChangeResultColumns}: { 
    data: { [key: string]: string | number | boolean }[], 
    columns?: { name: string, required: boolean }[], 
    onChangeMatchColumns: (match: {[key: string]: string}) => void,
    onChangeResultColumns: (resCol: string[]) => void}) => {
    const [matchHeaders, setMatchHeaders] = useState<{[key: string]: string}>({});
    const [resultColumns, setResultColumns] = useState<string[]>([]);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
    const name_columns: string[] = useMemo(() => {
        if (data.length > 0) {
            return Object.keys(data[0])
        }
        return []
    }, [data])



    useEffect(() => {
        const match: {[key: string]: string} = {}
        if (columns) {
            name_columns.forEach(name => {
                if(columns.some(c => c.name === name)) {
                    match[name] = name

                }
                // if(!columns.some(c => c.name === name)) { //set 'result' for not matched columns
                //     match[name] = 'result'
                // }
            })
            setMatchHeaders(match)
        }
    }, [name_columns, name_columns, columns])





    useEffect(() => {
        onChangeMatchColumns(matchHeaders)
        onChangeResultColumns(resultColumns)
    }, [matchHeaders, resultColumns, onChangeMatchColumns, onChangeResultColumns])

    const onSelectMatch = useCallback ((column: string, value: string) => {
        if (value == 'result'){
            setResultColumns(prevState => {
                return [...prevState, column]
            })
        }
        else{
            setMatchHeaders(prevState => {
                return {
                    ...prevState,
                    [column]: value
                }
            })
        }
        setSelectedColumns(prevState => {
            if (value == 'result') {
                return [...prevState]
            }else if (value === '' || value === '-') {
                return [...prevState.filter(item => item !== matchHeaders[column])]
            } else if (value !== matchHeaders[column]) {
                return [...prevState.filter(item => item !== matchHeaders[column]), value]
            } else {
                return [...prevState, value]
            }
        })
    }, [matchHeaders])

    const values: any = (column: string) => {
        if (resultColumns.indexOf(column) != -1){
            return 'result'
        }
        else {
            return matchHeaders[column]
        }
    }

    return (
        <TableStyled isEmpty={data.length === 0}>
            <TableWrapper>
                <Table>
                    <thead>
                    <tr>
                        {
                            name_columns.map((column, id) => {
                                return (
                                    <th key={`ColumnMatch-${id}`}>
                                        <select name={column} onChange={event => onSelectMatch(column, event.target.value)} value={values(column)} defaultValue={matchHeaders[column] || ''}>
                                            <option value="" disabled>Select header</option>
                                            {
                                                columns && columns.map((col, cid) => {
                                                    return <option disabled={_.includes(selectedColumns, col.name) && col.name !== "description"} value={col.name} key={`Match-${id}-${cid}`}>{col.name}</option>
                                                })
                                            }
                                        </select>
                                    </th>
                                )
                            })
                        }
                    </tr>
                    <tr>
                        {
                            name_columns.map((column, id) => {
                                return (
                                    <th key={`ColumnName-${id}`}>{column}</th>
                                )
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((row, id) => {
                            return (
                                <tr key={`Row-${id}`}>
                                    {
                                        name_columns.map((column, cid) => {
                                            return (
                                                <td key={`Cell-${id}-${cid}`}>{row[column]}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </TableWrapper>
        </TableStyled>
    );
})

export default MapTablePreviewView;