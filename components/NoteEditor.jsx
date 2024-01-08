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
import { AlignJustify, Trash } from "lucide-react";
import EditorToolbar from "./EditorToolbar";

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
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(emptyContentState)
  );

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(""))
    );
  }, []);

  const onChange = (e) => {
    // console.log(e);
  };

  const toggleStyle = (type) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, type));
  };

  return (
    <>
      <div className="border-b p-5 lg:border-0 dark:border-gray-500 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlignJustify
            onClick={() => setShowSidebar(true)}
            className="lg:hidden"
          />
          <p className="font-semibold text-lg">Note Title</p>
        </div>
        <Trash size={20} className="cursor-pointer" />
      </div>
      <EditorToolbar onEditorChange={toggleStyle} />
      <div className="px-5 mt-1">
        <Editor
          editorKey="Note"
          editorState={editorState}
          onChange={(editorState) => {
            setEditorState(editorState);
            onChange(editorState.getCurrentContent().getPlainText());
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
