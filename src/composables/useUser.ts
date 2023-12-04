import axios from 'axios';

interface LoginResponse {
  accessToken: string;
}

export const useUser = (api: string) => {
  let errorMessage: string;

  async function signupUser(body: any) {
    try {
      await axios.post(`${api}users/signup`, body);
      errorMessage = '';
    } catch (err: any) {
      const { message, error } = err.response.data;

      if (typeof message === 'string') {
        errorMessage = 'this email is already duplicate';
      } else {
        errorMessage = message[0];
      }
    }

    return { errorMessage };
  }

  async function loginUser(body: any) {
    const data = await $fetch<LoginResponse>(`${api}users/login`, {
      method: 'post',
      body,
    }).catch(({ data }: { data: { message: string[] } }) => {
      errorMessage = data.message[0];
    });

    if (errorMessage) {
      return { errorMessage };
    }

    return { accessToken: data?.accessToken };
  }

  async function getUserData(token: string) {
    try {
      const { data } = await axios.get(`${api}users/get-user`, {
        headers: {
          Authorization: `Bearer ${token}` || '',
        },
      });
      return data;
    } catch (error) {}
  }

  return { signupUser, loginUser, getUserData };
};
