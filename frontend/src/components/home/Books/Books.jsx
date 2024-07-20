import React from 'react'
import style from "./Books.module.css"
import { Link } from 'react-router-dom';

import { FaCircleInfo } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Books = ({data}) => {
  //data is arrays of objects
  return (
    <table className={style.table}>
    <thead>
      <tr>
        <th className={style.title}>No.</th>
        <th className={style.title}>Title</th>
        <th className={style.title}>Author</th>
        <th className={style.title}>Publish Year</th>
        <th className={style.title}>Operation</th>
      </tr>
    </thead>
    <tbody>
      {data.map((element, index) => (
        <tr key={index}>
          <td className={style.td}>{index+1}</td>
          <td className={style.td}>{element.title}</td>
          <td className={style.td}>{element.author}</td>
          <td className={style.td}>{element.publishYear}</td>
          <td className={`${style.td} ${style.icon_td}`}>
            <Link to={`show/${element._id}`}>
              <FaCircleInfo className={style.icon}/>
            </Link>
            <Link to={`edit/${element._id}`}>
              <CiEdit className={style.icon}/>
            </Link>
            <Link to={`delete/${element._id}`}>
              <MdDelete className={style.icon}/>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default Books