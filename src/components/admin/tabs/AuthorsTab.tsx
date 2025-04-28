
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArticleAuthor } from "@/types/article";
import { articleService } from "@/services/articleService";
import { toast } from "sonner";

interface AuthorsTabProps {
  authors: ArticleAuthor[];
  onRefresh: () => void;
}

export const AuthorsTab = ({ authors, onRefresh }: AuthorsTabProps) => {
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

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuthorFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authorFormData.name || !authorFormData.image_url) {
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      const newAuthor = await articleService.createAuthor({
        name: authorFormData.name,
        image_url: authorFormData.image_url,
        role: authorFormData.role || undefined,
        bio: authorFormData.bio || undefined
      });
      
      if (newAuthor) {
        toast.success("Author created successfully");
        setAuthorFormData({ name: '', image_url: '', role: '', bio: '' });
        onRefresh();
      }
    } catch (error) {
      console.error("Error creating author:", error);
      toast.error("Failed to create author");
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
              <div className="space-y-2">
                <Label htmlFor="name">Name*</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={authorFormData.name}
                  onChange={handleAuthorChange}
                  required
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
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input 
                  id="role" 
                  name="role" 
                  value={authorFormData.role || ""}
                  onChange={handleAuthorChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  value={authorFormData.bio || ""}
                  onChange={handleAuthorChange}
                />
              </div>
              
              <Button type="submit" className="w-full">Create Author</Button>
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
