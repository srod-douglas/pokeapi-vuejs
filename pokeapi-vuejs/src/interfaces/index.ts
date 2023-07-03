export interface iStats {
    stat:{
        name: string,
    },
    base_stat: number,
}

export interface iPoke {
    stats: iStats[],
    base_experience: number,
    height: number,
    id: number,
    name: string,
    types: [
        {
            type:{
                name: string,
            }
        }
    ],
    weight: number,
}

export interface iColorType {
    name: string,
    value: string,
}
