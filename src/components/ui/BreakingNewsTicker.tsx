
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface TickerItem {
  id: number;
  text: string;
  url: string;
  isBreaking?: boolean;
}

const BreakingNewsTicker = () => {
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([
    {
      id: 1,
      text: "Parliament passes new bill on digital taxation",
      url: "/news/politics/taxation-bill",
      isBreaking: true,
    },
    {
      id: 2,
      text: "Kenya Sevens qualifies for Olympics",
      url: "/sports/rugby/kenya-sevens-olympics",
    },
    {
      id: 3,
      text: "Major infrastructure project announced for Nairobi",
      url: "/news/infrastructure/nairobi-project",
    },
    {
      id: 4,
      text: "Popular artist releases surprise album",
      url: "/entertainment/music/surprise-album",
    },
    {
      id: 5,
      text: "Kenya shilling gains against the dollar",
      url: "/business/currency/shilling-dollar",
    },
  ]);

  // Rotate ticker items every few seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerItems((prevItems) => {
        const newItems = [...prevItems];
        const firstItem = newItems.shift();
        if (firstItem) {
          newItems.push(firstItem);
        }
        return newItems;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden w-full py-2 border-b border-gray-800">
      <div className="relative flex items-center h-8">
        <div className="min-w-max px-3 py-1 bg-kenya-red font-bold text-sm rounded-r-md z-10">
          TRENDING NOW
        </div>
        <div className="overflow-hidden flex-1 ml-2">
          <div className="whitespace-nowrap inline-block animate-ticker">
            {tickerItems.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                className="ticker-item hover:text-kenya-red"
              >
                {item.isBreaking && (
                  <span className="breaking-news mr-2">BREAKING</span>
                )}
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
