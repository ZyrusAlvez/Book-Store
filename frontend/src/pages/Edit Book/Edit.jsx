import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import style from "./Edit.module.css";
import axios from "axios";
import Button from "../../components/ui/Button";

const Edit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [oldData, setOldData] = useState({})
  const [newData, setNewData] = useState({
    title: {
      "name": "",
      "clicked": false
    },
    author: {
      "name": "",
      "clicked": false
    },
    publishYear: {
      "name": "",
      "clicked": false
    },
  });


  // this takes the old data (before the edit)
  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:3000/api/books/${id}`)
      .then((response) => {
        setOldData(response.data) // this will activate the useEffect line 36
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  // when the fetch is done, this will make the 2 state variable sync together
  useEffect(() => {
    setNewData({
      title: {
        "name": oldData.title,
        "clicked": false
      },
      author: {
        "name": oldData.author,
        "clicked": false
      },
      publishYear: {
        "name": oldData.publishYear,
        "clicked": false
      },
    })
  }, [oldData])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewData({
      ...newData,
      [name]: {
        "name" : value,
        "clicked" : true
      },
    });
  };

  const update = (updatedData) => {
    if (updatedData.author === ""){updatedData.author = "unknown"}
    setLoading(true);

    axios
      .put(`http://localhost:3000/api/books/${id}`, updatedData)
      .then((response) => {
        console.log(response)
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Ensure loading state is reset on error
      });
  };

  function handleClick(key){
    // Clear the value of the specified key
    if (!newData[key].clicked){
    setNewData({...newData, [key]: { name: '' }});
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className={style.mainDiv}>
      <input
        className={style.input}
        placeholder="title"
        value={newData.title.name}
        onClick={() => handleClick("title")}
        onChange={handleInputChange}
        name="title"
      />
      <input
        className={style.input}
        placeholder="author"
        value={newData.author.name}
        onClick={() => setNewData({...newData, author: {"name" : ""}})}
        onChange={handleInputChange}
        name="author"
      />
      <input
        className={style.input}
        placeholder="publish year"
        value={newData.publishYear.name}
        onClick={() => setValueInput({publishYear: ""})}
        onChange={handleInputChange}
        name="publishYear"
        type="number"
      />
      <Button onClick={() => {update({title: newData.title.name, author: newData.author.name, publishYear: newData.publishYear.name})}} title="update"/>
    </div>
  );
};

export default Edit;
