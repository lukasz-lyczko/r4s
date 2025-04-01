export type Pet = {
    id: number,
    category: {
        id: number,
        name: string
    },
    name: string,
    photoUrls: string[],
    tags: string[],
    status: PetStatus
}

export type PetStatus = 'available' | 'pending' | 'sold'
