"use client";

import { useState, useEffect } from "react";
import { FilterSidebar } from "@/components/shared/collapsibleFilter/filter-sidebar";
import type { FilterConfig, FilterState } from "@/types/filters";
import { Product } from "@/types/models/product";
import { generateFilterConfigs } from "@/lib/utils/generateFilterConfigs";
import filterProducts from "./filterProducts";
interface AsideFilterProps {
  products: Product[];
  setFilteredProducts: (products: Product[]) => void;
}
export default function AsideFilter({
  products,
  setFilteredProducts,
}: AsideFilterProps) {
  const filterConfigs = generateFilterConfigs(products);

  const [filterState, setFilterState] = useState<FilterState>({});
  const [queryParams, setQueryParams] = useState<string>("");

  // Handle filter changes
  const handleFilterChange = (newFilterState: FilterState) => {
    setFilterState(newFilterState);

    // Generate query parameters for API calls
    const params = new URLSearchParams();

    Object.entries(newFilterState).forEach(([filterId, filter]) => {
      if (
        (filter.type === "checkbox" || filter.type === "size") &&
        Array.isArray(filter.values) &&
        filter.values.length > 0
      ) {
        // For checkbox and size filters, add each selected option as a query parameter
        params.append(filterId, filter.values.join(","));
      } else if (filter.type === "price" && Array.isArray(filter.values)) {
        // For price filters, add min and max as separate query parameters
        const [min, max] = filter.values as [number, number];
        params.append(`${filterId}_min`, min.toString());
        params.append(`${filterId}_max`, max.toString());
      }
    });

    setQueryParams(params.toString());
  };

  const fetchFilteredProducts = async (filterState: FilterState) => {
    // Approach 1: Using query parameters (for GET requests)
    const params = new URLSearchParams();

    Object.entries(filterState).forEach(([filterId, filter]) => {
      if (
        (filter.type === "checkbox" || filter.type === "size") &&
        Array.isArray(filter.values) &&
        filter.values.length > 0
      ) {
        params.append(filterId, filter.values.join(","));
      } else if (filter.type === "price" && Array.isArray(filter.values)) {
        const [min, max] = filter.values as [number, number];
        params.append(`${filterId}_min`, min.toString());
        params.append(`${filterId}_max`, max.toString());
      }
    });

    const queryString = params.toString();
    console.log(`GET request with query params: ${queryString || "none"}`);
    // Example GET request:
    // const response = await fetch(`/api/products?${queryString}`)

    // Approach 2: Using request body (for POST requests)
    console.log(
      `POST request with body:`,
      JSON.stringify(filterState, null, 2)
    );
    const filteredProducts = filterProducts(products, filterState);
    console.log("Filtered products:", filteredProducts);
    setFilteredProducts(filteredProducts);
    // Example POST request:
    // const response = await fetch('/api/products/filter', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(filterState),
    // })

    // const data = await response.json()
    // return data
  };

  // Call API when filters change
  useEffect(() => {
    fetchFilteredProducts(filterState);
  }, [filterState]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-6">Product Filters</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar
          filters={filterConfigs}
          onFilterChange={handleFilterChange}
          className="w-full md:w-64 shrink-0"
        />

        {/* <div className="flex-1">
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <h2 className="text-lg font-medium mb-2">Current Filter State:</h2>
            <pre className="bg-white p-3 rounded text-sm overflow-auto max-h-60">
              {JSON.stringify(filterState, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-medium mb-2">
              Generated Query Parameters:
            </h2>
            <code className="bg-white p-3 rounded text-sm block overflow-auto">
              {queryParams || "(no filters applied)"}
            </code>
          </div>

          <div className="mt-6">
            <p className="text-gray-500">
              Products would be displayed here, filtered according to the
              selected criteria.
            </p>
          </div>
        </div> */}
      </div>
    </main>
  );
}
