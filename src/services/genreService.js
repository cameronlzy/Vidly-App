import config from '../config.json'
import http from "./httpService";
const apiEndpoint = config.apiUrl + "/genres"

export function getGenres() {
  return http.get(apiEndpoint)
}
export function getGenre(id) {
  return http.get(apiEndpoint + "/" + id)
} 