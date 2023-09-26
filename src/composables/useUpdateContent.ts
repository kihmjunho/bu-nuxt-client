// import { CreateResponse } from '@/types/types';

export const useUpdateContent = (api: string) => {
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

  return {
    updateContent,
  };
};
