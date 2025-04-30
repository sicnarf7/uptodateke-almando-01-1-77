
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import HeadingExtension from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';

export const getEditorExtensions = () => [
  StarterKit,
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
];
