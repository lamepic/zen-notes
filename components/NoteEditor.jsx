"use client";
import React, { useEffect, useState } from "react";
import {
  ContentState,
  Editor,
  EditorBlock,
  EditorState,
  RichUtils,
  convertFromRaw,
} from "draft-js";
import { AlignJustify, Save, Trash } from "lucide-react";
import EditorToolbar from "./EditorToolbar";
import { useNotes } from "@/lib/NotesProvider";
import NoteEditorMenuBar from "./NoteEditorMenuBar";
import { useSWRConfig } from "swr";
import { saveNote } from "@/lib/services";

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: "",
      key: "foo",
      type: "unstyled",
      entityRanges: [],
    },
  ],
});

const blockRendererFn = function (contentBlock) {
  const type = contentBlock.getType();
  switch (type) {
    default:
      return { component: Line, editable: true };
  }
};

function NoteEditor({ setShowSidebar }) {
  const { note } = useNotes();
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(emptyContentState)
  );
  const { mutate } = useSWRConfig();

  useEffect(() => {
    setName(note?.name ?? "Untitled");
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromText(note?.content ?? "")
      )
    );
  }, [note]);

  const toggleStyle = (type) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, type));
  };

  const handleSaveNote = async () => {
    const newNote = {
      ...note,
      name,
      content,
      folderId: note.folderId,
    };

    await saveNote(newNote, note.id);
    mutate(`notes-${note.folderId}`);
  };

  return (
    <>
      <NoteEditorMenuBar
        name={name}
        setName={setName}
        handleSaveNote={handleSaveNote}
      />
      <EditorToolbar onEditorChange={toggleStyle} />
      <div className="px-5 mt-1">
        <Editor
          editorKey="Note"
          editorState={editorState}
          onChange={(editorState) => {
            setEditorState(editorState);
            setContent(editorState.getCurrentContent().getPlainText());
          }}
          userSelect="none"
          contentEditable={true}
          blockRendererFn={blockRendererFn}
        />
      </div>
    </>
  );
}

export default NoteEditor;

const Line = (props) => {
  const blockMap = props.contentState.getBlockMap().toArray();
  const blockKey = props.block.key;
  const lineNumber = blockMap.findIndex((block) => blockKey === block.key) + 1;
  return (
    <div className="flex items-end">
      <span className="mr-5 text-sm text-gray-500" contentEditable={false}>
        {lineNumber}
      </span>
      <div style={{ flex: "1" }}>
        <EditorBlock {...props} />
      </div>
    </div>
  );
};
