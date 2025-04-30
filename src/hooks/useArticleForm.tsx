
import { Article } from "@/types/article";
import { useArticleFormState } from "./article/useArticleFormState";
import { useArticleOperations } from "./article/useArticleOperations";

interface UseArticleFormProps {
  articleToEdit?: Article | null;
  onSuccess: () => void;
  setIsLoading: (loading: boolean) => void;
}

export function useArticleForm({ 
  articleToEdit = null, 
  onSuccess,
  setIsLoading
}: UseArticleFormProps) {
  // Get form state management
  const {
    formData,
    setFormData,
    selectedTags,
    setSelectedTags,
    selectedAuthor,
    setSelectedAuthor,
    selectedImage,
    setSelectedImage,
    subcategories,
    generateSlug,
    handleCategoryChange
  } = useArticleFormState({ articleToEdit });
  
  // Get article operations
  const {
    handleSubmit,
    handleDeleteArticle,
    handleTagChange: handleTagOperation
  } = useArticleOperations({
    articleToEdit,
    onSuccess,
    setIsLoading,
    formData,
    selectedTags,
    selectedAuthor,
    selectedImage
  });

  // Handle tag selection/deselection
  const handleTagChange = (tagId: string, checked: boolean) => {
    if (checked) {
      setSelectedTags(prev => [...prev, tagId]);
    } else {
      setSelectedTags(prev => prev.filter(id => id !== tagId));
    }
  };

  return {
    formData,
    selectedTags,
    selectedAuthor,
    selectedImage,
    subcategories,
    handleSubmit,
    handleDeleteArticle,
    handleCategoryChange,
    handleTagChange,
    generateSlug,
    setFormData,
    setSelectedTags,
    setSelectedAuthor,
    setSelectedImage
  };
}
