const server = 'https://portal-wertykalny.herokuapp.com/api';

export const API = {
  get: async function(route) {
    try {
      const response = await fetch(`/api/${route}`, {method: 'GET'}),
            data = await response.json();
      return data;
    } catch(e) {
      throw new Error(e);
    }
  }
}
