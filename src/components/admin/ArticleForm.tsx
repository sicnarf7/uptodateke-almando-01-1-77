
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Article, ArticleAuthor, ArticleTag, ArticleImage } from "@/types/article";
import { toast } from "sonner";
import { articleService } from "@/services/articleService";

interface ArticleFormProps {
  authors: ArticleAuthor[];
  tags: ArticleTag[];
  images: ArticleImage[];
  onSuccess: () => void;
}

export const ArticleForm = ({ authors, tags, images, onSuccess }: ArticleFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    is_premium: false,
    status: "draft" as "draft" | "published"
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.excerpt || 
        !formData.content || !formData.category || !selectedAuthor || !selectedImage) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const status = publish ? "published" : "draft";
      const publishedAt = publish ? new Date().toISOString() : null;
      
      const completeArticle = {
        ...formData,
        status,
        published_at: publishedAt,
        author_id: selectedAuthor,
        featured_image_id: selectedImage,
        view_count: 0 // Add the missing view_count property
      } as Omit<Article, 'id'>;
      
      const newArticle = await articleService.createArticle(completeArticle);
      
      if (newArticle) {
        for (const tagId of selectedTags) {
          await articleService.addTagToArticle(newArticle.id, tagId);
        }
        
        toast.success(`Article ${publish ? 'published' : 'saved as draft'} successfully`);
        setFormData({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category: "",
          is_premium: false,
          status: "draft"
        });
        setSelectedTags([]);
        setSelectedAuthor("");
        setSelectedImage("");
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating article:", error);
      toast.error("Failed to create article");
    }
  };

  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    
    setFormData(prev => ({ ...prev, slug }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Article</CardTitle>
        <CardDescription>Fill out the form to create a new article</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title*</Label>
            <Input 
              id="title" 
              value={formData.title}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, title: e.target.value }));
                generateSlug(e.target.value);
              }}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Slug*</Label>
            <Input 
              id="slug" 
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category*</Label>
            <Input 
              id="category" 
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt*</Label>
            <Textarea 
              id="excerpt" 
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content*</Label>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData(prev => ({ ...prev, content }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Author*</Label>
            <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
              <SelectTrigger>
                <SelectValue placeholder="Select an author" />
              </SelectTrigger>
              <SelectContent>
                {authors.map((author) => (
                  <SelectItem key={author.id} value={author.id}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Featured Image*</Label>
            <Select value={selectedImage} onValueChange={setSelectedImage}>
              <SelectTrigger>
                <SelectValue placeholder="Select a featured image" />
              </SelectTrigger>
              <SelectContent>
                {images.map((image) => (
                  <SelectItem key={image.id} value={image.id}>
                    {image.alt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="grid grid-cols-2 gap-2">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`tag-${tag.id}`}
                    checked={selectedTags.includes(tag.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTags(prev => [...prev, tag.id]);
                      } else {
                        setSelectedTags(prev => prev.filter(id => id !== tag.id));
                      }
                    }}
                  />
                  <Label htmlFor={`tag-${tag.id}`}>{tag.name}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="is_premium"
              checked={formData.is_premium}
              onCheckedChange={(checked) => {
                setFormData(prev => ({ ...prev, is_premium: checked as boolean }));
              }}
            />
            <Label htmlFor="is_premium">Premium Content</Label>
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="submit" 
              variant="outline"
              className="flex-1"
              onClick={(e) => handleSubmit(e, false)}
            >
              Save as Draft
            </Button>
            <Button 
              type="submit"
              className="flex-1"
              onClick={(e) => handleSubmit(e, true)}
            >
              Publish
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
