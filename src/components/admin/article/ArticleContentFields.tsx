
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

interface ArticleContentFieldsProps {
  excerpt: string;
  content: string;
  isLoading: boolean;
  onExcerptChange: (excerpt: string) => void;
  onContentChange: (content: string) => void;
}

export const ArticleContentFields = ({
  excerpt,
  content,
  isLoading,
  onExcerptChange,
  onContentChange,
}: ArticleContentFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt*</Label>
        <Textarea 
          id="excerpt" 
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          placeholder="Write a short summary of your article"
          required
          disabled={isLoading}
          className="resize-y min-h-[100px]"
        />
        <p className="text-xs text-muted-foreground">
          A brief summary that will appear on article previews
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content*</Label>
        <div className="border rounded-md mb-1 bg-background">
          <RichTextEditor
            content={content}
            onChange={onContentChange}
            disabled={isLoading}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Use the toolbar to format your content with headings, lists, quotes, and more.
        </p>
      </div>
    </>
  );
};
