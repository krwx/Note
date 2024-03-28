import { useContext, useRef, useState } from "react";
import { NotesContext, ActiveNoteContext, ActiveNoteDispatchContext, NotesDispatchContext } from "../context/NotesContext";
import { Note } from "../type/Note";
import { Modal } from 'antd';

const PreviewPanel = () => {

    const notes = useContext(NotesContext);
    const activeNote = useContext(ActiveNoteContext);
    const noteDispatch = useContext(NotesDispatchContext);
    const activeNoteDispatch = useContext(ActiveNoteDispatchContext);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const deleteNote = useRef({} as Note);

    const MAX_BODY_LENGTH = 60;

    function clickItem(note: Note) {
        activeNoteDispatch && activeNoteDispatch({
            type: "changed",
            ... note
        })
    }

    function doubleClickItem(note: Note) {

        setIsModalOpen(true);
        deleteNote.current = note;

        /* const doDelete = confirm("确认要删除该笔记吗?");

        if (doDelete) {
            noteDispatch && noteDispatch({
                type: "deleted",
                ... note
            });

            const currentActiveNote = notes.find(t => t.id !== note.id);
            if (currentActiveNote) {
                activeNoteDispatch && activeNoteDispatch({
                    type: "changed",
                    ... currentActiveNote
                })
            }
        } */
    }

    const handleOk = () => {
        setIsModalOpen(false);

        noteDispatch && noteDispatch({
            type: "deleted",
            ... deleteNote.current
        });

        const currentActiveNote = notes.find(t => t.id !== deleteNote.current.id);
        if (currentActiveNote) {
            activeNoteDispatch && activeNoteDispatch({
                type: "changed",
                ... currentActiveNote
            })
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {notes.map(note => {
                const itemClassName = "notes__list-item" + " " + (activeNote.id == note.id ? "notes__list-item--selected" : "");
                return (
                    <div className={itemClassName} key={note.id} onClick={() => {clickItem(note)}} onDoubleClick={() => {doubleClickItem(note)}}>
                        <div className="notes__small-title">{note.title}</div>
                        <div className="notes__small-body">
                            {note.body.substring(0, MAX_BODY_LENGTH)}
                            {note.body.length > MAX_BODY_LENGTH ? "..." : ""}
                        </div>
                        <div className="notes__small-updated">
                            {new Date(note.updated).toLocaleString(undefined, {
                                dateStyle: "full",
                                timeStyle: "short",
                            })}
                        </div>
                    </div>
                )
            })}
            <Modal title="确认" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
                <p>确认删除笔记吗？</p>
            </Modal>
        </div>
    )
}

export default PreviewPanel