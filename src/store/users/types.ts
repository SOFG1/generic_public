import {IPageAccess, IUserInfo} from "../user/types";


export interface IUsersState {
    users: IUserInfo[]
    isFetchingUsers: boolean
    defaultPermissions: { [page: string]: IPageAccess,}
}