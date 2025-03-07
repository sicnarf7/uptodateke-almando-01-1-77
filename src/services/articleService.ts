
import { Article } from "@/types/article";

// This is a mock service that would be replaced with actual API calls to your CMS
class ArticleService {
  private mockArticles: Article[] = [
    {
      id: 1,
      title: "Kenya's Digital Revolution: How Technology is Transforming Lives",
      slug: "kenyas-digital-revolution",
      excerpt: "From mobile banking to agricultural innovations, technology is reshaping how Kenyans live and work.",
      content: `
<p>NAIROBI, Kenya - The digital revolution in Kenya is gaining momentum as technology continues to transform various sectors of the economy and aspects of daily life.</p>

<p>M-Pesa, Kenya's mobile money transfer service, has been at the forefront of this transformation, enabling millions of Kenyans to access financial services without traditional bank accounts. The service now processes over 11 million transactions daily, accounting for nearly half of Kenya's GDP.</p>

<h2>Agricultural Innovation</h2>

<p>In the agricultural sector, farmers are increasingly using mobile apps to access market information, weather forecasts, and farming advice. Platforms like Digifarm and M-Farm have connected over 1.4 million farmers to markets and information.</p>

<p>"Technology has completely changed how I farm," says John Kamau, a small-scale farmer in Nyeri County. "I now know when to plant, what prices to expect, and can sell directly to buyers through my phone."</p>

<h2>Education and Healthcare</h2>

<p>Digital innovations are also making inroads in education and healthcare. E-learning platforms have become essential, especially after the COVID-19 pandemic highlighted the need for remote learning options. Meanwhile, telemedicine services are bringing healthcare to remote areas where medical facilities are scarce.</p>

<h2>Challenges Remain</h2>

<p>Despite these advances, challenges remain. Internet penetration stands at about 40%, meaning many Kenyans still lack access to digital services. High data costs and inconsistent electricity supply in rural areas further hinder digital inclusion.</p>

<p>Government initiatives like the Digital Economy Blueprint aim to address these gaps, with ambitious targets to achieve universal internet access by 2030.</p>

<p>As Kenya continues its digital transformation journey, the focus increasingly turns to ensuring that technological advancements benefit all citizens, not just those in urban areas or with higher incomes.</p>
      `,
      featuredImage: {
        url: "https://via.placeholder.com/1200x800/FF0000/FFFFFF?text=Digital+Revolution",
        alt: "Person using mobile banking in rural Kenya",
      },
      category: "Technology",
      tags: [
        { id: 1, name: "Digital Transformation", slug: "digital-transformation" },
        { id: 2, name: "M-Pesa", slug: "m-pesa" },
        { id: 3, name: "Innovation", slug: "innovation" }
      ],
      author: {
        id: 1,
        name: "John Maina",
        imageUrl: "https://via.placeholder.com/100/888888/FFFFFF?text=JM",
        bio: "Technology reporter covering East African innovation",
        role: "Senior Technology Editor"
      },
      publishedAt: "2023-08-15T09:30:00Z",
      isPremium: true
    },
    {
      id: 2,
      title: "Inside Kenya's Booming Music Industry: The Rise of Afro-Beats",
      slug: "kenyas-booming-music-industry",
      excerpt: "Kenyan artists are making waves globally with unique sounds and collaborations.",
      content: `
<p>NAIROBI, Kenya - The Kenyan music industry is experiencing unprecedented growth, with artists gaining international recognition and streaming numbers reaching all-time highs.</p>

<p>Leading this renaissance is the Afro-beats genre, a fusion of traditional African rhythms with modern production techniques. Local artists like Sauti Sol, Nyashinski, and Bensoul have amassed millions of streams across platforms like Spotify and Apple Music.</p>

<h2>International Collaborations</h2>

<p>Collaborations with international artists have played a significant role in the industry's growth. Recent partnerships between Kenyan musicians and artists from Nigeria, South Africa, and even the United States have helped bring Kenyan sounds to global audiences.</p>

<p>"We're seeing Kenyan music break boundaries like never before," says music producer Magix Enga. "Our artists are performing on international stages and bringing Kenyan culture to the world."</p>

<h2>Streaming and Digital Distribution</h2>

<p>Digital platforms have democratized music distribution, allowing artists to reach audiences without the need for traditional record labels. Platforms like Boomplay, which focuses on African music, report that Kenyan content has seen a 300% increase in streams over the past two years.</p>

<h2>Economic Impact</h2>

<p>The booming music industry has created numerous jobs in production, marketing, and event management. Music festivals like Blankets & Wine and Nairobi Fest attract thousands of attendees, boosting local economies.</p>

<p>As the industry continues to grow, challenges like piracy and copyright enforcement remain. However, the future looks bright for Kenyan music as it continues to carve out its unique identity on the global stage.</p>
      `,
      featuredImage: {
        url: "https://via.placeholder.com/1200x800/800080/FFFFFF?text=Music+Industry",
        alt: "Kenyan musician performing at a concert",
      },
      category: "Entertainment",
      tags: [
        { id: 4, name: "Music", slug: "music" },
        { id: 5, name: "Afro-beats", slug: "afro-beats" },
        { id: 6, name: "Entertainment", slug: "entertainment" }
      ],
      author: {
        id: 2,
        name: "Wanjiku Njeri",
        imageUrl: "https://via.placeholder.com/100/888888/FFFFFF?text=WN",
        bio: "Culture journalist covering East African entertainment",
        role: "Entertainment Editor"
      },
      publishedAt: "2023-08-10T14:15:00Z",
      isPremium: false
    }
  ];

  async getAllArticles(): Promise<Article[]> {
    // In a real implementation, this would fetch from your CMS API
    return Promise.resolve(this.mockArticles);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    // In a real implementation, this would fetch a specific article from your CMS API
    const article = this.mockArticles.find(article => article.slug === slug);
    return Promise.resolve(article);
  }

  async getRelatedArticles(article: Article): Promise<Article[]> {
    // In a real implementation, this would fetch related articles based on tags/category
    const related = this.mockArticles
      .filter(a => a.id !== article.id && a.category === article.category)
      .slice(0, 3);
    return Promise.resolve(related);
  }
}

export const articleService = new ArticleService();
