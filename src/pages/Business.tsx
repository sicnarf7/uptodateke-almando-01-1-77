
import CategoryPage from "@/components/category/CategoryPage";

const Business = () => {
  return (
    <CategoryPage
      title="Business"
      category="Business"
      showTrending={true}
      emptyMessage="No Business Articles Yet"
    />
  );
};

export default Business;
