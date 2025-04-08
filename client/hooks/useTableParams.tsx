import { useSearchParams } from "next/navigation";

export function useTableParams() {
  const searchParams = useSearchParams();

  return {
    page: Number(searchParams.get("page") || "1"),
    limit: Number(searchParams.get("limit") || "5"),
    search: searchParams.get("q") || "",
    sort: searchParams.get("_sort") || "name",
    order: searchParams.get("_order") || "asc",
    status: searchParams.get("_status") || "",
  };
}
