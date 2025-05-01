
import CategoryPage from "@/components/category/CategoryPage";

const Sports = () => {
  return (
    <CategoryPage
      title="Sports"
      category="Sports"
      showTrending={true}
      emptyMessage="No Sports Articles Yet"
    />
  );
};

export default Sports;
