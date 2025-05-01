
import React, { memo } from 'react';
import { EditorContent as TiptapEditorContent, Editor } from '@tiptap/react';

interface EditorContentProps {
  editor: Editor;
  disabled?: boolean;
}

export const EditorContent = memo(({ editor, disabled = false }: EditorContentProps) => {
  return (
    <TiptapEditorContent 
      editor={editor} 
      className={`p-4 min-h-[300px] prose dark:prose-invert max-w-none ${disabled ? 'opacity-70 cursor-not-allowed bg-muted/50' : 'focus:outline-none'}`} 
    />
  );
});

EditorContent.displayName = 'EditorContent';
