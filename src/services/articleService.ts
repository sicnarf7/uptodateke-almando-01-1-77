
import { supabase } from "@/integrations/supabase/client";
import { Article, ArticleAuthor, ArticleTag, ArticleImage } from "@/types/article";
import { articleDataService } from "./article/articleDataService";
import { articleTagService } from "./article/articleTagService"; 
import { articleAuthorService } from "./article/articleAuthorService";
import { articleImageService } from "./article/articleImageService";

class ArticleService {
  // Article management
  async getAllArticles(): Promise<Article[]> {
    return articleDataService.getAllArticles();
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return articleDataService.getArticleBySlug(slug);
  }

  async getRelatedArticles(article: Article): Promise<Article[]> {
    return articleDataService.getRelatedArticles(article);
  }

  async createArticle(article: Omit<Article, 'id'>): Promise<Article | null> {
    return articleDataService.createArticle(article);
  }

  async updateArticle(id: string, article: Partial<Article>): Promise<boolean> {
    return articleDataService.updateArticle(id, article);
  }

  async deleteArticle(id: string): Promise<boolean> {
    return articleDataService.deleteArticle(id);
  }

  // Tag management
  async getAllTags(): Promise<ArticleTag[]> {
    return articleTagService.getAllTags();
  }

  async createTag(tag: Omit<ArticleTag, 'id'>): Promise<ArticleTag | null> {
    return articleTagService.createTag(tag);
  }

  async addTagToArticle(articleId: string, tagId: string): Promise<boolean> {
    return articleTagService.addTagToArticle(articleId, tagId);
  }

  // Author management
  async getAllAuthors(): Promise<ArticleAuthor[]> {
    return articleAuthorService.getAllAuthors();
  }

  async createAuthor(author: Omit<ArticleAuthor, 'id'>): Promise<ArticleAuthor | null> {
    return articleAuthorService.createAuthor(author);
  }

  // Image management
  async getAllImages(): Promise<ArticleImage[]> {
    return articleImageService.getAllImages();
  }

  async uploadImage(file: File, alt: string, caption?: string, credit?: string): Promise<ArticleImage | null> {
    return articleImageService.uploadImage(file, alt, caption, credit);
  }
}

export const articleService = new ArticleService();
