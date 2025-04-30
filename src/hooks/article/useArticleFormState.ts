
import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import { categoryOptions } from "@/data/categoryOptions";

interface UseArticleFormStateProps {
  articleToEdit?: Article | null;
}

export function useArticleFormState({ articleToEdit = null }: UseArticleFormStateProps) {
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

  // Helper function to generate slug from title
  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    
    setFormData(prev => ({ ...prev, slug }));
  };

  // Handler for category changes to update subcategories
  const handleCategoryChange = (category: string) => {
    const selectedCategory = categoryOptions.find(cat => cat.value === category);
    setFormData(prev => ({ ...prev, category, subcategory: "" }));
    setSubcategories(selectedCategory?.subcategories || []);
  };

  return {
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
  };
}
