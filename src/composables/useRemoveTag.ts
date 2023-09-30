export const useRemoveTag = (data: string) => {
  console.log(data.replace('o', ''));

  return data.replace(/<p>/gi, '').replace(/<\/p>/gi, '\n').trim();
};
