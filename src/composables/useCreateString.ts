import { Content } from '@/types/types';

export const useCreateString = () => {
  function createUrl(item: Content): string {
    return `/${item.category}/${item.subCategory}/${item.id}`;
  }

  return { createUrl };
};
