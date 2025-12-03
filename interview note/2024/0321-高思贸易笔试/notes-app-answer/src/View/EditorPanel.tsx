import { ChangeEvent, useContext, useEffect, useState } from "react"
import { ActiveNoteContext, NotesContext, ActiveNoteDispatchContext, NotesDispatchContext } from "../context/NotesContext";
import { Modal } from 'antd';

const EditorPanel = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const notes = useContext(NotesContext);
    const activeNote = useContext(ActiveNoteContext);
    const noteDispatch = useContext(NotesDispatchContext);
    const activeNoteDispatch = useContext(ActiveNoteDispatchContext);

    function titleChanged(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function bodyChanged(event: ChangeEvent<HTMLTextAreaElement>) {
        setBody(event.target.value);
    }

    function blur() {
        setIsModalOpen(true);
    }

    const handleOk = () => {
        setIsModalOpen(false);
        const action = {
            type: "changed",
            id: activeNote.id,
            title: title,
            body: body,
            updated: new Date().toISOString()
        }
        activeNoteDispatch && activeNoteDispatch(action);
        noteDispatch && noteDispatch(action);
    };

    const handleCancel = () => {
        setIsModalOpen(false);

        setTitle(activeNote.title);
        setBody(activeNote.body);
    };

    useEffect(() => {
        setTitle(activeNote.title);
        setBody(activeNote.body);
    }, [activeNote])

    return (
        <div style={{ flex: "1" }}>
            {notes.length > 0 && <div className="notes__preview">
                <input className="notes__title" type="text" value={title} placeholder={title} onChange={titleChanged} onBlur={blur} />
                <textarea className="notes__body" value={body} onChange={bodyChanged} onBlur={blur}></textarea>
            </div>}
            <Modal title="确认" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
                <p>确认修改笔记吗？</p>
            </Modal>
        </div>
    )
}

export default EditorPanel