
export interface ArticleTag {
  id: string;
  name: string;
  slug: string;
}

export interface ArticleAuthor {
  id: string;
  name: string;
  image_url: string;
  bio?: string;
  role?: string;
}

export interface ArticleImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export interface CategoryOption {
  value: string;
  label: string;
  subcategories: {
    value: string;
    label: string;
  }[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_id: string;
  featuredImage?: ArticleImage;
  category: string;
  subcategory?: string;
  tags?: ArticleTag[];
  author_id: string;
  author?: ArticleAuthor;
  published_at: string;
  updated_at?: string;
  is_premium: boolean;
  relatedArticles?: Article[];
  view_count: number;
  status: string;
}
