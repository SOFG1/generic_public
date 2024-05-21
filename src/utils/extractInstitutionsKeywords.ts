import { IInstitution } from "../store/settings"



export const extractInstitutionsKeywords = (ids: number[], institutions: IInstitution[]) => {
    const keywords: any[] = []
    ids.forEach(id => {
        const inst = institutions.find(i => i.inst_code === id)
        if(inst) {
            keywords.push(...inst.keywords)
        }
    })
    return keywords
}