
import { CategoryOption } from "@/types/article";

export const categoryOptions: CategoryOption[] = [
  // Politics category with expanded subcategories
  {
    value: "Politics",
    label: "Politics",
    subcategories: [
      { value: "Elections", label: "Elections" },
      { value: "Bills & Legislation", label: "Bills & Legislation" },
      { value: "Government", label: "Government" },
      { value: "Parliament", label: "Parliament" },
      { value: "County News", label: "County News" },
      { value: "International Relations", label: "International Relations" },
      { value: "Political Analysis", label: "Political Analysis" }
    ]
  },
  // Business category with expanded subcategories
  {
    value: "Business",
    label: "Business",
    subcategories: [
      { value: "Startups", label: "Startups" },
      { value: "Economy", label: "Economy" },
      { value: "Markets", label: "Markets" },
      { value: "Finance", label: "Finance" },
      { value: "Real Estate", label: "Real Estate" },
      { value: "Agriculture", label: "Agriculture" },
      { value: "SMEs", label: "SMEs" },
      { value: "Corporate", label: "Corporate" }
    ]
  },
  // Tech category with expanded subcategories
  {
    value: "Tech",
    label: "Tech",
    subcategories: [
      { value: "Gadgets", label: "Gadgets" },
      { value: "Apps", label: "Apps" },
      { value: "Innovation", label: "Innovation" },
      { value: "Digital Trends", label: "Digital Trends" },
      { value: "Startups", label: "Startups" },
      { value: "Artificial Intelligence", label: "Artificial Intelligence" },
      { value: "Telecommunications", label: "Telecommunications" },
      { value: "Internet", label: "Internet" }
    ]
  },
  // Entertainment category with expanded subcategories
  {
    value: "Entertainment",
    label: "Entertainment",
    subcategories: [
      { value: "Movies", label: "Movies" },
      { value: "TV Shows", label: "TV Shows" },
      { value: "Comedy", label: "Comedy" },
      { value: "Reviews", label: "Reviews" },
      { value: "Streaming", label: "Streaming" },
      { value: "Interviews", label: "Interviews" }
    ]
  },
  // Celebrity Gossip category
  {
    value: "Celebrity Gossip",
    label: "Celebrity Gossip",
    subcategories: [
      { value: "Local Stars", label: "Local Stars" },
      { value: "International Stars", label: "International Stars" },
      { value: "Scandals & Rumors", label: "Scandals & Rumors" },
      { value: "Red Carpet", label: "Red Carpet" },
      { value: "Lifestyle", label: "Lifestyle" }
    ]
  },
  // Music category
  {
    value: "Music",
    label: "Music",
    subcategories: [
      { value: "Gengetone", label: "Gengetone" },
      { value: "Gospel", label: "Gospel" },
      { value: "Afrobeats", label: "Afrobeats" },
      { value: "Hip Hop", label: "Hip Hop" },
      { value: "Bongo", label: "Bongo" },
      { value: "New Releases", label: "New Releases" },
      { value: "Concerts", label: "Concerts" },
      { value: "Reviews", label: "Reviews" }
    ]
  },
  // Events category
  {
    value: "Events",
    label: "Events",
    subcategories: [
      { value: "Concerts", label: "Concerts" },
      { value: "Festivals", label: "Festivals" },
      { value: "Nightlife", label: "Nightlife" },
      { value: "Cultural Events", label: "Cultural Events" },
      { value: "Arts & Exhibitions", label: "Arts & Exhibitions" },
      { value: "Community Events", label: "Community Events" },
      { value: "Corporate Events", label: "Corporate Events" }
    ]
  },
  // Sports category with expanded subcategories
  {
    value: "Sports",
    label: "Sports",
    subcategories: [
      { value: "Football", label: "Football" },
      { value: "Athletics", label: "Athletics" },
      { value: "Rugby", label: "Rugby" },
      { value: "Basketball", label: "Basketball" },
      { value: "Cricket", label: "Cricket" },
      { value: "Boxing", label: "Boxing" },
      { value: "Tennis", label: "Tennis" },
      { value: "Local Leagues", label: "Local Leagues" },
      { value: "International", label: "International" }
    ]
  },
  // Lifestyle category with expanded subcategories
  {
    value: "Lifestyle",
    label: "Lifestyle",
    subcategories: [
      { value: "Fashion", label: "Fashion" },
      { value: "Health", label: "Health" },
      { value: "Food", label: "Food" },
      { value: "Travel", label: "Travel" },
      { value: "Wellness", label: "Wellness" },
      { value: "Parenting", label: "Parenting" },
      { value: "Relationships", label: "Relationships" },
      { value: "Home & Garden", label: "Home & Garden" }
    ]
  },
  // Education category
  {
    value: "Education",
    label: "Education",
    subcategories: [
      { value: "Schools", label: "Schools" },
      { value: "Universities", label: "Universities" },
      { value: "Research", label: "Research" },
      { value: "Scholarships", label: "Scholarships" },
      { value: "Career Development", label: "Career Development" },
      { value: "Technology in Education", label: "Technology in Education" }
    ]
  },
  // Health category
  {
    value: "Health",
    label: "Health",
    subcategories: [
      { value: "Medical Research", label: "Medical Research" },
      { value: "Public Health", label: "Public Health" },
      { value: "Healthcare Policy", label: "Healthcare Policy" },
      { value: "Mental Health", label: "Mental Health" },
      { value: "Nutrition", label: "Nutrition" },
      { value: "Fitness", label: "Fitness" },
      { value: "Disease Prevention", label: "Disease Prevention" }
    ]
  },
  // Environment category
  {
    value: "Environment",
    label: "Environment",
    subcategories: [
      { value: "Climate Change", label: "Climate Change" },
      { value: "Conservation", label: "Conservation" },
      { value: "Renewable Energy", label: "Renewable Energy" },
      { value: "Pollution", label: "Pollution" },
      { value: "Wildlife", label: "Wildlife" },
      { value: "Sustainability", label: "Sustainability" }
    ]
  }
];

