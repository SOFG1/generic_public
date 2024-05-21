import { rootReducerType } from "..";
import { IQuestionnaire } from "./types";

export const settingsMainInstitutionSelector = (state: rootReducerType) => {
    return state.settings.institutions.find(i => i.is_main)
}


export const settingsVoterQuestsSelector = (state: rootReducerType): IQuestionnaire[] => {
    return state.settings.voterQuests
}


export const settingsPostTypesSelector = (state: rootReducerType): string[] => state.settings.post_types
export const settingsPostTypesFetchingSelector = (state: rootReducerType): boolean => state.settings.isFetchingPostTypes
