export interface IHistoryAction {
    edited_row: string
    edit_at: string
    editer: string
    action: string
    status_from: string
    status_to: string
    fields: string[]
}

export interface IHistoryState {
    actions: IHistoryAction[]
    numberOfActions: number
    sorting: string
    filters: any
    currentPage: number
}
