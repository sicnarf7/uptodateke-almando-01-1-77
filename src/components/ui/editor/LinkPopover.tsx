
import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { LinkIcon } from 'lucide-react';
import { Button } from '../button';
import { Input } from '../input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface LinkPopoverProps {
  editor: Editor;
  disabled?: boolean;
}

export const LinkPopover = ({ editor, disabled = false }: LinkPopoverProps) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);

  const setLink = () => {
    if (!linkUrl) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // If no protocol is specified, add https://
    const url = linkUrl.match(/^https?:\/\//) ? linkUrl : `https://${linkUrl}`;

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    setLinkUrl('');
    setPopoverOpen(false);
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={editor.isActive('link') ? 'bg-accent' : ''}
          disabled={disabled}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col space-y-2">
          <Input 
            placeholder="Enter URL" 
            value={linkUrl} 
            onChange={(e) => setLinkUrl(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setLink();
              }
            }}
          />
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setPopoverOpen(false)}
              size="sm"
            >
              Cancel
            </Button>
            <Button onClick={setLink} size="sm">Add Link</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
