export interface Note {
    id: string,
    content: string,
    important: boolean,
    user: string
}

export interface NewNote {
    content: string,
    important: boolean,
    userId: string
}