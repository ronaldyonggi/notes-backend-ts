export interface Note {
    id: string,
    content: string,
    important: boolean,
    user: string
}

export type NewNote = Pick <Note, 'content' | 'important'>;