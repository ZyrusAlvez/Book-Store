import React, {useState} from 'react'
import style from "./Delete.module.css"
import buttonStyle from '../../components/ui/Button.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import Button from '../../components/ui/Button'

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
    <div className={style.mainDiv}>
      <div className={style.lol}>
        <h1 className={style.title}>Are you sure you want to delete?</h1>
        <div className={style.buttonDiv}>
          <Button title="Yes" onClick={deleteBook}/>
          <Button title="No" onClick={() => {navigate("/")}} className={buttonStyle.no}/>
        </div>
      </div>
    </div>
  )
}

export default Delete