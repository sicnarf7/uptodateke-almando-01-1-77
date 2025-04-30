
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { articleService } from "@/services/articleService";
import { ArticleTag } from "@/types/article";
import { toast } from "sonner";

interface TagsTabProps {
  tags: ArticleTag[];
  onRefresh: () => void;
}

export const TagsTab = ({ tags, onRefresh }: TagsTabProps) => {
  const [tagFormData, setTagFormData] = useState<{ name: string; slug: string }>({
    name: '',
    slug: ''
  });
  
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTagFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const generateTagSlug = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    
    setTagFormData(prev => ({ ...prev, slug }));
  };
  
  const handleTagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tagFormData.name || !tagFormData.slug) {
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      const newTag = await articleService.createTag({
        name: tagFormData.name,
        slug: tagFormData.slug
      });
      
      if (newTag) {
        toast.success("Tag created successfully");
        setTagFormData({ name: '', slug: '' });
        onRefresh();
      }
    } catch (error) {
      console.error("Error creating tag:", error);
      toast.error("Failed to create tag");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Create New Tag</CardTitle>
            <CardDescription>Add a new tag for categorizing articles</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTagSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name*</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={tagFormData.name}
                  onChange={handleTagChange}
                  onBlur={(e) => generateTagSlug(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug*</Label>
                <Input 
                  id="slug" 
                  name="slug" 
                  value={tagFormData.slug}
                  onChange={handleTagChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">Create Tag</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>All Tags</CardTitle>
            <CardDescription>Manage your tags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tags.length === 0 ? (
                <p className="text-muted-foreground">No tags created yet.</p>
              ) : (
                tags.map((tag) => (
                  <div key={tag.id} className="p-3 border rounded-md">
                    <p className="font-medium">{tag.name}</p>
                    <p className="text-sm text-muted-foreground">#{tag.slug}</p>
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
