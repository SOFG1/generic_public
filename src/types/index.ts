import {IUserInfo} from "../store/user/types";

enum ERegistrationSteps {
    StepOne,
    StepTwo,
    StepThree,
}
type InputValueType = string | number | boolean | [Date | null, Date | null]

interface IUserAccess {[access: string]: {title: string, value: boolean, accesses: {name: string, isAccess: boolean}[]}}

interface IUser {
    username: string,
    email: string
    userAccess: IUserAccess
}



export type {InputValueType, IUser, IUserAccess}
export {ERegistrationSteps}