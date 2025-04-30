
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Article, ArticleAuthor, ArticleTag, ArticleImage } from "@/types/article";
import { toast } from "sonner";
import { articleService } from "@/services/articleService";
import { categoryOptions } from "@/data/categoryOptions";
import { ArticleFormHeader } from "./article/ArticleFormHeader";
import { ArticleMetaFields } from "./article/ArticleMetaFields";
import { ArticleContentFields } from "./article/ArticleContentFields";
import { ArticleRelationFields } from "./article/ArticleRelationFields";
import { ArticleActions } from "./article/ArticleActions";

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
      };
      
      let updatedArticle: Article;
      
      if (articleToEdit) {
        // Update existing article
        updatedArticle = await articleService.updateArticle(articleToEdit.id, articleData);
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

  const handleTagChange = (tagId: string, checked: boolean) => {
    if (checked) {
      setSelectedTags(prev => [...prev, tagId]);
    } else {
      setSelectedTags(prev => prev.filter(id => id !== tagId));
    }
  };

  return (
    <Card>
      <ArticleFormHeader isEditing={!!articleToEdit} />
      
      <CardContent>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <ArticleMetaFields 
            title={formData.title}
            slug={formData.slug}
            category={formData.category}
            subcategory={formData.subcategory}
            subcategories={subcategories}
            categoryOptions={categoryOptions}
            isLoading={isLoading}
            onTitleChange={(title) => {
              setFormData(prev => ({ ...prev, title }));
              if (!articleToEdit) {
                generateSlug(title);
              }
            }}
            onSlugChange={(slug) => setFormData(prev => ({ ...prev, slug }))}
            onCategoryChange={handleCategoryChange}
            onSubcategoryChange={(subcategory) => setFormData(prev => ({ ...prev, subcategory }))}
            isEditMode={!!articleToEdit}
          />
          
          <ArticleContentFields 
            excerpt={formData.excerpt}
            content={formData.content}
            isLoading={isLoading}
            onExcerptChange={(excerpt) => setFormData(prev => ({ ...prev, excerpt }))}
            onContentChange={(content) => setFormData(prev => ({ ...prev, content }))}
          />
          
          <ArticleRelationFields 
            selectedAuthor={selectedAuthor}
            selectedImage={selectedImage}
            selectedTags={selectedTags}
            isPremium={formData.is_premium}
            authors={authors}
            images={images}
            tags={tags}
            isLoading={isLoading}
            onAuthorChange={setSelectedAuthor}
            onImageChange={setSelectedImage}
            onTagsChange={handleTagChange}
            onPremiumChange={(isPremium) => setFormData(prev => ({ ...prev, is_premium: isPremium }))}
          />
          
          <ArticleActions 
            isEditing={!!articleToEdit}
            isLoading={isLoading}
            onSaveDraft={(e) => handleSubmit(e, false)}
            onPublish={(e) => handleSubmit(e, true)}
            onDelete={articleToEdit ? handleDeleteArticle : undefined}
          />
        </form>
      </CardContent>
    </Card>
  );
};
