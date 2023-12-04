import { type Category } from '@/types/types';

export const useFetchCategories = (api: string) => {
  async function fetchMainCategories(): Promise<any[]> {
    const url = `${api}categories/main`;
    return await $fetch(url);
  }

  async function fetchSubCategories(name: string): Promise<any[]> {
    const url = `${api}categories/sub?name=${name}`;
    return await $fetch(url);
  }

  return { fetchMainCategories, fetchSubCategories };
};
