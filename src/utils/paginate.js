export default function paginate(movies,pageSize,page) {
    if(page=="All" || pageSize == 1){
        return movies
    }
    const new_movies = [...movies]
    return new_movies.slice((page - 1) * pageSize, page * pageSize)
}