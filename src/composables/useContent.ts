import { Category, CreateResponse } from '@/types/types';

export const useContent = (api: string) => {
  let imagePaths: string[] = [];

  async function sendImageFiles(body: any): Promise<void> {
    const response: string[] = await $fetch(`${api}upload`, {
      method: 'post',
      body,
    });

    imagePaths = response;
    return;
  }

  async function createContent(
    type: string,
    body: any
  ): Promise<CreateResponse> {
    body.images = imagePaths;

    return await $fetch(`${api}creations/${type}s`, {
      method: 'post',
      body,
      headers: {
        Authorization: `Bearer ${useCookie('buToken').value}` || '',
      },
    });
  }

  async function updateContent(
    categoru: string,
    id: string,
    body: any
  ): Promise<any> {
    return await $fetch(`${api}creations/${categoru}s/${id}`, {
      method: 'put',
      body: body.emitData,
    });
  }

  async function deleteContent(id: string, category: string) {
    return await $fetch(`${api}creations/${category}s/${id}`, {
      method: 'delete',
      // body: body.emitData,
    });
  }

  function getSubCategoryName(categories: Category[], id: number): string | undefined {
    const category = categories.find((item: Category) => item.id === id);
    if (category) {
      return category.name;
    }
  }

  return { sendImageFiles, createContent, updateContent, deleteContent, getSubCategoryName };
};
