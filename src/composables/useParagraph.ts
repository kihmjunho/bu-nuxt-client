export const useParagraph = (data: string) => {
  const origin = data.split(/\r?\n/);

  let array: string[] = [];
  origin.forEach((item) => array.push(`<p>${item}</p>`));

  const paragraph = array.join('');

  return { paragraph };
};
