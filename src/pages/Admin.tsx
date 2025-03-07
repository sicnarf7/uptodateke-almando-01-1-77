
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { articleService } from "@/services/articleService";
import { Article, ArticleAuthor, ArticleTag, ArticleImage } from "@/types/article";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  
  // State for tabs
  const [activeTab, setActiveTab] = useState("articles");

  // State for articles
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleFormData, setArticleFormData] = useState<Partial<Article>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    is_premium: false,
  });

  // State for tags
  const [tags, setTags] = useState<ArticleTag[]>([]);
  const [tagFormData, setTagFormData] = useState<Partial<ArticleTag>>({
    name: "",
    slug: "",
  });

  // State for authors
  const [authors, setAuthors] = useState<ArticleAuthor[]>([]);
  const [authorFormData, setAuthorFormData] = useState<Partial<ArticleAuthor>>({
    name: "",
    image_url: "",
    bio: "",
    role: "",
  });

  // State for images
  const [images, setImages] = useState<ArticleImage[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFormData, setImageFormData] = useState({
    alt: "",
    caption: "",
    credit: "",
  });

  // State for selected data
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Fetch initial data
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

  // Handle form submissions
  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!articleFormData.title || !articleFormData.slug || !articleFormData.excerpt || 
        !articleFormData.content || !articleFormData.category || !selectedAuthor || !selectedImage) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const completeArticle = {
        ...articleFormData,
        author_id: selectedAuthor,
        featured_image_id: selectedImage,
      } as Omit<Article, 'id'>;
      
      const newArticle = await articleService.createArticle(completeArticle);
      
      if (newArticle) {
        // Add tags to the article
        for (const tagId of selectedTags) {
          await supabase
            .from('articles_to_tags')
            .insert({
              article_id: newArticle.id,
              tag_id: tagId
            });
        }
        
        toast.success("Article created successfully");
        setArticleFormData({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category: "",
          is_premium: false,
        });
        setSelectedTags([]);
        setSelectedAuthor("");
        setSelectedImage("");
        
        // Refresh articles list
        const articlesData = await articleService.getAllArticles();
        setArticles(articlesData);
      }
    } catch (error) {
      console.error("Error creating article:", error);
      toast.error("Failed to create article");
    }
  };

  const handleTagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tagFormData.name || !tagFormData.slug) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const newTag = await articleService.createTag(tagFormData as Omit<ArticleTag, 'id'>);
      
      if (newTag) {
        toast.success("Tag created successfully");
        setTagFormData({
          name: "",
          slug: "",
        });
        
        // Refresh tags list
        const tagsData = await articleService.getAllTags();
        setTags(tagsData);
      }
    } catch (error) {
      console.error("Error creating tag:", error);
      toast.error("Failed to create tag");
    }
  };

  const handleAuthorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authorFormData.name || !authorFormData.image_url) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const newAuthor = await articleService.createAuthor(authorFormData as Omit<ArticleAuthor, 'id'>);
      
      if (newAuthor) {
        toast.success("Author created successfully");
        setAuthorFormData({
          name: "",
          image_url: "",
          bio: "",
          role: "",
        });
        
        // Refresh authors list
        const authorsData = await articleService.getAllAuthors();
        setAuthors(authorsData);
      }
    } catch (error) {
      console.error("Error creating author:", error);
      toast.error("Failed to create author");
    }
  };

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile || !imageFormData.alt) {
      toast.error("Please select an image and provide alt text");
      return;
    }

    try {
      const newImage = await articleService.uploadImage(
        imageFile,
        imageFormData.alt,
        imageFormData.caption,
        imageFormData.credit
      );
      
      if (newImage) {
        toast.success("Image uploaded successfully");
        setImageFile(null);
        setImageFormData({
          alt: "",
          caption: "",
          credit: "",
        });
        
        // Refresh images list
        const imagesData = await articleService.getAllImages();
        setImages(imagesData);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  // Handle form input changes
  const handleArticleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setArticleFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTagFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuthorFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    
    if (name === "file" && files && files.length > 0) {
      setImageFile(files[0]);
    } else {
      setImageFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    
    setArticleFormData(prev => ({ ...prev, slug }));
  };

  // Generate tag slug from name
  const generateTagSlug = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    
    setTagFormData(prev => ({ ...prev, slug }));
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
          
          {/* Articles Tab */}
          <TabsContent value="articles">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Article</CardTitle>
                    <CardDescription>Fill out the form to create a new article</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleArticleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title*</Label>
                        <Input 
                          id="title" 
                          name="title" 
                          value={articleFormData.title}
                          onChange={handleArticleChange}
                          onBlur={(e) => generateSlug(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="slug">Slug*</Label>
                        <Input 
                          id="slug" 
                          name="slug" 
                          value={articleFormData.slug}
                          onChange={handleArticleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category*</Label>
                        <Input 
                          id="category" 
                          name="category" 
                          value={articleFormData.category}
                          onChange={handleArticleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt*</Label>
                        <Textarea 
                          id="excerpt" 
                          name="excerpt" 
                          value={articleFormData.excerpt}
                          onChange={handleArticleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="content">Content*</Label>
                        <Textarea 
                          id="content" 
                          name="content" 
                          value={articleFormData.content}
                          onChange={handleArticleChange}
                          className="min-h-[200px]"
                          required
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
                          checked={articleFormData.is_premium}
                          onCheckedChange={(checked) => {
                            setArticleFormData(prev => ({ ...prev, is_premium: checked as boolean }));
                          }}
                        />
                        <Label htmlFor="is_premium">Premium Content</Label>
                      </div>
                      
                      <Button type="submit" className="w-full">Create Article</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Published Articles</CardTitle>
                    <CardDescription>Manage your articles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {articles.length === 0 ? (
                        <p className="text-muted-foreground">No articles published yet.</p>
                      ) : (
                        articles.map((article) => (
                          <div key={article.id} className="border-b pb-3 mb-3 last:border-0">
                            <h3 className="font-medium">{article.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {article.category} • {format(new Date(article.published_at), "MMM d, yyyy")}
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
          
          {/* Tags Tab */}
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
          
          {/* Authors Tab */}
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
          
          {/* Images Tab */}
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
