
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import HeadingExtension from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import GapCursor from '@tiptap/extension-gapcursor';

export const getEditorExtensions = () => [
  StarterKit.configure({
    gapcursor: false, // Disable the gapcursor from StarterKit to avoid duplicate
  }),
  LinkExtension.configure({
    openOnClick: false,
    linkOnPaste: true,
  }),
  HeadingExtension.configure({
    levels: [1, 2, 3],
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  GapCursor, // Add the GapCursor extension separately
];
