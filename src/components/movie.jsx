import _ from "lodash"
import React, { useEffect, useState } from "react"
import { getGenres } from "../services/genreService"
import { deleteMovie, getMovies } from "../services/movieService"
import paginate from "../utils/paginate"
import Like from "./common/like"
import ListGroup from "./common/listGroup"
import MovieTable from "./movieTable"
import Pagination from "./common/pagination"
import { Link } from "react-router-dom"
import Search from "./search"
import { toast } from "react-toastify"
import { logger } from "@sentry/utils"
const Movie = ({ user }) => {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentGenre, setCurrentGenre] = useState(genres[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" })
  const [headers, setHeaders] = useState([
    {
      name: "Title",
      path: "title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { name: "Genre", path: "genre.name" },
    { name: "Stock", path: "numberInStock" },
    { name: "Rate", path: "dailyRentalRate" },
  ])
  const pageSize = 4

  useEffect(() => {
    const fetchGenres = async () => {
      const { data: newGenres } = await getGenres()
      const genres = [{ _id: "", name: "All" }, ...newGenres]
      setGenres(() => {
        return genres
      })
      setCurrentGenre(() => {
        return genres[0]
      })
    }
    const fetchMovies = async () => {
      const { data: newMovies } = await getMovies()
      setMovies(() => {
        return newMovies
      })
    }
    fetchGenres().catch(console.error)
    fetchMovies().catch(console.error)
  }, [])

  // const handleMovie
  const handleDelete = async (movie) => {
    const originalMovies = movies
    setMovies((movies) => {
      const new_movies = movies.filter((m) => m._id !== movie._id)
      return new_movies
    })
    try {
      await deleteMovie(movie._id)
    } catch (ex) {
      if (ex.response && ex.response.status == 404) {
        toast.error("This movie does not exist")
        logger.log(ex)
        setMovies(() => originalMovies)
      }
      if (ex.response.status == 401 || 403) {
        toast.error("Unauthorized User")
        setMovies(() => originalMovies)
      }
    }
  }

  const handleLike = (movie) => {
    // console.log("liked clicked")
    const new_movies = [...movies]
    const index = movies.indexOf(movie)
    new_movies[index] = { ...movie }
    new_movies[index].liked = !new_movies[index].liked
    setMovies(() => {
      return new_movies
    })
  }

  const handlePageToggle = (page) => {
    setCurrentPage(() => {
      return page
    })
  }

  const handleGenreToggle = (genre) => {
    setCurrentGenre(() => {
      return genre
    })
    setCurrentPage(() => {
      return 1
    })
  }

  const handleColumn = (column) => {
    setSortColumn(() => {
      return column
    })
  }
  const getFilteredData = () => {
    const filtered = movies.filter((movie) => {
      if (currentGenre.name == "All") {
        return movie
      }
      return movie.genre.name == currentGenre.name
    })
    if (searchQuery) {
      const result = _.filter(filtered, (movie) => {
        return _.startsWith(movie.title, searchQuery)
      })

      return result
    } else {
      return filtered
    }
  }
  const getPagedData = () => {
    const filtered = getFilteredData()
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const paginated = paginate(sorted, pageSize, currentPage)
    return paginated
  }

  const handleSearch = (query) => {
    setSearchQuery(() => {
      return query
    })
    setCurrentPage(() => {
      return 1
    })
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col2">
          <ListGroup
            items={genres}
            currentItem={currentGenre}
            onitemToggle={handleGenreToggle}
          />
        </div>
        <div className="col">
          <Search onChange={handleSearch} value={searchQuery} />
          <MovieTable
            onDelete={handleDelete}
            usedMovies={getPagedData()}
            currentMovies={getFilteredData()}
            onLike={handleLike}
            onColumn={handleColumn}
            sortColumn={sortColumn}
            headers={headers}
            user={user}
          />
          <Pagination
            itemsCount={getFilteredData().length}
            pageSize={pageSize}
            onPageToggle={handlePageToggle}
            currentPage={currentPage}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Movie
