
import { supabase, getTypedTable } from "@/integrations/supabase/client";
import { Article } from "@/types/article";

class ArticleDataService {
  async getAllArticles(): Promise<Article[]> {
    const { data: articles, error } = await getTypedTable('articles')
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
        const { data: tags, error: tagsError } = await getTypedTable('articles_to_tags')
          .select(`
            tag_id(*)
          `)
          .eq('article_id', article.id);

        if (tagsError) {
          console.error('Error fetching tags for article:', tagsError);
          return { ...article, tags: [] };
        }

        const formattedTags = tags.map(tag => tag.tag_id);
        return { ...article, tags: formattedTags };
      })
    );

    return articlesWithTags;
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const { data: article, error } = await getTypedTable('articles')
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
      tags: [],
      relatedArticles: []
    };

    // Fetch tags for the article
    const { data: tags, error: tagsError } = await getTypedTable('articles_to_tags')
      .select(`
        tag_id(*)
      `)
      .eq('article_id', article.id);

    if (tagsError) {
      console.error('Error fetching tags for article:', tagsError);
    } else {
      articleWithArrays.tags = tags.map(tag => tag.tag_id);
    }

    // Fetch related articles
    const { data: relatedIds, error: relatedError } = await getTypedTable('articles_to_related')
      .select('related_article_id')
      .eq('article_id', article.id);

    if (relatedError) {
      console.error('Error fetching related articles:', relatedError);
    } else if (relatedIds.length > 0) {
      const relatedArticleIds = relatedIds.map(rel => rel.related_article_id);
      const { data: relatedArticles, error: fetchError } = await getTypedTable('articles')
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
    const { error: updateError } = await getTypedTable('articles')
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
    const { data: relatedArticles, error } = await getTypedTable('articles')
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

  async createArticle(article: Omit<Article, 'id'>): Promise<Article | null> {
    const { data, error } = await getTypedTable('articles')
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
    const { error } = await getTypedTable('articles')
      .update(article)
      .eq('id', id);

    if (error) {
      console.error('Error updating article:', error);
      return false;
    }

    return true;
  }

  async deleteArticle(id: string): Promise<boolean> {
    const { error } = await getTypedTable('articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting article:', error);
      return false;
    }

    return true;
  }
}

export const articleDataService = new ArticleDataService();
