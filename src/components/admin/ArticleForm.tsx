
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Article, ArticleAuthor, ArticleTag, ArticleImage, CategoryOption } from "@/types/article";
import { toast } from "sonner";
import { articleService } from "@/services/articleService";
import { Loader2, Save, Trash2 } from "lucide-react";
import { categoryOptions } from "@/data/categoryOptions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ArticleFormProps {
  authors: ArticleAuthor[];
  tags: ArticleTag[];
  images: ArticleImage[];
  onSuccess: () => void;
  isLoading?: boolean;
  setIsLoading?: (loading: boolean) => void;
  articleToEdit?: Article | null;
}

export const ArticleForm = ({ 
  authors, 
  tags, 
  images, 
  onSuccess,
  isLoading = false,
  setIsLoading = () => {},
  articleToEdit = null
}: ArticleFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    subcategory: "",
    is_premium: false,
    status: "draft" as "draft" | "published"
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [subcategories, setSubcategories] = useState<{value: string, label: string}[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Load article data for editing
  useEffect(() => {
    if (articleToEdit) {
      setFormData({
        title: articleToEdit.title || "",
        slug: articleToEdit.slug || "",
        excerpt: articleToEdit.excerpt || "",
        content: articleToEdit.content || "",
        category: articleToEdit.category || "",
        subcategory: articleToEdit.subcategory || "",
        is_premium: articleToEdit.is_premium || false,
        status: articleToEdit.status as "draft" | "published" || "draft"
      });
      
      setSelectedAuthor(articleToEdit.author_id || "");
      setSelectedImage(articleToEdit.featured_image_id || "");
      
      // Load tags if available
      if (articleToEdit.tags && articleToEdit.tags.length > 0) {
        setSelectedTags(articleToEdit.tags.map(tag => tag.id));
      }
      
      // Update subcategories based on selected category
      const category = categoryOptions.find(cat => cat.value === articleToEdit.category);
      if (category) {
        setSubcategories(category.subcategories);
      }
    }
  }, [articleToEdit]);

  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.excerpt || 
        !formData.content || !formData.category || !selectedAuthor || !selectedImage) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const status = publish ? "published" : "draft";
      const publishedAt = publish ? new Date().toISOString() : null;
      
      const articleData = {
        ...formData,
        status,
        published_at: publishedAt,
        author_id: selectedAuthor,
        featured_image_id: selectedImage,
        view_count: articleToEdit ? articleToEdit.view_count : 0,
        subcategory: formData.subcategory || undefined
      } as Partial<Article>;
      
      let updatedArticle: Article;
      
      if (articleToEdit) {
        // Update existing article
        updatedArticle = await articleService.updateArticle(articleToEdit.id, articleData);
        
        // Update tags (remove all and add selected ones)
        if (articleToEdit.tags) {
          for (const tag of articleToEdit.tags) {
            await articleService.removeTagFromArticle(articleToEdit.id, tag.id);
          }
        }
      } else {
        // Create new article
        updatedArticle = await articleService.createArticle(articleData as Omit<Article, 'id'>);
      }
      
      // Add selected tags
      for (const tagId of selectedTags) {
        await articleService.addTagToArticle(updatedArticle.id, tagId);
      }
      
      toast.success(`Article ${articleToEdit ? 'updated' : 'created'} successfully`);
      
      if (!articleToEdit) {
        // Reset form only when creating a new article
        setFormData({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category: "",
          subcategory: "",
          is_premium: false,
          status: "draft"
        });
        setSelectedTags([]);
        setSelectedAuthor("");
        setSelectedImage("");
        setSubcategories([]);
      }
      
      onSuccess();
    } catch (error) {
      console.error(`Error ${articleToEdit ? 'updating' : 'creating'} article:`, error);
      toast.error(`Failed to ${articleToEdit ? 'update' : 'create'} article: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteArticle = async () => {
    if (!articleToEdit) return;
    
    try {
      setIsLoading(true);
      await articleService.deleteArticle(articleToEdit.id);
      toast.success("Article deleted successfully");
      onSuccess();
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error(`Failed to delete article: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleCategoryChange = (category: string) => {
    const selectedCategory = categoryOptions.find(cat => cat.value === category);
    setFormData(prev => ({ ...prev, category, subcategory: "" }));
    setSubcategories(selectedCategory?.subcategories || []);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{articleToEdit ? 'Edit Article' : 'Create New Article'}</CardTitle>
        <CardDescription>{articleToEdit ? 'Update the article details' : 'Fill out the form to create a new article'}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title*</Label>
            <Input 
              id="title" 
              value={formData.title}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, title: e.target.value }));
                if (!articleToEdit) {
                  generateSlug(e.target.value);
                }
              }}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Slug*</Label>
            <Input 
              id="slug" 
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select 
                value={formData.category}
                onValueChange={handleCategoryChange}
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
                value={formData.subcategory}
                onValueChange={(value) => setFormData(prev => ({ ...prev, subcategory: value }))}
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
          
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt*</Label>
            <Textarea 
              id="excerpt" 
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content*</Label>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData(prev => ({ ...prev, content }))}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Author*</Label>
            <Select 
              value={selectedAuthor} 
              onValueChange={setSelectedAuthor}
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
              onValueChange={setSelectedImage}
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
                      if (checked) {
                        setSelectedTags(prev => [...prev, tag.id]);
                      } else {
                        setSelectedTags(prev => prev.filter(id => id !== tag.id));
                      }
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
              checked={formData.is_premium}
              onCheckedChange={(checked) => {
                setFormData(prev => ({ ...prev, is_premium: checked as boolean }));
              }}
              disabled={isLoading}
            />
            <Label htmlFor="is_premium">Premium Content</Label>
          </div>
          
          <div className="flex gap-4">
            {articleToEdit && (
              <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button 
                    type="button" 
                    variant="destructive"
                    size="icon"
                    className="mr-auto"
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the article.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteArticle} className="bg-destructive text-destructive-foreground">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            
            <Button 
              type="submit" 
              variant="outline"
              className="flex-1"
              onClick={(e) => handleSubmit(e, false)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {articleToEdit ? 'Update Draft' : 'Save as Draft'}
                </>
              )}
            </Button>
            <Button 
              type="submit"
              className="flex-1"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                articleToEdit ? 'Update & Publish' : 'Publish'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
