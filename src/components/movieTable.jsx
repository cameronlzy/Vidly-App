import React from "react"
import { useNavigate } from "react-router-dom"
import Table from "./common/table"
const MovieTable = ({
  currentMovies,
  usedMovies,
  onDelete,
  onLike,
  sortColumn,
  onColumn,
  headers,
  user,
}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    return navigate("/movies/new")
  }
  return (
    <React.Fragment>
      {user && (
        <button onClick={handleClick} className="btn btn-primary">
          New Movie
        </button>
      )}
      <h1>Showing {currentMovies.length} movies in our database</h1>
      <Table
        onColumn={onColumn}
        sortColumn={sortColumn}
        headers={headers}
        content={usedMovies}
        onDelete={onDelete}
        onLike={onLike}
        user={user}
      />
    </React.Fragment>
  )
}

export default MovieTable
