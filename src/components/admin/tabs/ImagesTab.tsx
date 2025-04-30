
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArticleImage } from "@/types/article";
import { articleService } from "@/services/articleService";
import { toast } from "sonner";

interface ImagesTabProps {
  images: ArticleImage[];
  onRefresh: () => void;
}

export const ImagesTab = ({ images, onRefresh }: ImagesTabProps) => {
  const [imageFormData, setImageFormData] = useState<{
    file?: File;
    alt: string;
    caption?: string;
    credit?: string;
  }>({
    alt: '',
    caption: '',
    credit: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    
    if (name === 'file' && files && files.length > 0) {
      setImageFormData(prev => ({ ...prev, file: files[0] }));
    } else {
      setImageFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFormData.file || !imageFormData.alt) {
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      const newImage = await articleService.uploadImage(
        imageFormData.file,
        imageFormData.alt,
        imageFormData.caption,
        imageFormData.credit
      );
      
      if (newImage) {
        toast.success("Image uploaded successfully");
        setImageFormData({ alt: '', caption: '', credit: '' });
        onRefresh();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Upload New Image</CardTitle>
            <CardDescription>Upload an image for use in articles</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleImageSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Image File*</Label>
                <Input 
                  id="file" 
                  name="file" 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text*</Label>
                <Input 
                  id="alt" 
                  name="alt" 
                  value={imageFormData.alt}
                  onChange={handleImageChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Input 
                  id="caption" 
                  name="caption" 
                  value={imageFormData.caption || ""}
                  onChange={handleImageChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="credit">Credit</Label>
                <Input 
                  id="credit" 
                  name="credit" 
                  value={imageFormData.credit || ""}
                  onChange={handleImageChange}
                />
              </div>
              
              <Button type="submit" className="w-full">Upload Image</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Image Gallery</CardTitle>
            <CardDescription>Manage your uploaded images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.length === 0 ? (
                <p className="text-muted-foreground">No images uploaded yet.</p>
              ) : (
                images.map((image) => (
                  <div key={image.id} className="border rounded-md overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.alt} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm font-medium truncate">{image.alt}</p>
                      {image.caption && (
                        <p className="text-xs text-muted-foreground truncate">{image.caption}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
