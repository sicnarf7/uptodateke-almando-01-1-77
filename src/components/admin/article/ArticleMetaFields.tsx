
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CategoryOption } from '@/types/article';
import { Badge } from '@/components/ui/badge';

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
  
  // Auto-generate slug from title (only if not in edit mode)
  useEffect(() => {
    if (!isEditMode && title && !slug) {
      const generatedSlug = title.toLowerCase()
        .replace(/[^\w\s]/gi, '')  // Remove special chars
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .substring(0, 60);         // Limit length
      
      onSlugChange(generatedSlug);
    }
  }, [title, isEditMode, slug, onSlugChange]);

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title*</Label>
        <Input 
          id="title" 
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter article title"
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="slug">Slug* <span className="text-xs text-muted-foreground">(URL-friendly version of title)</span></Label>
        <Input 
          id="slug" 
          value={slug}
          onChange={(e) => onSlugChange(e.target.value)}
          placeholder="article-url-slug"
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
            <SelectContent className="max-h-[300px]">
              {categoryOptions.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            The category is used for navigation and will create a page at /news/[category]
          </p>
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
            <SelectContent className="max-h-[300px]">
              {subcategories.map((subcategory) => (
                <SelectItem key={subcategory.value} value={subcategory.value}>
                  {subcategory.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            The subcategory is used for more specific navigation and creates a page at /news/[category]/[subcategory]
          </p>
        </div>
      </div>

      {category && (
        <div className="p-3 bg-muted/30 rounded-md mt-2">
          <p className="text-sm mb-2">URL Preview:</p>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-primary">
              /news/{category.toLowerCase()}{subcategory ? `/${subcategory.toLowerCase()}` : ''}
            </Badge>
          </div>
        </div>
      )}
    </>
  );
};
