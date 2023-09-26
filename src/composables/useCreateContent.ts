import { CreateResponse } from '@/types/types';

export const useCreateContent = (api: string) => {
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

  return {
    createContent,
  };
};
