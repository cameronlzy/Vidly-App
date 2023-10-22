import config from '../config.json'
import http from "./httpService"
const apiEndpoint = config.apiUrl + "/movies"
export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function deleteMovie(id) {
  return http.delete(apiEndpoint + "/" + id);
}

export async function updateMovie(movie,params) {
  return http.put(apiEndpoint + "/" + params.id, movie )
}

export function postMovie(movie) {
  return http.post(apiEndpoint, {
    "title": movie.title,
    "numberInStock": movie.numberInStock,
    "dailyRentalRate": movie.dailyRentalRate,
    "genreId": movie.genreId
  })
}