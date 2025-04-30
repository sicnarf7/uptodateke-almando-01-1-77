
import { supabase } from "@/integrations/supabase/client";
import { ArticleAuthor } from "@/types/article";

class ArticleAuthorService {
  async getAllAuthors(): Promise<ArticleAuthor[]> {
    const { data, error } = await supabase
      .from('article_authors')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching authors:', error);
      return [];
    }

    return data;
  }

  async getAuthorById(id: string): Promise<ArticleAuthor | null> {
    const { data, error } = await supabase
      .from('article_authors')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching author:', error);
      return null;
    }

    return data;
  }

  async createAuthor(author: Omit<ArticleAuthor, 'id'>): Promise<ArticleAuthor | null> {
    const { data, error } = await supabase
      .from('article_authors')
      .insert(author)
      .select()
      .single();

    if (error) {
      console.error('Error creating author:', error);
      return null;
    }

    return data;
  }
}

export const articleAuthorService = new ArticleAuthorService();
