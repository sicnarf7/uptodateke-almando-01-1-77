
import { supabase, getTypedTable } from "@/integrations/supabase/client";
import { ArticleImage } from "@/types/article";

class ArticleImageService {
  async getAllImages(): Promise<ArticleImage[]> {
    try {
      console.log("Fetching all images...");
      const { data, error } = await getTypedTable('article_images')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching images:', error);
        return [];
      }

      console.log(`Successfully fetched ${data?.length || 0} images`);
      return data || [];
    } catch (error) {
      console.error('Exception when fetching images:', error);
      return [];
    }
  }

  async uploadImage(file: File, alt: string, caption?: string, credit?: string): Promise<ArticleImage | null> {
    try {
      console.log("Uploading new image...", file.name);
      
      // Check if storage bucket exists
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'article-images');
      
      if (!bucketExists) {
        console.log("Article images bucket doesn't exist, creating it...");
        const { error: bucketError } = await supabase.storage.createBucket('article-images', {
          public: true,
        });
        
        if (bucketError) {
          console.error('Error creating storage bucket:', bucketError);
          return null;
        }
      }
      
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

      console.log("File uploaded successfully, getting public URL");
      
      // Get the public URL
      const { data: urlData } = supabase
        .storage
        .from('article-images')
        .getPublicUrl(fileName);

      if (!urlData || !urlData.publicUrl) {
        console.error('Failed to get public URL for uploaded image');
        return null;
      }

      console.log("Got public URL:", urlData.publicUrl);

      // Create an entry in the article_images table
      const imageData = {
        url: urlData.publicUrl,
        alt,
        caption,
        credit
      };

      const { data, error } = await getTypedTable('article_images')
        .insert(imageData)
        .select()
        .single();

      if (error) {
        console.error('Error creating image record:', error);
        return null;
      }

      console.log("Image record created successfully:", data);
      return data;
    } catch (error) {
      console.error('Exception when uploading image:', error);
      return null;
    }
  }
}

export const articleImageService = new ArticleImageService();
