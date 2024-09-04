// hooks/useQueryParams.ts
import { useSearchParams } from 'next/navigation'

/**
 * Хук для отримання всіх параметрів запиту
 * @returns Об'єкт параметрів запиту
 */
const useQueryParams = () => {
  const searchParams = useSearchParams();

  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

export default useQueryParams;
