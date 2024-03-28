// import React from 'react';

// type Props = object
// props: Props
import { useContext } from "react";
import { NotesDispatchContext, ActiveNoteDispatchContext } from "../context/NotesContext";

import PreviewPanel from "./PreviewPanel";

import { saveAs } from 'file-saver';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { Note } from "../type/Note";


const Navbar = () => {

    const dispatch = useContext(NotesDispatchContext);
    const activeNoteDispatch = useContext(ActiveNoteDispatchContext);

    function addNewNote() {
        const action = {
            id: Math.floor(Math.random() * 1000000),
            type: 'added',
            title: "新建笔记",
            body: "开始记录...",
            updated: new Date().toISOString()
        }
        dispatch && dispatch(action);

        const activeNoteAction = {
            ...action,
            type: "changed"
        }
        activeNoteDispatch && activeNoteDispatch(activeNoteAction);
    }

    function exportNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        const columnArr = ["id", "title", "body", "updated"];
        let str = columnArr.join(',');
        // 通过循环拿出data数据源里的数据，并塞到str中
        for (const item of notes) {
            str += '\n ';
            for (const item1 of columnArr) {
                str += `${(typeof item[item1] === 'string' && item[item1].replace(/[\n\r\s\t,]/g, ' ')) || item[item1]},`;
            }
        }
        // Excel打开后中文乱码添加如下字符串解决
        const exportContent = '\uFEFF';
        const blob = new Blob([exportContent + str], {
            type: 'text/plain;charset=utf-8',
        });
        saveAs(blob, `demo.csv`, true);
    }

    const props: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                // read csv File
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target?.result;
                    const arr = data?.toString().split("\n") || [];

                    const result: Note[] = [];

                    for (let i = 1; i < arr.length; i++) {
                        const tempNoteArr = arr[i].split(",") || [];
                        result.push({
                            id: Number(tempNoteArr[0]),
                            title: tempNoteArr[1],
                            body: tempNoteArr[2],
                            updated: tempNoteArr[3],
                        })
                    }

                    const action = {
                        type: 'import',
                        id: 0,
                        title: "",
                        body: "",
                        updated: "",
                        notes: result
                    }
                    dispatch && dispatch(action);
            
                    const activeNoteAction = {
                        ...result[0],
                        type: "changed"
                    }
                    activeNoteDispatch && activeNoteDispatch(activeNoteAction);
                }
                reader.readAsText(info.file.originFileObj as Blob);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div>
            <div className="notes__sidebar">
                <div style={{ display: "flex", marginBottom: "1em" }}>
                    <Upload {...props} accept=".csv">
                        <Button>导入</Button>
                    </Upload>

                    <Button onClick={exportNotes} style={{marginLeft: "1em"}}>导出</Button>
                </div>
                <button className="notes__add" type="button" onClick={addNewNote}>添加新的笔记 📒</button>
                <PreviewPanel />
            </div>
        </div>

    )
}

export default Navbar