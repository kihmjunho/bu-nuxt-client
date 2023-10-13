import axios from 'axios';

export const useGuestbook = (api: string) => {
  async function getGuestbook() {
    const { data } = await axios.get(`${api}guestbooks`);
    return data;
  }

  async function createGuestbook(message: any): Promise<any> {
    return await axios.post(`${api}guestbooks`, message, {
      headers: {
        Authorization: `Bearer ${useCookie('buToken').value}` || '',
      },
    });
  }

  async function updateGuestbook(body: any): Promise<any> {
    return await axios.put(`${api}guestbooks`, body, {
      headers: {
        Authorization: `Bearer ${useCookie('buToken').value}` || '',
      },
    });
  }

  async function deleteGuestbook(id: string) {
    return await axios.delete(`${api}guestbooks/${id}`, {
      headers: {
        Authorization: `Bearer ${useCookie('buToken').value}` || '',
      },
    });
  }

  return { getGuestbook, createGuestbook, updateGuestbook, deleteGuestbook };
};
