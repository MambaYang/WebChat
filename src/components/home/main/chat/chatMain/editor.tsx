import { Editor } from "react-draft-wysiwyg"
import { EditorState } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import MyIcon from "../../../../../assets/MyIcon"
import { Modal } from "antd"
import { useRef, useState } from "react"

export default function MyEditor() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    )
    const editorRef = useRef(null)
    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        console.log(editorRef)

        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const onEditorStateChange = (value) => {
        // console.log(editorState)
        setEditorState(value)
    }

    return (
        <>
            <MyIcon
                type="icon-editor"
                style={{ fontSize: "32px" }}
                onClick={showModal}
            />
            <Modal
                title="富文本编辑器"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                    ref={editorRef}
                />
            </Modal>
        </>
    )
}
