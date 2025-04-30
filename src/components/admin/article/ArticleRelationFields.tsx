
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArticleAuthor, ArticleImage, ArticleTag } from '@/types/article';

interface ArticleRelationFieldsProps {
  selectedAuthor: string;
  selectedImage: string;
  selectedTags: string[];
  isPremium: boolean;
  authors: ArticleAuthor[];
  images: ArticleImage[];
  tags: ArticleTag[];
  isLoading: boolean;
  onAuthorChange: (authorId: string) => void;
  onImageChange: (imageId: string) => void;
  onTagsChange: (tagId: string, checked: boolean) => void;
  onPremiumChange: (isPremium: boolean) => void;
}

export const ArticleRelationFields = ({
  selectedAuthor,
  selectedImage,
  selectedTags,
  isPremium,
  authors,
  images,
  tags,
  isLoading,
  onAuthorChange,
  onImageChange,
  onTagsChange,
  onPremiumChange
}: ArticleRelationFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label>Author*</Label>
        <Select 
          value={selectedAuthor} 
          onValueChange={onAuthorChange}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an author" />
          </SelectTrigger>
          <SelectContent>
            {authors.map((author) => (
              <SelectItem key={author.id} value={author.id}>
                {author.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Featured Image*</Label>
        <Select 
          value={selectedImage} 
          onValueChange={onImageChange}
          disabled={isLoading || images.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder={images.length === 0 ? "No images available - upload one first" : "Select a featured image"} />
          </SelectTrigger>
          <SelectContent>
            {images.map((image) => (
              <SelectItem key={image.id} value={image.id}>
                {image.alt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="grid grid-cols-2 gap-2">
          {tags.map((tag) => (
            <div key={tag.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`tag-${tag.id}`}
                checked={selectedTags.includes(tag.id)}
                onCheckedChange={(checked) => {
                  onTagsChange(tag.id, !!checked);
                }}
                disabled={isLoading}
              />
              <Label htmlFor={`tag-${tag.id}`}>{tag.name}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="is_premium"
          checked={isPremium}
          onCheckedChange={(checked) => {
            onPremiumChange(!!checked);
          }}
          disabled={isLoading}
        />
        <Label htmlFor="is_premium">Premium Content</Label>
      </div>
    </>
  );
};
