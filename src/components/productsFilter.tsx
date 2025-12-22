import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

import { useGetCategoriesQuery } from "@/app/services/categories";
import type { ICategory } from "@/interfaces";
import {
  Button,
  Collapsible,
  createListCollection,
  Field,
  Input,
  Select,
  SelectValueText
} from "@chakra-ui/react";

interface ProductFiltersProps {
  search: string;
  minPrice: string;
  maxPrice: string;
  categoryId: string;
  onSearchChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onClearFilters: () => void;
}

const ProductFilters = ({
  search,
  minPrice,
  maxPrice,
  categoryId,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onCategoryChange,
  onClearFilters,
}: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { data: categoriesData, isLoading: isCategoriesLoading } =useGetCategoriesQuery();

  const categoriesItems =
    categoriesData?.data?.map((category: ICategory) => ({
      label: category.title,
      value: String(category.id),
    })) ?? [];

  const categoriesCollection = createListCollection({
    items: categoriesItems,
  });

  const hasActiveFilters = search || minPrice || maxPrice || categoryId;

  const categories = categoriesData?.data || [];

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Collapsible.Trigger asChild>
          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Filters</h3>
                <p className="text-xs text-muted-foreground">
                  {hasActiveFilters
                    ? "Active filters applied"
                    : "Refine your search"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearFilters();
                  }}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform duration-200
                  ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
          </div>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <div className="px-4 pb-4 space-y-4">
            {/* Search */}
            <Field.Root className="space-y-2">
              <Field.Label
                htmlFor="search"
                className="text-sm font-medium text-foreground"
              >
                Search Products
              </Field.Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by title..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 bg-background border-border focus:border-primary focus:ring-primary"
                />
              </div>
            </Field.Root>

            {/* Price Range */}
            <Field.Root className="space-y-2">
              <Field.Label className="text-sm font-medium text-foreground">
                Price Range
              </Field.Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => onMinPriceChange(e.target.value)}
                    className="pl-7 bg-background border-border focus:border-primary focus:ring-primary"
                    min="0"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => onMaxPriceChange(e.target.value)}
                    className="pl-7 bg-background border-border focus:border-primary focus:ring-primary"
                    min="0"
                  />
                </div>
              </div>
            </Field.Root>

            {/* Category */}
            <Field.Root className="space-y-2">
              <Field.Label
                htmlFor="category"
                className="text-sm font-medium text-foreground"
              >
                Category
              </Field.Label>
              <Select.Root collection={categoriesCollection}  value={categoryId ? [String(categoryId)] : []}
                     onValueChange={onCategoryChange}>
                <Select.Trigger
                  id="category"
                  className="bg-background border-border focus:border-primary focus:ring-primary"
                >
                  <SelectValueText
                    placeholder={
                      isCategoriesLoading ? "Loading..." : "All Categories"
                    }
                  />
                </Select.Trigger>
                <Select.Content className="bg-popover border-border">
                  <Select.Item value="all">All Categories</Select.Item>
                  {categories.map((category) => (
                    <Select.Item key={category.id} value={String(category.id)}>
                      {category.title}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Field.Root>
          </div>
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
};

export default ProductFilters;
