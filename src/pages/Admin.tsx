
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { articleService } from "@/services/articleService";
import { Article, ArticleAuthor, ArticleTag, ArticleImage } from "@/types/article";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { toast } from "sonner";
import { ArticlesTab } from "@/components/admin/tabs/ArticlesTab";
import { AuthorsTab } from "@/components/admin/tabs/AuthorsTab";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("articles");
  const [articles, setArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<ArticleTag[]>([]);
  const [authors, setAuthors] = useState<ArticleAuthor[]>([]);
  const [images, setImages] = useState<ArticleImage[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(true);
  
  const [tagFormData, setTagFormData] = useState<{ name: string; slug: string }>({
    name: '',
    slug: ''
  });
  
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

  useEffect(() => {
    const fetchData = async () => {
      const [articlesData, tagsData, authorsData, imagesData] = await Promise.all([
        articleService.getAllArticles(),
        articleService.getAllTags(),
        articleService.getAllAuthors(),
        articleService.getAllImages(),
      ]);

      setArticles(articlesData);
      setTags(tagsData);
      setAuthors(authorsData);
      setImages(imagesData);
    };

    fetchData();
  }, []);

  const refreshData = async () => {
    const [articlesData, tagsData, authorsData, imagesData] = await Promise.all([
      articleService.getAllArticles(),
      articleService.getAllTags(),
      articleService.getAllAuthors(),
      articleService.getAllImages(),
    ]);
    
    setArticles(articlesData);
    setTags(tagsData);
    setAuthors(authorsData);
    setImages(imagesData);
    
    // Reset article selection after successful operations
    setSelectedArticle(null);
    setIsCreatingNew(true);
  };
  
  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsCreatingNew(false);
  };
  
  const handleNewArticle = () => {
    setSelectedArticle(null);
    setIsCreatingNew(true);
  };
  
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
        
        const updatedTags = await articleService.getAllTags();
        setTags(updatedTags);
      }
    } catch (error) {
      console.error("Error creating tag:", error);
      toast.error("Failed to create tag");
    }
  };
  
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
        
        const updatedImages = await articleService.getAllImages();
        setImages(updatedImages);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Content Management System</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">{isCreatingNew ? 'Create New Article' : 'Edit Article'}</h2>
              {!isCreatingNew && (
                <Button 
                  onClick={handleNewArticle}
                  variant="default"
                  size="sm"
                >
                  Create New Article
                </Button>
              )}
            </div>
            
            <ArticlesTab 
              articles={articles}
              authors={authors}
              tags={tags}
              images={images}
              onRefresh={refreshData}
              selectedArticle={selectedArticle}
              setSelectedArticle={setSelectedArticle}
              isCreatingNew={isCreatingNew}
              setIsCreatingNew={setIsCreatingNew}
            />
          </TabsContent>
          
          <TabsContent value="tags">
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
          </TabsContent>
          
          <TabsContent value="authors">
            <AuthorsTab authors={authors} onRefresh={refreshData} />
          </TabsContent>
          
          <TabsContent value="images">
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
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Admin;
