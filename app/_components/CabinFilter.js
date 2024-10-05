"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function CabinFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") || "all";

  function handleFiter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex ">
      <FilterButton
        filter="all"
        handleFilter={handleFiter}
        activeFilter={activeFilter}
      >
        All cabins
      </FilterButton>

      <FilterButton
        filter="small"
        handleFilter={handleFiter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </FilterButton>

      <FilterButton
        filter="medium"
        handleFilter={handleFiter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </FilterButton>

      <FilterButton
        filter="large"
        handleFilter={handleFiter}
        activeFilter={activeFilter}
      >
        7&mdash;12 guests
      </FilterButton>
    </div>
  );
}

const FilterButton = ({ children, handleFilter, filter, activeFilter }) => {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }px-5 py-2 hover:bg-primary-700`}
    >
      {children}
    </button>
  );
};
export default CabinFilter;
