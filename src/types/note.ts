export interface Note {
    id: string,
    content: string,
    important: boolean
}

export type NewNote = Omit<Note, 'id'>;
