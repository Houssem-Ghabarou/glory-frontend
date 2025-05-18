"use client";

import { useState } from "react";
import AsideFilter from "./asidefilter/AsideFilter";
import ProductsView from "./Products/ProductsView";
import { Button } from "@/components/ui/button";
import { FilterIcon, X } from "lucide-react";
import { Product } from "@/types/models/product";

interface CollectionsProps {
  products: Product[];
}
const Collections = ({ products }: CollectionsProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchecOnFilter, setSearchedOnFilter] = useState<Product[]>();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  //search by name
  const handleSearch = (searchTerm: string) => {
    const filtered = filteredProducts.filter((product) =>
      product?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
    console.log(filtered, "filtered");
    if (searchTerm === "") {
      setSearchedOnFilter([]);
    } else {
      setSearchedOnFilter(filtered);
    }
  };
  return (
    <div className="relative">
      {/* Mobile filter toggle button */}
      <div className="sticky top-0 z-10 bg-background p-4 md:hidden">
        <Button
          onClick={toggleFilter}
          variant="outline"
          className="flex items-center gap-2 w-full"
        >
          {isFilterOpen ? (
            <>
              <X size={18} /> Close Filters
            </>
          ) : (
            <>
              <FilterIcon size={18} /> Show Filters
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 py-4 md:py-8">
        {/* Filter sidebar with mobile slide-in behavior */}
        <div
          className={`
            fixed md:relative inset-y-0 left-0 z-20 
            w-3/4 max-w-xs md:w-auto md:max-w-none
            bg-background md:bg-transparent
            transition-transform duration-300 ease-in-out
            ${
              isFilterOpen
                ? "translate-x-0 bg-white min-h-screen "
                : "-translate-x-full md:translate-x-0"
            }
            overflow-y-auto
            md:overflow-visible
            h-[calc(100vh-4rem)] md:h-auto
            pt-16 md:pt-0
            border-r md:border-0
          `}
        >
          <AsideFilter
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
        </div>

        {/* Overlay for mobile */}
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-10 md:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* Products view that gets pushed but not hidden */}
        <div
          className={`
            flex-1 transition-transform duration-300 ease-in-out
            ${isFilterOpen ? "md:ml-0 ml-[0%]" : "ml-0"}
          `}
        >
          <ProductsView
            products={
              searchecOnFilter && searchecOnFilter.length > 0
                ? searchecOnFilter
                : filteredProducts
            }
            handleSearch={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Collections;
