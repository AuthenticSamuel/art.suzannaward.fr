import { ref, watch } from "vue";

import { categoryMappings } from "@/lib/painting";

import type { Painting } from "@/types";

type FilterChangeCallback = (filters: Filter[]) => void;

const filterChangeCallbacks: FilterChangeCallback[] = [];

type Filter = {
  text: string;
  value: Painting["category"];
  active: boolean;
};

const filters = ref<Filter[]>(
  Object.entries(categoryMappings).map(([value, text]) => ({
    text,
    value: value as Painting["category"],
    active: false,
  })),
);

const toggleFilter = (filter: Filter) => {
  filter.active = !filter.active;
};

const onFilterChange = (callback: FilterChangeCallback) => {
  filterChangeCallbacks.push(callback);
};

watch(
  filters,
  (filters) => {
    filterChangeCallbacks.forEach((callback) => callback(filters));
  },
  { deep: true },
);

export const useFilter = () => ({
  filters,
  toggleFilter,
  onFilterChange,
});
