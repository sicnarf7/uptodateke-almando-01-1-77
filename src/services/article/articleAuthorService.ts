
import { supabase, getTypedTable } from "@/integrations/supabase/client";
import { ArticleAuthor } from "@/types/article";

class ArticleAuthorService {
  async getAllAuthors(): Promise<ArticleAuthor[]> {
    try {
      console.log("Fetching all authors...");
      const { data, error } = await getTypedTable('article_authors')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching authors:', error);
        return [];
      }

      console.log(`Successfully fetched ${data?.length || 0} authors`);
      return data || [];
    } catch (error) {
      console.error('Exception when fetching authors:', error);
      return [];
    }
  }

  async getAuthorById(id: string): Promise<ArticleAuthor | null> {
    try {
      console.log(`Fetching author with ID: ${id}`);
      const { data, error } = await getTypedTable('article_authors')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching author:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Exception when fetching author by ID:', error);
      return null;
    }
  }

  async createAuthor(author: Omit<ArticleAuthor, 'id'>): Promise<ArticleAuthor | null> {
    try {
      console.log("Creating new author:", author);
      
      // Validate required fields
      if (!author.name || !author.image_url) {
        console.error("Missing required fields for author creation");
        return null;
      }
      
      const { data, error } = await getTypedTable('article_authors')
        .insert(author)
        .select()
        .single();

      if (error) {
        console.error('Error creating author:', error);
        return null;
      }

      console.log("Author created successfully:", data);
      return data;
    } catch (error) {
      console.error('Exception when creating author:', error);
      return null;
    }
  }
}

export const articleAuthorService = new ArticleAuthorService();
