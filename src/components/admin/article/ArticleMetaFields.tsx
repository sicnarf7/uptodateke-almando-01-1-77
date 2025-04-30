
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CategoryOption } from '@/types/article';

interface ArticleMetaFieldsProps {
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  subcategories: { value: string; label: string }[];
  categoryOptions: CategoryOption[];
  isLoading: boolean;
  onTitleChange: (title: string) => void;
  onSlugChange: (slug: string) => void;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
  isEditMode: boolean;
}

export const ArticleMetaFields = ({
  title,
  slug,
  category,
  subcategory,
  subcategories,
  categoryOptions,
  isLoading,
  onTitleChange,
  onSlugChange,
  onCategoryChange,
  onSubcategoryChange,
  isEditMode,
}: ArticleMetaFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title*</Label>
        <Input 
          id="title" 
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="slug">Slug*</Label>
        <Input 
          id="slug" 
          value={slug}
          onChange={(e) => onSlugChange(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category*</Label>
          <Select 
            value={category}
            onValueChange={onCategoryChange}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subcategory">Subcategory</Label>
          <Select 
            value={subcategory}
            onValueChange={onSubcategoryChange}
            disabled={isLoading || subcategories.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder={subcategories.length === 0 ? "Select a category first" : "Select subcategory"} />
            </SelectTrigger>
            <SelectContent>
              {subcategories.map((subcategory) => (
                <SelectItem key={subcategory.value} value={subcategory.value}>
                  {subcategory.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
