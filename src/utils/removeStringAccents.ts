


export const removeStringAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "") //Clean accents and diastrics
}