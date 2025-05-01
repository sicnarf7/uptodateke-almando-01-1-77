
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { articleService } from "@/services/articleService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

export const AuthorsTab = () => {
  const { contentData, handleRefresh } = useAdminData();
  const { authors } = contentData;
  
  const [authorFormData, setAuthorFormData] = useState<{
    name: string;
    image_url: string;
    role?: string;
    bio?: string;
  }>({
    name: '',
    image_url: '',
    role: '',
    bio: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormError(null);
    const { name, value } = e.target;
    setAuthorFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authorFormData.name || !authorFormData.image_url) {
      setFormError("Please fill all required fields");
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      setIsSubmitting(true);
      console.log("AuthorsTab: Creating new author:", authorFormData);
      
      const newAuthor = await articleService.createAuthor({
        name: authorFormData.name,
        image_url: authorFormData.image_url,
        role: authorFormData.role || undefined,
        bio: authorFormData.bio || undefined
      });
      
      if (newAuthor) {
        console.log("AuthorsTab: Author created successfully:", newAuthor);
        toast.success("Author created successfully");
        setAuthorFormData({ name: '', image_url: '', role: '', bio: '' });
        handleRefresh();
      } else {
        console.error("AuthorsTab: Failed to create author - no error but no author returned");
        setFormError("Failed to create author - please check the console for more details");
        toast.error("Failed to create author");
      }
    } catch (error) {
      console.error("AuthorsTab: Error creating author:", error);
      setFormError(`Error creating author: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast.error("Failed to create author");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Create New Author</CardTitle>
            <CardDescription>Add a new author for your articles</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuthorSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md">
                  {formError}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="name">Name*</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={authorFormData.name}
                  onChange={handleAuthorChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL*</Label>
                <Input 
                  id="image_url" 
                  name="image_url" 
                  value={authorFormData.image_url}
                  onChange={handleAuthorChange}
                  required
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                  Use a direct image URL (e.g., https://example.com/image.jpg)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input 
                  id="role" 
                  name="role" 
                  value={authorFormData.role || ""}
                  onChange={handleAuthorChange}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  value={authorFormData.bio || ""}
                  onChange={handleAuthorChange}
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
                    Creating...
                  </>
                ) : (
                  "Create Author"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>All Authors</CardTitle>
            <CardDescription>Manage your authors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {authors.length === 0 ? (
                <p className="text-muted-foreground">No authors created yet.</p>
              ) : (
                authors.map((author) => (
                  <div key={author.id} className="p-4 border rounded-md flex items-center space-x-4">
                    <img 
                      src={author.image_url} 
                      alt={author.name} 
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                      }}
                    />
                    <div>
                      <p className="font-medium">{author.name}</p>
                      <p className="text-sm text-muted-foreground">{author.role || "Writer"}</p>
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
