import { PRIMARY_SERVER_URL } from "../api"

export const signatureBadge = 'alt="signature"'

export const composeSignature = (url: string) => {
    return `<img ${signatureBadge} width="300" style="object-fit: contain;" src="${PRIMARY_SERVER_URL + url}" />`
}