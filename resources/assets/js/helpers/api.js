export const API = {
  get: async function(route) {
    try {
      const response = await fetch(`https://portal-wertykalny.herokuapp.com/api/${route}`,
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
