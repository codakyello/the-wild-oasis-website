"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ReservationFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("status") || "ongoing";

  function handleFiter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("status", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <FilterButton
        filter="ongoing"
        handleFilter={handleFiter}
        activeFilter={activeFilter}
      >
        Ongoing
      </FilterButton>

      <FilterButton
        filter="upcoming"
        handleFilter={handleFiter}
        activeFilter={activeFilter}
      >
        Upcoming
      </FilterButton>

      <FilterButton
        filter="past"
        handleFilter={handleFiter}
        activeFilter={activeFilter}
      >
        Past
      </FilterButton>
    </div>
  );
}

const FilterButton = ({ children, handleFilter, filter, activeFilter }) => {
  console.log("active filter", activeFilter, filter);
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
export default ReservationFilter;
