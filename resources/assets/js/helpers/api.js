import axios from 'axios';

export const API = {
  get: async function(route) {
    try {
      const response = await fetch(`/api/${route}`,
        {
          method: 'GET', headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        }
      ),
      data = await response.json();
      return data;
    } catch(e) {
      throw new Error(e);
    }
  }
}
