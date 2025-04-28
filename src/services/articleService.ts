import { supabase } from "@/integrations/supabase/client";
import { Article, ArticleAuthor, ArticleTag, ArticleImage } from "@/types/article";

class ArticleService {
  async getAllArticles(): Promise<Article[]> {
    const { data: articles, error } = await supabase
      .from('articles')
      .select(`
        *,
        featuredImage:article_images!featured_image_id(*),
        author:article_authors!author_id(*)
      `)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      return [];
    }

    // For each article, fetch its tags
    const articlesWithTags = await Promise.all(
      articles.map(async (article) => {
        const { data: tags, error: tagsError } = await supabase
          .from('articles_to_tags')
          .select(`
            tag_id(*)
          `)
          .eq('article_id', article.id);

        if (tagsError) {
          console.error('Error fetching tags for article:', tagsError);
          return { ...article, tags: [] };
        }

        const formattedTags = tags.map(tag => tag.tag_id) as ArticleTag[];
        return { ...article, tags: formattedTags };
      })
    );

    return articlesWithTags;
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const { data: article, error } = await supabase
      .from('articles')
      .select(`
        *,
        featuredImage:article_images!featured_image_id(*),
        author:article_authors!author_id(*)
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching article by slug:', error);
      return undefined;
    }

    // Initialize the tags and relatedArticles arrays if they don't exist
    const articleWithArrays = {
      ...article,
      tags: [] as ArticleTag[],
      relatedArticles: [] as Article[]
    };

    // Fetch tags for the article
    const { data: tags, error: tagsError } = await supabase
      .from('articles_to_tags')
      .select(`
        tag_id(*)
      `)
      .eq('article_id', article.id);

    if (tagsError) {
      console.error('Error fetching tags for article:', tagsError);
    } else {
      articleWithArrays.tags = tags.map(tag => tag.tag_id) as ArticleTag[];
    }

    // Fetch related articles
    const { data: relatedIds, error: relatedError } = await supabase
      .from('articles_to_related')
      .select('related_article_id')
      .eq('article_id', article.id);

    if (relatedError) {
      console.error('Error fetching related articles:', relatedError);
    } else if (relatedIds.length > 0) {
      const relatedArticleIds = relatedIds.map(rel => rel.related_article_id);
      const { data: relatedArticles, error: fetchError } = await supabase
        .from('articles')
        .select(`
          *,
          featuredImage:article_images!featured_image_id(*),
          author:article_authors!author_id(*)
        `)
        .in('id', relatedArticleIds);

      if (fetchError) {
        console.error('Error fetching related articles data:', fetchError);
      } else {
        articleWithArrays.relatedArticles = relatedArticles;
      }
    }

    // Increment view count
    const { error: updateError } = await supabase
      .from('articles')
      .update({ view_count: (article.view_count || 0) + 1 })
      .eq('id', article.id);

    if (updateError) {
      console.error('Error updating view count:', updateError);
    }

    return articleWithArrays;
  }

  async getRelatedArticles(article: Article): Promise<Article[]> {
    if (article.relatedArticles) {
      return article.relatedArticles;
    }

    // If no predefined related articles, fetch by category
    const { data: relatedArticles, error } = await supabase
      .from('articles')
      .select(`
        *,
        featuredImage:article_images!featured_image_id(*),
        author:article_authors!author_id(*)
      `)
      .eq('category', article.category)
      .neq('id', article.id)
      .limit(3);

    if (error) {
      console.error('Error fetching related articles:', error);
      return [];
    }

    return relatedArticles;
  }

  // CMS functions
  async createArticle(article: Omit<Article, 'id'>): Promise<Article | null> {
    const { data, error } = await supabase
      .from('articles')
      .insert(article)
      .select()
      .single();

    if (error) {
      console.error('Error creating article:', error);
      return null;
    }

    return data;
  }

  async updateArticle(id: string, article: Partial<Article>): Promise<boolean> {
    const { error } = await supabase
      .from('articles')
      .update(article)
      .eq('id', id);

    if (error) {
      console.error('Error updating article:', error);
      return false;
    }

    return true;
  }

  async deleteArticle(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting article:', error);
      return false;
    }

    return true;
  }

  // Tag functions
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

  // Author functions
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

  // Image functions
  async uploadImage(file: File, alt: string, caption?: string, credit?: string): Promise<ArticleImage | null> {
    // Upload the file to storage
    const fileName = `${Date.now()}-${file.name}`;
    const { data: fileData, error: uploadError } = await supabase
      .storage
      .from('article-images')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    // Get the public URL
    const { data: urlData } = supabase
      .storage
      .from('article-images')
      .getPublicUrl(fileName);

    // Create an entry in the article_images table
    const imageData = {
      url: urlData.publicUrl,
      alt,
      caption,
      credit
    };

    const { data, error } = await supabase
      .from('article_images')
      .insert(imageData)
      .select()
      .single();

    if (error) {
      console.error('Error creating image record:', error);
      return null;
    }

    return data;
  }

  async getAllImages(): Promise<ArticleImage[]> {
    const { data, error } = await supabase
      .from('article_images')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching images:', error);
      return [];
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

export const articleService = new ArticleService();
