export interface Note {
    id: number,
    content: string,
    important: boolean
}

export type NewNote = Omit<Note, 'id'>;