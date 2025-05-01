
import React, { useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import { EditorToolbar } from './editor/EditorToolbar';
import { EditorContent } from './editor/EditorContent';
import { getEditorExtensions } from './editor/EditorExtensions';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  disabled?: boolean;
}

export const RichTextEditor = ({ content, onChange, disabled = false }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: getEditorExtensions(),
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editable: !disabled,
  });
  
  // Update editor content when the content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md">
      <EditorToolbar editor={editor} disabled={disabled} />
      <EditorContent editor={editor} disabled={disabled} />
    </div>
  );
};
