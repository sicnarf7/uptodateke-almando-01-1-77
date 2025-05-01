
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { articleService } from "@/services/articleService";
import { ArticleTag } from "@/types/article";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface TagsTabProps {
  tags: ArticleTag[];
  onRefresh: () => void;
}

export const TagsTab = ({ tags, onRefresh }: TagsTabProps) => {
  const [tagFormData, setTagFormData] = useState<{ name: string; slug: string }>({
    name: '',
    slug: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(null);
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
      setFormError("Please fill all required fields");
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      setIsSubmitting(true);
      console.log("TagsTab: Creating new tag:", tagFormData);
      const newTag = await articleService.createTag({
        name: tagFormData.name,
        slug: tagFormData.slug
      });
      
      if (newTag) {
        console.log("TagsTab: Tag created successfully:", newTag);
        toast.success("Tag created successfully");
        setTagFormData({ name: '', slug: '' });
        onRefresh();
      } else {
        console.error("TagsTab: Failed to create tag - no error but no tag returned");
        setFormError("Failed to create tag - please check the console for more details");
        toast.error("Failed to create tag");
      }
    } catch (error) {
      console.error("TagsTab: Error creating tag:", error);
      setFormError(`Error creating tag: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast.error("Failed to create tag");
    } finally {
      setIsSubmitting(false);
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
                  value={tagFormData.name}
                  onChange={handleTagChange}
                  onBlur={(e) => generateTagSlug(e.target.value)}
                  required
                  disabled={isSubmitting}
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
                  "Create Tag"
                )}
              </Button>
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
