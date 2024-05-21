export const replacePagesNames = (login: string, pages: any[]) => {
    const sorted = pages.sort((a, b) => {
        let textA = a.name.toUpperCase();
        let textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
    if(login === 'Test_user_E') {
        return sorted.map((p: any, i: number) => ({...p, name: `Asset ${i + 1}`}))
    }
    if(login === 'Test_user_H') {
        return sorted.map((p: any, i: number) => ({...p, name: `נכס ${i + 1}`}))
    }
    return pages
}