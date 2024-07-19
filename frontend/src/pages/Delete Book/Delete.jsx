import React, {useState} from 'react'
import style from "./Delete.module.css"
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'

const Delete = () => {

  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function deleteBook(){
    console.log(id)
    setLoading(true)

    axios
    .delete(`http://localhost:3000/api/books/${id}`)
    .then((response) => {
      console.log(response)
      console.log('Book successfully deleted')
      setLoading(false)
      navigate("/")
    })
    .catch((error) => {
      console.error(error)
      setLoading(false)
      navigate("/")
    })
  }

  return ( loading ? <Loading /> :
    <div>
      <h1>Are you sure you want to delete</h1>
      <button onClick={() => {deleteBook()}}>yes</button>
      <button>no</button>
    </div>
  )
}

export default Delete