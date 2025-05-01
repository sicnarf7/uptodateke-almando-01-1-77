
import CategoryPage from "@/components/category/CategoryPage";
import { SubcategoryLink } from "@/components/category/CategoryPage";

interface CelebrityProps {
  type: "local" | "international" | "scandals";
}

const Celebrity = ({ type = "local" }: CelebrityProps) => {
  const categoryTitle = type.charAt(0).toUpperCase() + type.slice(1);
  
  // Define subcategory mapping for clarity
  const subcategoryMap: Record<string, string> = {
    "local": "Local Stars",
    "international": "International Stars",
    "scandals": "Scandals & Rumors"
  };
  
  const subcategory = subcategoryMap[type];
  
  // Define subcategory navigation links
  const subcategoryLinks: SubcategoryLink[] = [
    {
      label: "Local Stars",
      value: "Local Stars",
      path: "/entertainment/celebrity/local"
    },
    {
      label: "International",
      value: "International Stars",
      path: "/entertainment/celebrity/international"
    },
    {
      label: "Scandals & Rumors",
      value: "Scandals & Rumors",
      path: "/entertainment/celebrity/scandals"
    }
  ];

  return (
    <CategoryPage
      title={`Celebrity - ${categoryTitle}`}
      category="Celebrity Gossip"
      subcategory={subcategory}
      subcategoryLinks={subcategoryLinks}
      emptyMessage={`No Celebrity ${categoryTitle} Articles Yet`}
      layout="standard"
      showTrending={false}
    />
  );
};

export default Celebrity;
