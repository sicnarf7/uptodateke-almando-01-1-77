
import { supabase, getTypedTable } from "@/integrations/supabase/client";
import { ArticleTag } from "@/types/article";

class ArticleTagService {
  async getAllTags(): Promise<ArticleTag[]> {
    try {
      console.log("Fetching all tags...");
      const { data, error } = await getTypedTable('article_tags')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching tags:', error);
        return [];
      }

      console.log(`Successfully fetched ${data?.length || 0} tags`);
      return data || [];
    } catch (error) {
      console.error('Exception when fetching tags:', error);
      return [];
    }
  }

  async createTag(tag: Omit<ArticleTag, 'id'>): Promise<ArticleTag | null> {
    try {
      console.log("Creating new tag:", tag);
      
      // Validate required fields
      if (!tag.name || !tag.slug) {
        console.error("Missing required fields for tag creation");
        return null;
      }
      
      const { data, error } = await getTypedTable('article_tags')
        .insert(tag)
        .select()
        .single();

      if (error) {
        console.error('Error creating tag:', error);
        return null;
      }

      console.log("Tag created successfully:", data);
      return data;
    } catch (error) {
      console.error('Exception when creating tag:', error);
      return null;
    }
  }

  async addTagToArticle(articleId: string, tagId: string): Promise<boolean> {
    try {
      console.log(`Adding tag ${tagId} to article ${articleId}`);
      const { error } = await getTypedTable('articles_to_tags')
        .insert({
          article_id: articleId,
          tag_id: tagId
        });

      if (error) {
        console.error('Error adding tag to article:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Exception when adding tag to article:', error);
      return false;
    }
  }

  async getTagsForArticle(articleId: string): Promise<ArticleTag[]> {
    try {
      console.log(`Fetching tags for article ${articleId}`);
      const { data, error } = await getTypedTable('articles_to_tags')
        .select('tag_id, article_tags(*)')
        .eq('article_id', articleId);

      if (error) {
        console.error('Error fetching tags for article:', error);
        return [];
      }

      return data.map(item => item.article_tags) as ArticleTag[];
    } catch (error) {
      console.error('Exception when fetching tags for article:', error);
      return [];
    }
  }

  async clearTagsForArticle(articleId: string): Promise<boolean> {
    try {
      console.log(`Clearing tags for article ${articleId}`);
      const { error } = await getTypedTable('articles_to_tags')
        .delete()
        .eq('article_id', articleId);

      if (error) {
        console.error('Error clearing tags for article:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Exception when clearing tags for article:', error);
      return false;
    }
  }

  async deleteTagFromArticle(articleId: string, tagId: string): Promise<boolean> {
    try {
      console.log(`Removing tag ${tagId} from article ${articleId}`);
      const { error } = await getTypedTable('articles_to_tags')
        .delete()
        .eq('article_id', articleId)
        .eq('tag_id', tagId);

      if (error) {
        console.error('Error removing tag from article:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Exception when removing tag from article:', error);
      return false;
    }
  }
}

export const articleTagService = new ArticleTagService();
