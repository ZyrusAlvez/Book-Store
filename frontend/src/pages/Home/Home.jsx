import React, {useState, useEffect, useRef} from 'react'
import style from "./Home.module.css"
import axios from 'axios'
import Loading from '../../components/Loading/Loading';
import Books from '../../components/home/Books/Books';

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true)

    axios
    .get("http://localhost:3000/api/books")
    .then((response) => {
      setData(response.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setLoading(false)
    })
    }, [])


  return (
  <div className={style.div}>
    { loading ? <Loading /> : <Books data={data}/> }
  </div>);
};

export default Home;
