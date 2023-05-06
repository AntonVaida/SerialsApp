export const getFilmList = async(query: string, page: number) => {
 const URL = `https://api.tvmaze.com/search/shows?q=[${query}]&page=${page}&limit=10`
  const response = await fetch(URL)

  return response.json()
}