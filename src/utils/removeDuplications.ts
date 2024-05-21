type Item = {
    id: number
    [key: string]: any
}



//This function takes array of items and returns array without duplications
export const removeDuplications = (arr: Item[]): Item[] => {
    const filtered: Item[] = []
    arr.forEach(item => {
        if(filtered.some(i => item.id === i.id)) return
        filtered.push(item)
    })
    return filtered
}