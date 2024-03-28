import React, { createContext, useReducer } from 'react';
import { Note } from '../type/Note';

export const NotesContext = createContext<Note[]>([]);
export const NotesDispatchContext = createContext<React.Dispatch<NotesAction> | null>(null);

export const ActiveNoteContext = createContext<Note>({} as Note);
export const ActiveNoteDispatchContext = createContext<React.Dispatch<ActiveNoteAction> | null>(null);

type Props = {
    children: React.ReactNode;
};

export function NotesProvider({ children }: Props) {

    const notes: Note[] = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

    notes.sort((a, b) => {
        return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });

    const [Notes, dispatch] = useReducer(
        NotesReducer,
        notes
    );

    const initialActiveNote = notes.length > 0 ? notes[0] : {
        id: 1,
        title: "新建笔记",
        body: "编辑笔记...",
        updated: "",
    };

    const [ActiveNote, activeNoteDispatch] = useReducer(ActiveNoteReducer, initialActiveNote);

    return (
        <NotesContext.Provider value={Notes}>
            <NotesDispatchContext.Provider value={dispatch}>
                <ActiveNoteContext.Provider value={ActiveNote}>
                    <ActiveNoteDispatchContext.Provider value={activeNoteDispatch}>
                        {children}
                    </ActiveNoteDispatchContext.Provider>
                </ActiveNoteContext.Provider>
            </NotesDispatchContext.Provider>
        </NotesContext.Provider>
    );
}

type NotesAction = {
    type: string,
    id: number,
    title: string,
    body: string,
    updated: string,
    notes?: Note[]
}

function sortNote(notes: Note[]) {
    return notes.sort((a, b) => {
        return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    })
}

function NotesReducer(notes: Note[], action: NotesAction): Note[] {
    switch (action.type) {
        case 'added': {
            const newNotes = [{
                id: action.id,
                title: action.title,
                body: action.body,
                updated: action.updated,
            }, ...notes];

            localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));

            return sortNote(newNotes);
        }
        case 'changed': {
            for (const obj of notes) {
                if (obj.id === action.id) {
                    obj.title = action.title;
                    obj.body = action.body;
                    obj.updated = action.updated;
                }
            }

            localStorage.setItem("notesapp-notes", JSON.stringify(notes));

            return sortNote([...notes]);
        }
        case 'deleted': {
            const newNotes = notes.filter(t => t.id !== action.id);

            localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));

            return sortNote(newNotes);
        }
        case 'import': {
            const notes = action.notes || [];
            localStorage.setItem("notesapp-notes", JSON.stringify(notes));
            return sortNote(notes);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

type ActiveNoteAction = {
    type: string,
    id: number,
    title: string,
    body: string,
    updated: string
}

function ActiveNoteReducer(_note: Note, action: ActiveNoteAction): Note {
    switch (action.type) {
        case 'added': {
            return {
                id: action.id,
                title: action.title,
                body: action.body,
                updated: action.updated,
            };
        }
        case 'changed': {
            return {
                id: action.id,
                title: action.title,
                body: action.body,
                updated: action.updated,
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
