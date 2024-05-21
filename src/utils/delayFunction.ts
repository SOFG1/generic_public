



export const delayFunction = (delayMS: number) => {
    return new Promise((res, rej) => {
        setTimeout(() => res(undefined), delayMS)
    })
}