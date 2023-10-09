export const useParagraph = () => {
  function wrapTextInPTag(data: string) {
    const origin = data.split(/\r?\n/);

    let array: string[] = [];
    origin.forEach((item) => array.push(`<p>${item}</p>`));

    return array.join('');
  }

  function removePTagsFromHTML(data: string) {
    return data.replace(/<p>/gi, '').replace(/<\/p>/gi, '\n').trim();
  }

  return { wrapTextInPTag, removePTagsFromHTML };
};
