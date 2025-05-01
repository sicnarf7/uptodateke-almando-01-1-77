
import React, { useEffect } from 'react';
import { useEditor, EditorContent as TiptapEditorContent } from '@tiptap/react';
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
    content: content || '<p></p>', // Ensure we always have valid content
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      onChange(newContent);
    },
    editable: !disabled,
  });
  
  // Update editor content when the content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      // Only update content if it's different to prevent cursor jumping
      editor.commands.setContent(content || '<p></p>');
    }
  }, [content, editor]);

  // Add another effect to ensure editor is updated when disabled state changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

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
