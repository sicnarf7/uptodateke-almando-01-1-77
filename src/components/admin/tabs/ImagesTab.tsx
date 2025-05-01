
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArticleImage } from "@/types/article";
import { articleService } from "@/services/articleService";
import { toast } from "sonner";
import { Loader2, Image as ImageIcon } from "lucide-react";

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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(null);
    const { name, value, files } = e.target;
    
    if (name === 'file' && files && files.length > 0) {
      const file = files[0];
      setImageFormData(prev => ({ ...prev, file }));
      
      // Generate preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFormData.file || !imageFormData.alt) {
      setFormError("Please fill all required fields");
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      setIsSubmitting(true);
      console.log("ImagesTab: Uploading new image:", imageFormData.file.name);
      
      const newImage = await articleService.uploadImage(
        imageFormData.file,
        imageFormData.alt,
        imageFormData.caption,
        imageFormData.credit
      );
      
      if (newImage) {
        console.log("ImagesTab: Image uploaded successfully:", newImage);
        toast.success("Image uploaded successfully");
        setImageFormData({ alt: '', caption: '', credit: '' });
        setPreviewUrl(null);
        onRefresh();
      } else {
        console.error("ImagesTab: Failed to upload image - no error but no image returned");
        setFormError("Failed to upload image - please check the console for more details");
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("ImagesTab: Error uploading image:", error);
      setFormError(`Error uploading image: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast.error("Failed to upload image");
    } finally {
      setIsSubmitting(false);
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
              {formError && (
                <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md">
                  {formError}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="file">Image File*</Label>
                <Input 
                  id="file" 
                  name="file" 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  disabled={isSubmitting}
                />
                
                {previewUrl && (
                  <div className="mt-2 border rounded-md overflow-hidden">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-auto max-h-40 object-cover"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text*</Label>
                <Input 
                  id="alt" 
                  name="alt" 
                  value={imageFormData.alt}
                  onChange={handleImageChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Input 
                  id="caption" 
                  name="caption" 
                  value={imageFormData.caption || ""}
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="credit">Credit</Label>
                <Input 
                  id="credit" 
                  name="credit" 
                  value={imageFormData.credit || ""}
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Image"
                )}
              </Button>
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
                    <div className="h-40 bg-muted relative">
                      <img 
                        src={image.url} 
                        alt={image.alt} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiPjwvcmVjdD48dGV4dCB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5OTk5Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/60 transition-opacity">
                        <a href={image.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm">
                            <ImageIcon className="h-4 w-4 mr-1" />
                            View Full Size
                          </Button>
                        </a>
                      </div>
                    </div>
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
