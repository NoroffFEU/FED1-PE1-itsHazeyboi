export async function myFetcher(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  