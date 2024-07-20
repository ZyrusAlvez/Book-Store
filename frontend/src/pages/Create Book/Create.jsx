import React, {useState} from 'react'
import style from "./Create.module.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'

const Create = () => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [dataObject, setDataObject] = useState({
    title: "",
    author: "",
    publishYear: ""
  })

  function createBook(data){
    setLoading(true)
    axios
    .post("http://localhost:3000/api/books/", data)
    .then((response) => {
      console.log(response)
      setLoading(false)
      navigate("/")
    })
    .catch((error) => {
      console.log(error)
      setLoading(false)
      navigate("/")
    })
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setDataObject({
      ...dataObject,
      [name]: value,
    });
  }
  


  return ( loading ? <Loading /> : 
    <div>
      <input name="title" value={dataObject.title} onChange={handleChange}></input>
      <input name="author" value={dataObject.author} onChange={handleChange}></input>
      <input name="publishYear" value={dataObject.publishYear} onChange={handleChange}></input>
      <button onClick={() => createBook(dataObject)}>Submit</button>
    </div>
  )
}

export default Create