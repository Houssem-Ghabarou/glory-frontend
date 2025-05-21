import React, { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Product } from "@/types/models/product";

// Base categories
const baseCategories = [
  "ALL",
  // "NEW",
  // "BEST SELLERS",
  // "SHIRTS",
  // "T-SHIRTS",
  // "POLO SHIRTS",
  // "JEANS",
  // "SHORTS",
  // "JACKETS",
  // "SUITS",
  // "COATS",
];

interface CategoryButtonProps {
  category: string;
  onClick?: () => void;
  className?: string;
  isSelected?: boolean;
}

const CategoryButton = ({
  category,
  onClick,
  className,
  isSelected,
}: CategoryButtonProps) => {
  return (
    <button
      className={cn(
        "min-w-[120px] py-2 px-4 border border-gray-300 transition-colors cursor-pointer",
        "text-xs sm:text-sm font-medium uppercase focus:outline-none focus:ring-2 focus:ring-gray-300",
        isSelected
          ? "bg-[#000E8A] text-white border-[#000E8A]"
          : "bg-white hover:bg-gray-100",
        className
      )}
      onClick={onClick}
    >
      {category}
    </button>
  );
};

interface CategoryNavigationProps {
  onCategoryClick?: (category: string) => void;
  className?: string;
  products: Product[];
}

const CategoryNavigation = ({
  onCategoryClick,
  className,
  products,
}: CategoryNavigationProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    baseCategories?.[0] || null
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  // Extract unique collection and gender values
  const dynamicCategories = useMemo(() => {
    const collections = new Set<string>();
    const genders = new Set<string>();

    products.forEach((product) => {
      if (product.collection) collections.add(product.collection.toUpperCase());
      if (product.gender) genders.add(product.gender.toUpperCase());
    });

    return [...collections, ...genders];
  }, [products]);

  // Merge and deduplicate categories
  const allCategories = useMemo(() => {
    const combined = [...baseCategories, ...dynamicCategories];
    return Array.from(new Set(combined));
  }, [dynamicCategories]);

  return (
    <div className={cn("w-full max-w-full", className)}>
      <ScrollArea className="w-full">
        <div className="flex flex-wrap gap-2 pb-2 px-2">
          {allCategories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryNavigation;
