export function createQueryString(
  searchParams: URLSearchParams,
  params: Record<string, string | number | null>
) {
  const newParams = new URLSearchParams(searchParams.toString());

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
  });

  return newParams.toString();
}
