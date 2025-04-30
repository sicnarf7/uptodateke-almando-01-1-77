
import { Card, CardContent } from "@/components/ui/card";
import { Article, ArticleAuthor, ArticleTag, ArticleImage } from "@/types/article";
import { ArticleFormHeader } from "./article/ArticleFormHeader";
import { ArticleMetaFields } from "./article/ArticleMetaFields";
import { ArticleContentFields } from "./article/ArticleContentFields";
import { ArticleRelationFields } from "./article/ArticleRelationFields";
import { ArticleActions } from "./article/ArticleActions";
import { useArticleForm } from "@/hooks/useArticleForm";
import { categoryOptions } from "@/data/categoryOptions";

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
  const {
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
    setSelectedAuthor,
    setSelectedImage
  } = useArticleForm({
    articleToEdit,
    onSuccess,
    setIsLoading
  });

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
