import React from "react";
import { NavLink } from "react-router-dom";
import Card from "./Card";

const Category = ({ data, title, type }) => {
  return (
    <div className="container-category">
      <h1 className="title-category">{title}</h1>
      <div className="container-miniature">
        {data[0]
          ? data.map((item) => {
              return (
                <NavLink to={`/${type}/${item.id}`} key={item.id}>
                  <Card data={item} />
                </NavLink>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Category;
