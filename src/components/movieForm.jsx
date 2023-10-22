import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from "./common/form"
import Joi from "joi-browser"
import http from "../services/httpService"
import config from "../config.json"
import { getGenres, getGenre } from "../services/genreService"
import { getMovie, postMovie, updateMovie } from "../services/movieService"
import { toast } from "react-toastify"
// import { getGenre } from "../services/genreService"
const MovieForm = () => {
  const [genres, setGenres] = useState([])
  const [movie, setMovie] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  })
  const [errors, setErrors] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  })

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const fetchGenres = async () => {
      const { data: newGenres } = await getGenres()
      const genres = [...newGenres]
      setGenres(() => {
        return genres
      })
    }
    const fetchMovie = async () => {
      if (params.id == "new") return
      try {
        const { data: newMovie } = await getMovie(params.id)
        setMovie(mapToViewModel(newMovie))
      } catch (ex) {
        if (ex.response && ex.response.status == 404) navigate("/not-found")
      }
    }
    fetchGenres().catch(console.error)
    fetchMovie().catch(console.error)
  }, [])
  // const genrelist = getGenres()
  const movieProperties = [
    { name: "title", label: "Title" },
    {
      name: "genreId",
      label: "Genre",
      dropdown: true,
      options: genres,
    },
    { name: "numberInStock", label: "Number In Stock" },
    { name: "dailyRentalRate", label: "Rate" },
  ]

  const idHandler = async (id) => {
    const { data: result } = await getGenre(id)
    if (!result) return
    return result.name
  }

  const mapToViewModel = (movie) => {
    return {
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    }
  }

  const schema = {
    // _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .required()
      .min(0)
      .max(10)
      .label("Rate"),
  }

  const option = { abortEarly: false }
  const path = "/movies"
  const doSubmit = async () => {
    try {
      if (params.id == "new") {
        await postMovie(movie)
      } else if (params.id) {
        console.log(params.id)
        console.log(movie)
        await updateMovie(movie, params)
        navigate(path)
      }
    } catch (ex) {
      if (ex.response && ex.response.status == 401) {
        toast.error("Unauthorized user. Please Log In")
      }
    }
  }
  return (
    <React.Fragment>
      <h1>MovieForm {params.id == "new" ? null : params.id}</h1>
      <Form
        dataProperties={movieProperties}
        option={option}
        data={movie}
        errors={errors}
        setData={setMovie}
        setErrors={setErrors}
        schema={schema}
        idHandler={idHandler}
        onSubmit={doSubmit}
      />
    </React.Fragment>
  )
}

export default MovieForm
