'use client';

import React, { useEffect, useRef } from 'react';

import debounce from 'lodash.debounce';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

import { useNote } from '@/providers/NoteProvider';

function NoteEditor() {
    const { selectedNote, updateSelectedNote } = useNote();
    const ref = useRef<any>(null);

    const handleSave = debounce((content) => {
        updateSelectedNote({ name: selectedNote.name, content });
    }, 1000);

    useEffect(() => {
        if (ref.current === null) {
            const editor = new EditorJS({
                holder: 'editorjs',
                placeholder: 'Let`s write something awesome',
                data: selectedNote?.content ? selectedNote.content : undefined,
                onChange: async () => {
                    let content = await editor.saver.save();
                    handleSave(content);
                },
                tools: {
                    header: Header,
                },
            });

            ref.current = editor;
        }

        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
                ref.current = null;
            }
        };
    }, [selectedNote]);

    return <div id="editorjs" className="min-h-[calc(100%-50px)]"></div>;
}

export default React.memo(NoteEditor);
