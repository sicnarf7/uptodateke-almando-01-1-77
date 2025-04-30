
import { CategoryOption } from "@/types/article";

export const categoryOptions: CategoryOption[] = [
  {
    value: "Politics",
    label: "Politics",
    subcategories: [
      { value: "Elections", label: "Elections" },
      { value: "Bills & Legislation", label: "Bills & Legislation" },
      { value: "Government", label: "Government" },
      { value: "International Relations", label: "International Relations" }
    ]
  },
  {
    value: "Business",
    label: "Business",
    subcategories: [
      { value: "Startups", label: "Startups" },
      { value: "Economy", label: "Economy" },
      { value: "Markets", label: "Markets" },
      { value: "Finance", label: "Finance" }
    ]
  },
  {
    value: "Tech",
    label: "Tech",
    subcategories: [
      { value: "Gadgets", label: "Gadgets" },
      { value: "Apps", label: "Apps" },
      { value: "Innovation", label: "Innovation" },
      { value: "Digital Trends", label: "Digital Trends" }
    ]
  },
  {
    value: "Celebrity Gossip",
    label: "Celebrity Gossip",
    subcategories: [
      { value: "Local Stars", label: "Local Stars" },
      { value: "International Stars", label: "International Stars" },
      { value: "Scandals & Rumors", label: "Scandals & Rumors" }
    ]
  },
  {
    value: "Music",
    label: "Music",
    subcategories: [
      { value: "Gengetone", label: "Gengetone" },
      { value: "Gospel", label: "Gospel" },
      { value: "Afrobeats", label: "Afrobeats" },
      { value: "Hip Hop", label: "Hip Hop" }
    ]
  },
  {
    value: "Events",
    label: "Events",
    subcategories: [
      { value: "Concerts", label: "Concerts" },
      { value: "Festivals", label: "Festivals" },
      { value: "Nightlife", label: "Nightlife" },
      { value: "Cultural Events", label: "Cultural Events" }
    ]
  },
  {
    value: "Sports",
    label: "Sports",
    subcategories: [
      { value: "Football", label: "Football" },
      { value: "Athletics", label: "Athletics" },
      { value: "Rugby", label: "Rugby" },
      { value: "Basketball", label: "Basketball" }
    ]
  },
  {
    value: "Entertainment",
    label: "Entertainment",
    subcategories: [
      { value: "Movies", label: "Movies" },
      { value: "TV Shows", label: "TV Shows" },
      { value: "Comedy", label: "Comedy" }
    ]
  },
  {
    value: "Lifestyle",
    label: "Lifestyle",
    subcategories: [
      { value: "Fashion", label: "Fashion" },
      { value: "Health", label: "Health" },
      { value: "Food", label: "Food" },
      { value: "Travel", label: "Travel" }
    ]
  }
];
