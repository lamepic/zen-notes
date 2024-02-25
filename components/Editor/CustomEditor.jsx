'use client';
import { useState } from 'react';
import { ContentState, Editor, EditorBlock, EditorState, RichUtils, convertFromRaw } from 'draft-js';
import EditorToolbar from '../EditorToolbar';

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: '',
      key: 'foo',
      type: 'unstyled',
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

function CustomEditor({ onEditorContentChange, noteContent }) {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(noteContent))
  );

  const toggleStyle = (type) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, type));
  };

  return (
    <div>
      <EditorToolbar onEditorChange={toggleStyle} />
      <div className="px-5 mt-1 w-full overflow-scroll mb-5 custom-editor ">
        <Editor
          editorKey="Note"
          editorState={editorState}
          onChange={(editorState) => {
            setEditorState(editorState);
            onEditorContentChange(editorState.getCurrentContent().getPlainText());
          }}
          userSelect="none"
          contentEditable={true}
          blockRendererFn={blockRendererFn}
        />
      </div>
    </div>
  );
}

export default CustomEditor;

const Line = (props) => {
  const blockMap = props.contentState.getBlockMap().toArray();
  const blockKey = props.block.key;
  const lineNumber = blockMap.findIndex((block) => blockKey === block.key) + 1;
  return (
    <div className="flex items-end">
      <span className="mr-5 text-sm text-gray-500" contentEditable={false}>
        {lineNumber}
      </span>
      <div style={{ flex: '1' }}>
        <EditorBlock {...props} />
      </div>
    </div>
  );
};
