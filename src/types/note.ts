export interface Note {
    id: string,
    content: string,
    important: boolean
}

export interface NewNote {
    content: string,
    important: boolean,
    userId: string
}