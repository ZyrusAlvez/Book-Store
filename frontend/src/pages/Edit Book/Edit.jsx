import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import style from "./Edit.module.css";
import axios from "axios";

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    publishYear: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
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

  return loading ? (
    <Loading />
  ) : (
    <div>
      <input
        placeholder="title"
        value={formValues.title}
        onChange={handleInputChange}
        name="title"
      />
      <input
        placeholder="author"
        value={formValues.author}
        onChange={handleInputChange}
        name="author"
      />
      <input
        placeholder="publish year"
        value={formValues.publishYear}
        onChange={handleInputChange}
        name="publishYear"
      />
      <button onClick={() => update(formValues)}>Update</button>
    </div>
  );
};

export default Edit;
