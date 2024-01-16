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
import EditorToolbar from "./EditorToolbar";
import { useNotes } from "@/lib/NotesProvider";
import NoteEditorMenuBar from "./NoteEditorMenuBar";
import { useSWRConfig } from "swr";
import { deleteNote, saveNote } from "@/lib/services";
import { useToast } from "@/components/ui/use-toast";

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
  const { selectedFolderId, data, setSelectedNote, isLoading, selectedNote } =
    useNotes();
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(emptyContentState)
  );
  const { mutate } = useSWRConfig();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading) {
      setName(data?.name ?? "New Note");
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromText(data?.content ?? "")
        )
      );
    }
  }, [data, isLoading]);

  const toggleStyle = (type) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, type));
  };

  const handleSaveNote = async () => {
    const newNote = {
      ...data,
      name,
      content,
      folderId: selectedFolderId,
    };

    await saveNote(newNote, data?.id);
    mutate(`notes-${selectedFolderId}`);
    setSelectedNote(newNote);

    if (data?.id) {
      toast({
        title: "Note Update",
        description: `${newNote.name} has been updated`,
      });
    } else {
      toast({
        title: "Note Created",
        description: `${newNote.name} has been created`,
      });
    }
  };

  const handleDeleteNote = async () => {
    await deleteNote(selectedNote);
    mutate(`notes-${selectedFolderId}`);
    toast({
      title: "Note Deleted",
      variant: "destructive",
      description: `${selectedNote.name} has been deleted`,
    });
  };

  return (
    <>
      <NoteEditorMenuBar
        name={name}
        setName={setName}
        handleSaveNote={handleSaveNote}
        setShowSidebar={setShowSidebar}
        handleDeleteNote={handleDeleteNote}
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
