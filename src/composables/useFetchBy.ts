import { type Contents } from '@/types/types';

export const useFetchBy = (api: string) => {
  async function fetchByCategory(
    name: string,
    limit: number,
    page: number
  ): Promise<any> {
    const url = `${api}creations/category?name=${name}&limit=${limit}&page=${page}`;
    return await $fetch(url);
  }

  async function fetchBySubCategory(
    name: string,
    limit: number,
    page: number
  ): Promise<Contents> {
    const url = `${api}creations/subCategory?name=${name}&limit=${limit}&page=${page}`;
    return await $fetch(url);
  }

  async function fetchById(category: string, id: string) {
    const url = `${api}creations/${category}s/${id}`;
    return await $fetch(url);
  }

  return {
    fetchByCategory,
    fetchBySubCategory,
    fetchById,
  };
};
