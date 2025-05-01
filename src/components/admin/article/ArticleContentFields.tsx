
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
  // This console log helps us debug what content is coming in
  console.log('Content passed to ArticleContentFields:', content);
  
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt*</Label>
        <Textarea 
          id="excerpt" 
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content*</Label>
        <RichTextEditor
          content={content}
          onChange={(newContent) => {
            console.log('RichTextEditor onChange called with:', newContent);
            onContentChange(newContent);
          }}
          disabled={isLoading}
        />
      </div>
    </>
  );
};
