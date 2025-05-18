"use client";

import { useState, useEffect } from "react";
import { CollapsibleFilter } from "./CollapsibleFIlter";
import type { FilterConfig, FilterState } from "@/types/filters";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  filters: FilterConfig[];
  onFilterChange?: (filterState: FilterState) => void;
  className?: string;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  className,
}: FilterSidebarProps) {
  // Initialize filter state based on provided filter configurations
  const [filterState, setFilterState] = useState<FilterState>(() => {
    const initialState: FilterState = {};

    filters.forEach((filter) => {
      if (filter.type === "checkbox" || filter.type === "size") {
        // For checkbox and size filters, store selected option IDs
        initialState[filter.id] = {
          type: filter.type,
          values:
            filter.options?.filter((opt) => opt.checked).map((opt) => opt.id) ||
            [],
        };
      } else if (filter.type === "price" && filter.priceRange) {
        // For price filters, store the price range
        initialState[filter.id] = {
          type: filter.type,
          values: filter.priceRange.defaultValue || [
            filter.priceRange.min,
            filter.priceRange.max,
          ],
        };
      } else {
        initialState[filter.id] = {
          type: filter.type,
          values: null,
        };
      }
    });

    return initialState;
  });

  // Notify parent component when filter state changes
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filterState);
    }
  }, [filterState, onFilterChange]);

  const handleCheckboxChange = (
    filterId: string,
    optionId: string,
    checked: boolean
  ) => {
    setFilterState((prevState) => {
      const currentFilter = prevState[filterId];
      let currentValues = (currentFilter.values || []) as string[];

      if (checked) {
        // Add option to selected values if it's not already there
        if (!currentValues.includes(optionId)) {
          currentValues = [...currentValues, optionId];
        }
      } else {
        // Remove option from selected values
        currentValues = currentValues.filter((id) => id !== optionId);
      }

      return {
        ...prevState,
        [filterId]: {
          ...currentFilter,
          values: currentValues,
        },
      };
    });
  };

  const handleSizeChange = (filterId: string, sizeId: string) => {
    setFilterState((prevState) => {
      const currentFilter = prevState[filterId];
      let currentValues = (currentFilter.values || []) as string[];

      // Toggle the size selection
      if (currentValues.includes(sizeId)) {
        // If already selected, remove it
        currentValues = currentValues.filter((id) => id !== sizeId);
      } else {
        // If not selected, add it
        currentValues = [...currentValues, sizeId];
      }

      return {
        ...prevState,
        [filterId]: {
          ...currentFilter,
          values: currentValues,
        },
      };
    });
  };

  const handlePriceChange = (filterId: string, range: [number, number]) => {
    setFilterState((prevState) => ({
      ...prevState,
      [filterId]: {
        ...prevState[filterId],
        values: range,
      },
    }));
  };

  const resetFilters = () => {
    const resetState: FilterState = {};

    filters.forEach((filter) => {
      if (filter.type === "checkbox" || filter.type === "size") {
        resetState[filter.id] = {
          type: filter.type,
          values: [],
        };
      } else if (filter.type === "price" && filter.priceRange) {
        resetState[filter.id] = {
          type: filter.type,
          values: [filter.priceRange.min, filter.priceRange.max],
        };
      } else {
        resetState[filter.id] = {
          type: filter.type,
          values: null,
        };
      }
    });

    setFilterState(resetState);
  };

  // Helper function to get selected options for a checkbox or size filter
  const getSelectedOptions = (filterId: string): string[] => {
    const filter = filterState[filterId];
    if (
      filter &&
      (filter.type === "checkbox" || filter.type === "size") &&
      Array.isArray(filter.values)
    ) {
      return filter.values as string[];
    }
    return [];
  };

  // Helper function to get price range for a price filter
  const getPriceValue = (filterId: string): [number, number] | undefined => {
    const filter = filterState[filterId];
    if (filter && filter.type === "price" && Array.isArray(filter.values)) {
      return filter.values as [number, number];
    }
    return undefined;
  };

  return (
    <aside className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="text-sm"
        >
          Reset All
        </Button>
      </div>

      <div className="space-y-4">
        {filters.map((filter) => {
          if (filter.type === "checkbox") {
            return (
              <CollapsibleFilter
                key={filter.id}
                id={filter.id}
                title={filter.title}
                type={filter.type}
                options={filter.options}
                defaultOpen={filter.defaultOpen}
                selectedOptions={getSelectedOptions(filter.id)}
                onCheckboxChange={handleCheckboxChange}
              />
            );
          } else if (filter.type === "size") {
            return (
              <CollapsibleFilter
                key={filter.id}
                id={filter.id}
                title={filter.title}
                type={filter.type}
                options={filter.options}
                defaultOpen={filter.defaultOpen}
                selectedOptions={getSelectedOptions(filter.id)}
                onSizeChange={handleSizeChange}
              />
            );
          } else if (filter.type === "price") {
            const priceValue = getPriceValue(filter.id);
            return (
              <CollapsibleFilter
                key={filter.id}
                id={filter.id}
                title={filter.title}
                type={filter.type}
                priceRange={filter.priceRange}
                defaultOpen={filter.defaultOpen}
                priceValue={priceValue}
                onPriceChange={handlePriceChange}
              />
            );
          }
          return null;
        })}
      </div>
    </aside>
  );
}
