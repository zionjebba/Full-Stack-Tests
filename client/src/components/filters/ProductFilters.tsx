import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ProductFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  productCount: number;
  totalCount: number;
}

const ProductFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  productCount,
  totalCount,
}: ProductFiltersProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="flex-1 lg:max-w-md">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-farm-green-600 hover:bg-farm-green-700"
                  : "hover:bg-farm-green-50 hover:text-farm-green-600 hover:border-farm-green-600"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {productCount} of {totalCount} products
        </span>

        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchTerm("")}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear search
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
