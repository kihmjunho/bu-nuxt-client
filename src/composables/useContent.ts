import { CreateResponse } from '@/types/types';

export const useContent = (api: string) => {
  async function createContent(
    type: string,
    body: any
  ): Promise<CreateResponse> {
    const imagesData: string[] = await $fetch(`${api}upload`, {
      method: 'post',
      body: body.formData,
    });

    body.emitData.images = imagesData;
    return await $fetch(`${api}creations/${type}s`, {
      method: 'post',
      body: body.emitData,
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

  return { createContent, updateContent, deleteContent };
};
