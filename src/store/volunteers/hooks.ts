import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "..";
import { volunteersApplyFilters, volunteersAssignActivity, volunteersCreateActivity, volunteersDeleteRow, volunteersDownloadTable, volunteersGetStaticData, volunteersGetTable, volunteersSetTablePage } from "./actions";
import { IVolunteersState } from "./types";

export const volunteersSelector = (state: rootReducerType) => state.volunteers

export const useVolunteersState = (): IVolunteersState => useSelector(volunteersSelector)

export const useVolunteersActions = () => {
    const dispatch = useDispatch()

    const onGetStaticData = () => dispatch(volunteersGetStaticData())

    const onCreateActivity = (activity: {[key: string]: string}) => dispatch(volunteersCreateActivity(activity))

    const onAssignActivity = (activity_id: number, assignees: string[]) => {
        dispatch(volunteersAssignActivity({activity_id, assignees}))
    }

    const onApplyFilters = (filters: {[key: string]: string})=> {
        dispatch(volunteersApplyFilters(filters))
    }

    const onClearFilters = ()=> {
        dispatch(volunteersApplyFilters({}))
    }

    const onGetTable = () => {
        dispatch(volunteersGetTable())
    }

    const onSetTablePage = (page: number) => {
        dispatch(volunteersSetTablePage(page))
    }

    const onDeleteTableRow = (id: number) => {
        dispatch(volunteersDeleteRow(id))
    }

    const onDownloadTable = () => {
        dispatch(volunteersDownloadTable())
    }


    return {
        onGetStaticData,
        onCreateActivity,
        onAssignActivity,
        onApplyFilters,
        onClearFilters,
        onGetTable,
        onSetTablePage,
        onDeleteTableRow,
        onDownloadTable
    }
}