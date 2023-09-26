export const useContent = (api: string) => {
  async function deleteContent(id: string, category: string) {
    return await $fetch(`${api}creations/${category}s/${id}`, {
      method: 'delete',
      // body: body.emitData,
    });
  }

  return { deleteContent };
};
