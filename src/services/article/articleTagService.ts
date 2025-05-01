
import { supabase, getTypedTable } from "@/integrations/supabase/client";
import { ArticleTag } from "@/types/article";
import { toast } from "sonner";

class ArticleTagService {
  async getAllTags(): Promise<ArticleTag[]> {
    try {
      console.log("Fetching all tags...");
      const { data, error } = await getTypedTable('article_tags')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching tags:', error);
        toast.error('Could not load tags: ' + error.message);
        return [];
      }

      console.log(`Successfully fetched ${data?.length || 0} tags`);
      return data || [];
    } catch (error) {
      console.error('Exception when fetching tags:', error);
      toast.error('Failed to fetch tags');
      return [];
    }
  }

  async createTag(tag: Omit<ArticleTag, 'id'>): Promise<ArticleTag | null> {
    try {
      console.log("Creating new tag:", tag);
      
      // Validate required fields
      if (!tag.name || !tag.slug) {
        console.error("Missing required fields for tag creation");
        toast.error("Please fill all required fields");
        return null;
      }
      
      const { data, error } = await getTypedTable('article_tags')
        .insert(tag)
        .select()
        .single();

      if (error) {
        console.error('Error creating tag:', error);
        toast.error(`Failed to create tag: ${error.message}`);
        return null;
      }

      console.log("Tag created successfully:", data);
      toast.success("Tag created successfully");
      return data;
    } catch (error) {
      console.error('Exception when creating tag:', error);
      toast.error(`Failed to create tag: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
        toast.error(`Failed to add tag to article: ${error.message}`);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Exception when adding tag to article:', error);
      toast.error(`Failed to add tag: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
        toast.error(`Failed to fetch tags: ${error.message}`);
        return [];
      }

      return data.map(item => item.article_tags) as ArticleTag[];
    } catch (error) {
      console.error('Exception when fetching tags for article:', error);
      toast.error('Failed to fetch article tags');
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
        toast.error(`Failed to clear tags: ${error.message}`);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Exception when clearing tags for article:', error);
      toast.error(`Failed to clear tags: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
        toast.error(`Failed to remove tag: ${error.message}`);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Exception when removing tag from article:', error);
      toast.error(`Failed to remove tag: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    }
  }
}

export const articleTagService = new ArticleTagService();
