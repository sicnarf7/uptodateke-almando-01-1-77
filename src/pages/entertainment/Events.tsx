
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface EventsProps {
  type: "concerts" | "festivals" | "nightlife" | "featured";
}

const Events = ({ type = "concerts" }: EventsProps) => {
  const categoryTitle = type.charAt(0).toUpperCase() + type.slice(1);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: type === "featured" ? "Biggest Music Festival of the Year" : 
            `Upcoming ${categoryTitle} in Nairobi`,
      excerpt: `Details about the exciting ${type === "nightlife" ? "nightclub events" : type} happening in Kenya.`,
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Events",
      author: "Event Organizer",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "2 days ago",
      url: "/article/upcoming-events",
      isPremium: type === "featured"
    },
    {
      id: 2,
      title: `${categoryTitle} Tickets Now Available`,
      excerpt: "Don't miss out on these popular events - tickets are selling fast!",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Events",
      author: "Ticket Master",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "1 week ago",
      url: "/article/event-tickets",
      isPremium: false
    },
    {
      id: 3,
      title: `Review: Last Month's ${categoryTitle}`,
      excerpt: "A look back at the amazing events that took place last month.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Events",
      author: "Cultural Critic",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "3 weeks ago",
      url: "/article/events-review",
      isPremium: false
    },
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      name: "Weekend Music Festival",
      date: "June 15-17, 2025",
      location: "Uhuru Gardens, Nairobi",
      category: type
    },
    {
      id: 2,
      name: "International Artist Concert",
      date: "July 5, 2025",
      location: "KICC, Nairobi",
      category: type
    },
    {
      id: 3,
      name: "Cultural Festival",
      date: "August 12, 2025",
      location: "Nairobi National Museum",
      category: type
    },
  ]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Events - {categoryTitle}</h1>
          <div className="flex flex-wrap gap-2">
            <Link to="/entertainment/events/concerts">
              <Button variant={type === "concerts" ? "default" : "outline"} size="sm">Concerts</Button>
            </Link>
            <Link to="/entertainment/events/festivals">
              <Button variant={type === "festivals" ? "default" : "outline"} size="sm">Festivals</Button>
            </Link>
            <Link to="/entertainment/events/nightlife">
              <Button variant={type === "nightlife" ? "default" : "outline"} size="sm">Nightlife</Button>
            </Link>
            {type === "featured" && (
              <Link to="/entertainment/events/featured">
                <Button variant="default" size="sm">Featured</Button>
              </Link>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((item) => (
                <NewsCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  excerpt={item.excerpt}
                  imageUrl={item.imageUrl}
                  category={item.category}
                  author={item.author}
                  authorImageUrl={item.authorImageUrl}
                  publishedAt={item.publishedAt}
                  url={item.url}
                  isPremium={item.isPremium}
                />
              ))}
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-card rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center">
                <Calendar className="h-5 w-5 text-kenya-red mr-2" />
                <h3 className="font-bold text-lg">Upcoming Events</h3>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 hover:bg-gray-50 dark:hover:bg-black/20 transition-colors">
                    <h4 className="font-medium text-base">{event.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{event.date}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{event.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Events;
