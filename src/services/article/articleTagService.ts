
import { supabase } from "@/integrations/supabase/client";
import { ArticleTag } from "@/types/article";

class ArticleTagService {
  async getAllTags(): Promise<ArticleTag[]> {
    const { data, error } = await supabase
      .from('article_tags')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching tags:', error);
      return [];
    }

    return data;
  }

  async createTag(tag: Omit<ArticleTag, 'id'>): Promise<ArticleTag | null> {
    const { data, error } = await supabase
      .from('article_tags')
      .insert(tag)
      .select()
      .single();

    if (error) {
      console.error('Error creating tag:', error);
      return null;
    }

    return data;
  }

  async addTagToArticle(articleId: string, tagId: string): Promise<boolean> {
    const { error } = await supabase
      .from('articles_to_tags')
      .insert({
        article_id: articleId,
        tag_id: tagId
      });

    if (error) {
      console.error('Error adding tag to article:', error);
      return false;
    }

    return true;
  }
}

export const articleTagService = new ArticleTagService();
