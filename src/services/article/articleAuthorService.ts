
import { supabase, getTypedTable } from "@/integrations/supabase/client";
import { ArticleAuthor } from "@/types/article";
import { toast } from "sonner";

class ArticleAuthorService {
  async getAllAuthors(): Promise<ArticleAuthor[]> {
    try {
      console.log("Fetching all authors...");
      const { data, error } = await getTypedTable('article_authors')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching authors:', error);
        toast.error('Could not load authors: ' + error.message);
        return [];
      }

      console.log(`Successfully fetched ${data?.length || 0} authors`);
      return data || [];
    } catch (error) {
      console.error('Exception when fetching authors:', error);
      toast.error('Failed to fetch authors');
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
        toast.error('Could not load author details');
        return null;
      }

      return data;
    } catch (error) {
      console.error('Exception when fetching author by ID:', error);
      toast.error('Failed to load author');
      return null;
    }
  }

  async createAuthor(author: Omit<ArticleAuthor, 'id'>): Promise<ArticleAuthor | null> {
    try {
      console.log("Creating new author:", author);
      
      // Validate required fields
      if (!author.name || !author.image_url) {
        console.error("Missing required fields for author creation");
        toast.error("Please fill all required fields");
        return null;
      }
      
      const { data, error } = await getTypedTable('article_authors')
        .insert(author)
        .select()
        .single();

      if (error) {
        console.error('Error creating author:', error);
        toast.error(`Failed to create author: ${error.message}`);
        return null;
      }

      console.log("Author created successfully:", data);
      toast.success("Author created successfully");
      return data;
    } catch (error) {
      console.error('Exception when creating author:', error);
      toast.error(`Failed to create author: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return null;
    }
  }
}

export const articleAuthorService = new ArticleAuthorService();
