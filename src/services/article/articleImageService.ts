
import { supabase } from "@/integrations/supabase/client";
import { ArticleImage } from "@/types/article";

class ArticleImageService {
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
}

export const articleImageService = new ArticleImageService();
