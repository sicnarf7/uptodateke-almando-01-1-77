
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import { toast } from "sonner";

interface UseArticleOperationsProps {
  articleToEdit?: Article | null;
  onSuccess: () => void;
  setIsLoading: (loading: boolean) => void;
  formData: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    subcategory: string;
    is_premium: boolean;
    status: "draft" | "published";
  };
  selectedTags: string[];
  selectedAuthor: string;
  selectedImage: string;
}

export function useArticleOperations({
  articleToEdit,
  onSuccess,
  setIsLoading,
  formData,
  selectedTags,
  selectedAuthor,
  selectedImage
}: UseArticleOperationsProps) {
  // Submit form handler
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
      const publishedAt = publish ? new Date().toISOString() : articleToEdit?.published_at || null;
      
      // Remove the subcategory field if it's empty to avoid database errors
      const articleData = {
        ...formData,
        status,
        published_at: publishedAt,
        author_id: selectedAuthor,
        featured_image_id: selectedImage,
        view_count: articleToEdit ? articleToEdit.view_count : 0,
      };

      // Only include subcategory if it has a value
      if (formData.subcategory) {
        Object.assign(articleData, { subcategory: formData.subcategory });
      }
      
      let updatedArticle: Article | null = null;
      
      if (articleToEdit) {
        // Update existing article
        const updateSuccess = await articleService.updateArticle(articleToEdit.id, articleData);
        
        if (updateSuccess) {
          // If update was successful, use the articleToEdit as base with updated data
          updatedArticle = { ...articleToEdit, ...articleData };
          
          // Clear existing tags first
          await articleService.clearTagsForArticle(articleToEdit.id);
        }
      } else {
        // Create new article
        updatedArticle = await articleService.createArticle(articleData as Omit<Article, 'id'>);
      }
      
      if (updatedArticle) {
        // Add selected tags
        for (const tagId of selectedTags) {
          await articleService.addTagToArticle(updatedArticle.id, tagId);
        }
        
        toast.success(`Article ${articleToEdit ? 'updated' : 'created'} successfully`);
        onSuccess();
      }
    } catch (error) {
      console.error(`Error ${articleToEdit ? 'updating' : 'creating'} article:`, error);
      toast.error(`Failed to ${articleToEdit ? 'update' : 'create'} article: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete article handler
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

  return {
    handleSubmit,
    handleDeleteArticle
  };
}
