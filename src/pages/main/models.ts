type IAgent = {
    name: string
    picture: string
    role: string
}

export type IData = {
    agent: IAgent
    maps: Array<{ [key: number] : number}>
}
