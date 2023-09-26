import { type Contents } from '@/types/types';

export const useFetchContent = (api: string) => {
  async function fetchContentByCategory(
    name: string,
    limit: number,
    page: number
  ): Promise<any> {
    const url = `${api}creations/category?name=${name}&limit=${limit}&page=${page}`;
    return await $fetch(url);
  }

  async function fetchContentBySubCategory(
    name: string,
    limit: number,
    page: number
  ): Promise<Contents> {
    const url = `${api}creations/subCategory?name=${name}&limit=${limit}&page=${page}`;
    return await $fetch(url);
  }

  async function fetchContentById(category: string, id: string) {
    const url = `${api}creations/${category}s/${id}`;
    return await $fetch(url);
  }

  return {
    fetchContentByCategory,
    fetchContentBySubCategory,
    fetchContentById,
  };
};
