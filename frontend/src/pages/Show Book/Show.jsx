import React, {useEffect, useState} from 'react'
import style from "./Show.module.css"
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import { useParams } from 'react-router-dom'

const Show = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const {id} = useParams()

  useEffect(()=> {
    setLoading(true)
    axios
    .get(`http://localhost:3000/api/books/${id}`)
    .then((response) => {
      setData(response.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setLoading(false)
    })
  }, [])

  return ( loading ? <Loading /> :
    <div>
      <label>{data.title}</label><br/>
      <label>{data.author}</label><br/>
      <label>{data.publishYear}</label><br/>
      <label>{data._id}</label>
    </div>
    
  )
}

export default Show