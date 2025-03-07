
export interface ArticleTag {
  id: number;
  name: string;
  slug: string;
}

export interface ArticleAuthor {
  id: number;
  name: string;
  imageUrl: string;
  bio?: string;
  role?: string;
}

export interface ArticleImage {
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: ArticleImage;
  category: string;
  tags: ArticleTag[];
  author: ArticleAuthor;
  publishedAt: string;
  updatedAt?: string;
  isPremium: boolean;
  relatedArticles?: Article[];
  viewCount?: number;
}
