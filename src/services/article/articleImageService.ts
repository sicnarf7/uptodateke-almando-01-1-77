
import { supabase, getTypedTable } from "@/integrations/supabase/client";
import { ArticleImage } from "@/types/article";
import { toast } from "sonner";

class ArticleImageService {
  async getAllImages(): Promise<ArticleImage[]> {
    try {
      console.log("Fetching all images...");
      const { data, error } = await getTypedTable('article_images')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching images:', error);
        toast.error('Could not load images: ' + error.message);
        return [];
      }

      console.log(`Successfully fetched ${data?.length || 0} images`);
      return data || [];
    } catch (error) {
      console.error('Exception when fetching images:', error);
      toast.error('Failed to fetch images');
      return [];
    }
  }

  async ensureStorageBucketExists(): Promise<boolean> {
    try {
      // Check if storage bucket exists
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.error('Error checking storage buckets:', listError);
        toast.error('Failed to access storage');
        return false;
      }
      
      const bucketExists = buckets?.some(bucket => bucket.name === 'article-images');
      
      if (!bucketExists) {
        console.log("Article images bucket doesn't exist, creating it...");
        const { error: bucketError } = await supabase.storage.createBucket('article-images', {
          public: true,
        });
        
        if (bucketError) {
          console.error('Error creating storage bucket:', bucketError);
          toast.error('Failed to create storage bucket');
          return false;
        }
        
        console.log("Storage bucket created successfully");
        return true;
      }
      
      return true;
    } catch (error) {
      console.error('Exception when ensuring storage bucket exists:', error);
      toast.error('Failed to configure storage');
      return false;
    }
  }

  async uploadImage(file: File, alt: string, caption?: string, credit?: string): Promise<ArticleImage | null> {
    try {
      console.log("Uploading new image...", file.name);
      
      // First ensure the storage bucket exists
      const bucketReady = await this.ensureStorageBucketExists();
      if (!bucketReady) {
        console.error("Failed to ensure storage bucket exists");
        return null;
      }
      
      // Upload the file to storage
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const { data: fileData, error: uploadError } = await supabase
        .storage
        .from('article-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        toast.error(`Failed to upload image: ${uploadError.message}`);
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
        toast.error('Failed to get image URL');
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
        toast.error(`Failed to save image details: ${error.message}`);
        return null;
      }

      console.log("Image record created successfully:", data);
      toast.success("Image uploaded successfully");
      return data;
    } catch (error) {
      console.error('Exception when uploading image:', error);
      toast.error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return null;
    }
  }
}

export const articleImageService = new ArticleImageService();
