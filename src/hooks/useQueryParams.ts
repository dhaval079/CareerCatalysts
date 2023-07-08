import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useQueryParams<T = {}>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries()) as Partial<T>;
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  const createQueryParam = (params: Partial<T>) => {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value));
    });

    return urlSearchParams.toString();
  };

  const setQueryParams = (params: Partial<T>) => {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value));
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  const deleteQueryParam = (param: string) => {
    urlSearchParams.delete(param);

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  const combinedQueryParams = () => {
    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : '';

    return query;
  };

  return {
    queryParams,
    setQueryParams,
    deleteQueryParam,
    createQueryParam,
    combinedQueryParams,
  };
}
