
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

  async getTagsForArticle(articleId: string): Promise<ArticleTag[]> {
    const { data, error } = await supabase
      .from('articles_to_tags')
      .select('tag_id, article_tags(*)')
      .eq('article_id', articleId);

    if (error) {
      console.error('Error fetching tags for article:', error);
      return [];
    }

    return data.map(item => item.article_tags) as ArticleTag[];
  }

  async clearTagsForArticle(articleId: string): Promise<boolean> {
    const { error } = await supabase
      .from('articles_to_tags')
      .delete()
      .eq('article_id', articleId);

    if (error) {
      console.error('Error clearing tags for article:', error);
      return false;
    }
    
    return true;
  }

  async deleteTagFromArticle(articleId: string, tagId: string): Promise<boolean> {
    const { error } = await supabase
      .from('articles_to_tags')
      .delete()
      .eq('article_id', articleId)
      .eq('tag_id', tagId);

    if (error) {
      console.error('Error removing tag from article:', error);
      return false;
    }

    return true;
  }
}

export const articleTagService = new ArticleTagService();
