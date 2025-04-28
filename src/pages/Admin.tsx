import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { articleService } from "@/services/articleService";
import { Article, ArticleAuthor, ArticleTag, ArticleImage } from "@/types/article";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Badge } from "@/components/ui/badge";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("articles");
  const [articles, setArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<ArticleTag[]>([]);
  const [authors, setAuthors] = useState<ArticleAuthor[]>([]);
  const [images, setImages] = useState<ArticleImage[]>([]);

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

  const refreshArticles = async () => {
    const articlesData = await articleService.getAllArticles();
    setArticles(articlesData);
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ArticleForm 
                  authors={authors}
                  tags={tags}
                  images={images}
                  onSuccess={refreshArticles}
                />
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Articles</CardTitle>
                    <CardDescription>Manage your articles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {articles.length === 0 ? (
                        <p className="text-muted-foreground">No articles yet.</p>
                      ) : (
                        articles.map((article) => (
                          <div key={article.id} className="border-b pb-3 mb-3 last:border-0">
                            <h3 className="font-medium">{article.title}</h3>
                            <div className="flex gap-2 mt-1">
                              <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                                {article.status}
                              </Badge>
                              {article.is_premium && <Badge variant="outline">Premium</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {article.category} • {article.published_at ? format(new Date(article.published_at), "MMM d, yyyy") : 'Not published'}
                            </p>
                            <div className="flex mt-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/article/${article.slug}`)}
                                className="mr-2"
                              >
                                View
                              </Button>
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
                          value={imageFormData.caption}
                          onChange={handleImageChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="credit">Credit</Label>
                        <Input 
                          id="credit" 
                          name="credit" 
                          value={imageFormData.credit}
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
